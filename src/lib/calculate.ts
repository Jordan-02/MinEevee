import { Move, Pokemon, Result, calculate } from '@smogon/calc';
import type { BestEvProps, DamageRoll, EvMapProps, OptimizeProps } from './types';

function optimize({ attacker, defender, generation, move, field }: OptimizeProps) {
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

	const result = calculate(generation, op, def, move, field);
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

function getEvMap({ attacker, defender, generation, field, move }: EvMapProps) {
	let hp = 0;
	const keys = [...Array(17).keys()].map((x) => x++ / 16);
	// const gen = Generations.get(generation as GenerationNum);
	const mv = new Move(generation, move);

	const evMap = new Map<number, [number, number, Result][]>(keys.map((val) => [val, []]));

	while (hp <= 252) {
		let def = 252;
		while (def >= 0) {
			const evs = { hp: hp, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
			if (mv.category == 'Special') {
				evs.spd = def;
			} else {
				evs.def = def;
			}
			const result = optimize({
				attacker,
				defender: {
					...defender,
					evs: evs
				},
				generation,
				move: mv,
				field
			});
			// console.log(survivalChance(result.damage, result.defender.stats.hp), result.damage, i, j);
			evMap.get(survivalChance(result.damage, result.defender.stats.hp))!.push([hp, def, result]);
			if (def == 4) {
				def -= 4;
				continue;
			}
			def -= 8;
		}

		if (hp == 0) {
			hp += 4;
			continue;
		}
		hp += 8;
	}
	return { evMap, category: mv.category };
}

export function getBestEVs({
	attacker,
	defender,
	generation,
	threshold,
	field,
	move
}: BestEvProps) {
	const { evMap, category } = getEvMap({ attacker, defender, generation, field, move });

	const filteredKeys = [...evMap.keys()].filter((x) => evMap.get(x)!.length > 0);

	const max = threshold > Math.max(...filteredKeys) ? Math.max(...filteredKeys) : threshold;
	const evMatch = evMap.get(max);

	let minEvs = evMatch![0];
	const equal = [];

	for (const i of evMatch!) {
		if ((i.slice(0, 2) as [number, number]) == (minEvs.slice(0, 2) as [number, number])) {
			continue;
		}
		if (i[0] + i[1] < minEvs[0] + minEvs[1]) {
			minEvs = i;
		}
	}
	for (const i of evMatch!) {
		if ((i.slice(0, 2) as [number, number]) == (minEvs.slice(0, 2) as [number, number])) {
			continue;
		}
		if (i[0] + i[1] == minEvs[0] + minEvs[1]) {
			equal.push(i);
		}
	}

	const maxHp = [...evMatch!].sort((a, b) => a[1] - b[1] || a[0] + a[1] - (b[0] + b[1]));
	// const min = [...evMatch!].sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
	// console.log(
	// 	'Lest Evs',
	// 	[...evMatch!].sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
	// );
	const maxDef = [...evMatch!].sort((a, b) => a[0] - b[0] || a[0] + a[1] - (b[0] + b[1]));

	return {
		minEvs,
		equal,
		maxHp: maxHp[0],
		maxDef: maxDef[0],
		max,
		category,
		same: max == threshold
	};
}
