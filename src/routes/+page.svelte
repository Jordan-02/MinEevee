<script lang="ts">
	import { getBestEVs } from '$lib/calculate';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import { Generations } from '@pkmn/data';
	import { Dex } from '@pkmn/dex';
	import type { GenerationNum } from '@smogon/calc';
	import { attacker, bestEv, defender, generation } from '../lib/stores/stores';

	export let data;

	const { mons } = data;
	const countries = data.data.countries;
	let bestEvs: any;
	console.log(mons);

	const generations: { name: string; id: GenerationNum }[] = [
		{ name: 'Kanto', id: 1 },
		{ name: 'Johto', id: 2 },
		{ name: 'Hoenn', id: 3 },
		{ name: 'Sinnoh', id: 4 },
		{ name: 'Unova', id: 5 },
		{ name: 'Kalos', id: 6 },
		{ name: 'Alola', id: 7 },
		{ name: 'Galar', id: 8 },
		{ name: 'Paldea', id: 9 }
	];
	// const attacker = {
	// 	name: 'Flutter Mane',
	// 	item: 'Choice Specs',
	// 	nature: 'Modest',
	// 	evs: { spa: 44, spe: 252, hp: 4 },
	// 	ivs: { spa: 31, spe: 31, hp: 31 },
	// 	//boosts: { spa: 0 },
	// 	move: 'Shadow Ball',
	// 	level: 50
	// };

	// const defender = {
	// 	name: 'Gothitelle',
	// 	item: 'Sitrus Berry',
	// 	nature: 'Calm',
	// 	ivs: { spd: 31, hp: 31, def: 31 },
	// 	level: 50
	// };

	let evs: Partial<{
		hp: number;
		atk: number;
		def: number;
		spa: number;
		spd: number;
		spe: number;
	}> = {};

	const gens = new Generations(Dex);

	function getItems(genNum: number) {
		let allItems: string[] = [];
		for (const i of gens.get(genNum).items) {
			allItems.push(i.name);
		}
		return allItems;
	}
	function getMoves(genNum: number) {
		let allMoves: string[] = [];
		for (const i of gens.get(genNum).moves) {
			allMoves.push(i.name);
		}
		return allMoves;
	}

	$: names = mons.map((i) => i!.name);
	$: items = getItems($generation).sort((a, b) => a.localeCompare(b));
	$: moves = getMoves($generation).sort((a, b) => a.localeCompare(b));
	$: natures = Object.entries(gens.dex.data.Natures).map((i) => i[1].name);

	$: nameMap = names.map((name) => ({ name, id: name }));
	$: itemsMap = items.map((name) => ({ name, id: name }));
	$: movesMap = moves.map((name) => ({ name, id: name }));
	$: naturesMap = natures.map((name) => ({ name, id: name }));

	function handleClick() {
		bestEvs = getBestEVs({
			attacker: $attacker,
			defender: $defender,
			generation: $generation,
			threshold: 1
		});
		$bestEv = bestEvs;
	}

	$: buttonStyle = (id: number): string => {
		if (id == $generation) {
			return 'border border-white px-3 py-2 rounded-xl bg-white text-black transition duration-200 ease-in';
		} else {
			return 'border border-white px-3 py-2 rounded-xl hover:bg-white hover:text-black transition duration-200 ease-in hover:-translate-y-2';
		}
	};
</script>

<div>
	<div class="flex justify-evenly mx-20 my-12">
		{#each generations as region (region.id)}
			<button class={buttonStyle(region.id)} on:click={() => ($generation = region.id)}
				>Gen {region.id}</button
			>
		{/each}
	</div>
	<div class="flex h-full justify-center">
		<PokemonCard
			names={nameMap}
			monType="Attacker"
			pokemon={attacker}
			items={itemsMap}
			moves={movesMap}
			natures={naturesMap}
		/>

		<PokemonCard
			names={nameMap}
			monType="Defender"
			pokemon={defender}
			items={itemsMap}
			natures={naturesMap}
		/>
	</div>

	<button on:click={handleClick}>Click me</button>
	{#if bestEvs}
		<a href="/results"> Click to go to results</a>
		<p>Least Amount of Evs to survive: HP:{bestEvs.minEvs[0]} DEF: {bestEvs.minEvs[1]}</p>
		<p>
			Least Amount of Evs to survive with maximum HP: HP:{bestEvs.maxHp[0]} DEF: {bestEvs.maxHp[1]}
		</p>
		<p>
			Least Amount of Evs to survive with maximum DEF: HP:{bestEvs.maxDef[0]} DEF: {bestEvs
				.maxDef[1]}
		</p>
	{/if}
	<button on:click={() => console.log($attacker)}>Get props</button>
	<button on:click={() => console.log($defender)}>Get props</button>
</div>
