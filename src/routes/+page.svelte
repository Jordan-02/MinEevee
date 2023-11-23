<script lang="ts">
	import { getBestEVs } from '$lib/calculate';
	import type { AttackerProps, DefenderProps } from '$lib/types';
	import { Generations } from '@pkmn/data';
	import { Dex } from '@pkmn/dex';
	import Svelecte from 'svelecte';
	import { generation } from '../lib/stores/stores';

	export let data;

	console.log(data);
	let bestEvs: any;

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

	let attacker: AttackerProps = { level: 50 };
	let defender: DefenderProps = { level: 50 };
	let evs: Partial<{
		hp: number;
		atk: number;
		def: number;
		spa: number;
		spd: number;
		spe: number;
	}> = {};

	//const result = getBestEVs({ attacker, defender, generation: 9, threshold: 1 });
	let gen = $generation;

	const gens = new Generations(Dex);

	function getNames(genNum: number) {
		let allNames: string[] = [];
		for (const i of gens.get(genNum).species) {
			allNames.push(i.name);
		}
		return allNames;
	}
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

	//$: names = getNames(gen).sort((a, b) => a.localeCompare(b));
	$: names = data.correct.map((i) => i!.name);
	$: items = getItems(gen).sort((a, b) => a.localeCompare(b));
	$: moves = getMoves(gen).sort((a, b) => a.localeCompare(b));
	$: natures = Object.entries(gens.dex.data.Natures).map((i) => i[1].name);

	$: nameMap = names.map((name) => ({ name, id: name }));
	$: itemsMap = items.map((name) => ({ name, id: name }));
	$: movesMap = moves.map((name) => ({ name, id: name }));
	$: naturesMap = natures.map((name) => ({ name, id: name }));

	let attackerImage: Response | undefined;
	let defenderImage: Response | undefined;

	function handleClick() {
		attacker.evs = evs;
		console.log(attacker, defender);
		bestEvs = getBestEVs({ attacker, defender, generation: 9, threshold: 1 });
	}

	async function getAttackerSprite() {
		if (attacker.name) {
			const pokemon = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${attacker.name.toLocaleLowerCase()}`
			);
			const json = await pokemon.json();
			attackerImage = await fetch(
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${json.id}.png`
			);
		}
	}
	async function getDefenderSprite() {
		if (defender.name) {
			const pokemon = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${defender.name.toLocaleLowerCase()}`
			);
			const json = await pokemon.json();
			defenderImage = await fetch(
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${json.id}.png`
			);
		}
	}
</script>

<div>
	<!-- <input
		type="range"
		bind:value={gen}
		min="1"
		max="9"
		class="text-black"
		on:change={() => {
			attacker.name = undefined;
			attacker.item = undefined;
			defender.name = undefined;
			defender.item = undefined;
		}}
	/> -->
	<div class="flex h-full justify-center">
		<div class="card p-4 border border-white flex w-1/3 flex-col items-center gap-3">
			{#if attackerImage}
				<img src={attackerImage.url} alt="Attacker" class="w-52 h-52" />
			{:else}
				<span class="font-bold text-2xl w-52 h-52">No sprite available</span>
			{/if}
			<div class="text-black w-1/2">
				<Svelecte
					options={nameMap}
					bind:value={attacker.name}
					placeholder="Enter Pokemon..."
					on:change={getAttackerSprite}
				/>
			</div>
			<div class="text-black w-1/2">
				<Svelecte options={itemsMap} bind:value={attacker.item} placeholder="Enter Item..." />
			</div>

			<div class="text-black w-1/2">
				<Svelecte options={movesMap} bind:value={attacker.move} placeholder="Enter Move..." />
			</div>
			<div class="text-black w-1/2">
				<Svelecte options={naturesMap} bind:value={attacker.nature} placeholder="Enter Nature..." />
			</div>
			<input type="number" bind:value={attacker.level} class="text-black" />
			<input type="number" bind:value={evs.atk} class="text-black" />
			<input type="number" bind:value={evs.spa} class="text-black" />
		</div>

		<div class="card p-4 border border-white w-1/3 flex flex-col items-center">
			{#if defenderImage}
				<img src={defenderImage.url} alt="Defender" class="w-52 h-52" />
			{:else}
				<span class="font-bold text-2xl w-52 h-52">No sprite available</span>
			{/if}
			<div class="text-black w-1/2">
				<Svelecte
					options={nameMap}
					bind:value={defender.name}
					placeholder="Enter Pokemon..."
					on:change={getDefenderSprite}
				/>
			</div>
			<div class="text-black w-1/2">
				<Svelecte options={itemsMap} bind:value={defender.item} placeholder="Enter Item..." />
			</div>
			<div class="text-black w-1/2">
				<Svelecte options={naturesMap} bind:value={defender.nature} placeholder="Enter Nature..." />
			</div>
			<div class="flex gap-2">
				<label for="DefLevel">Level</label>
				<input id="DefLevel" type="number" bind:value={defender.level} class="text-black" />
			</div>
		</div>
	</div>

	<button on:click={handleClick}>Click me</button>
	{#if bestEvs}
		<p>Least Amount of Evs to survive: HP:{bestEvs.minEvs[0]} DEF: {bestEvs.minEvs[1]}</p>
		<p>
			Least Amount of Evs to survive with maximum HP: HP:{bestEvs.maxHp[0]} DEF: {bestEvs.maxHp[1]}
		</p>
		<p>
			Least Amount of Evs to survive with maximum DEF: HP:{bestEvs.maxDef[0]} DEF: {bestEvs
				.maxDef[1]}
		</p>
	{/if}
</div>
