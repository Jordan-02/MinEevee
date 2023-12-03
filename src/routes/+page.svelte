<script lang="ts">
	import { getBestEVs } from '$lib/calculate';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import { Generations } from '@pkmn/data';
	import { Dex } from '@pkmn/dex';
	import { attacker, bestEv, defender, field, generation } from '../lib/stores/stores';

	export let data;

	const { pokemon } = data;
	$field.gameType = 'Doubles';
	let threshold = 1;

	// const generations: { name: string; id: GenerationNum }[] = [
	// 	{ name: 'Kanto', id: 1 },
	// 	{ name: 'Johto', id: 2 },
	// 	{ name: 'Hoenn', id: 3 },
	// 	{ name: 'Sinnoh', id: 4 },
	// 	{ name: 'Unova', id: 5 },
	// 	{ name: 'Kalos', id: 6 },
	// 	{ name: 'Alola', id: 7 },
	// 	{ name: 'Galar', id: 8 },
	// 	{ name: 'Paldea', id: 9 }
	// ];

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

	$: items = getItems($generation).sort((a, b) => a.localeCompare(b));
	$: moves = getMoves($generation).sort((a, b) => a.localeCompare(b));
	$: natures = Object.entries(gens.dex.data.Natures).map((i) => i[1].name);

	$: itemsMap = items.map((name) => ({ name, id: name }));
	$: movesMap = moves.map((name) => ({ name, id: name }));
	$: naturesMap = natures.map((name) => ({ name, id: name }));

	function handleClick() {
		$bestEv = getBestEVs({
			attacker: $attacker,
			defender: $defender,
			generation: $generation,
			field: $field,
			threshold: threshold,
			move: $attacker.move!
		});
	}
</script>

<div class="flex flex-col items-center h-full">
	<!-- <TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		flex="flex-1 lg:flex-none"
		class="w-full my-4"
		rounded="rounded-xl"
		border="border-none"
	>
		{#each generations as region (region.id)}
			<Tab bind:group={$generation} value={region.id} name={region.name} class="mx-4"
				>Gen {region.id}
			</Tab>
		{/each}
	</TabGroup> -->
	<div class="flex w-full justify-center gap-x-10">
		<PokemonCard
			names={pokemon}
			monType="Attacker"
			pokemon={attacker}
			items={itemsMap}
			moves={movesMap}
			natures={naturesMap}
		/>
		<PokemonCard
			names={pokemon}
			monType="Defender"
			pokemon={defender}
			items={itemsMap}
			natures={naturesMap}
		/>
	</div>

	<a on:click={handleClick} href="results" class="btn variant-filled m-3">Calculate</a>
</div>
