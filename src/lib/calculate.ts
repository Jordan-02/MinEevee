import { Generations, Move, Pokemon, calculate, type GenerationNum } from '@smogon/calc';
import type { BestEvProps, DamageRoll, EvMapProps, OptimizeProps } from './types';

function optimize({ attacker, defender, generation, move }: OptimizeProps) {
	const op = new Pokemon(generation, attacker.name!, {
		item: attacker.item,
		nature: attacker.nature,
		evs: attacker.evs,
		boosts: attacker.boosts,
		ivs: attacker.ivs,
		level: attacker.level
	});
	const def = new Pokemon(generation, defender.name!, {
		item: defender.item,
		nature: defender.nature,
		evs: defender.evs,
		boosts: defender.boosts,
		ivs: defender.ivs,
		level: defender.level
	});

	const result = calculate(generation, op, def, move);
	return result;
}

function survivalChance(roll: DamageRoll, maxHp: number): number {
	let max = 0;
	for (const i of roll as number[]) {
		if (i < maxHp) {
			max++;
		}
	}
	return max / 16;
}

function getEvMap({ attacker, defender, generation }: EvMapProps) {
	let i = 0;
	const keys = [...Array(17).keys()].map((x) => x++ / 16);
	const gen = Generations.get(generation as GenerationNum);
	const move = new Move(generation, attacker.move!);

	const evMap = new Map<number, number[][]>(keys.map((val) => [val, []]));

	while (i <= 252) {
		let j = 252;
		while (j >= 0) {
			let result;
			if (move.category == 'Special') {
				result = optimize({
					attacker,
					defender: {
						...defender,
						evs: {
							...defender.evs,
							hp: i,
							spd: j
						}
					},
					generation: gen,
					move
				});
			} else {
				result = optimize({
					attacker,
					defender: {
						...defender,
						evs: {
							...defender.evs,
							hp: i,
							def: j
						}
					},
					generation: gen,
					move
				});
			}
			// console.log(survivalChance(result.damage, result.defender.stats.hp), result.damage, i, j);
			evMap.get(survivalChance(result.damage, result.defender.stats.hp))!.push([i, j]);

			if (j == 4) {
				j -= 4;
				continue;
			}
			j -= 8;
		}

		if (i == 0) {
			i += 4;
			continue;
		}
		i += 8;
	}
	return { evMap, category: move.category };
}

export function getBestEVs({ attacker, defender, generation, threshold }: BestEvProps) {
	const { evMap, category } = getEvMap({ attacker, defender, generation });

	const filteredKeys = [...evMap.keys()].filter((x) => evMap.get(x)!.length > 0);
	//console.log('This is maxkeys: ', filteredKeys);
	const max = threshold > Math.max(...filteredKeys) ? Math.max(...filteredKeys) : threshold;
	const evMatch = evMap.get(max);
	// console.log('This is max: ', max);
	// console.log('This is evMatch: ', evMap);
	let minEvs = evMatch![0];
	const equal = [];

	for (const i of evMatch!) {
		if (i == minEvs) {
			continue;
		}
		if (i[0] + i[1] < minEvs[0] + minEvs[1]) {
			minEvs = i;
		}
	}
	for (const i of evMatch!) {
		if (i == minEvs) {
			continue;
		}
		if (i[0] + i[1] == minEvs[0] + minEvs[1]) {
			equal.push(i);
		}
	}

	const maxHp = [...evMatch!].sort((a, b) => b[0] - a[0] || a[1] - b[1]);
	const maxDef = [...evMatch!].sort((a, b) => b[1] - a[1] || a[0] - b[0]);

	return { minEvs, equal, maxHp: maxHp[0], maxDef: maxDef[0], max, category };
}
