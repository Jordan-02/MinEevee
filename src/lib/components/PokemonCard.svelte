<script lang="ts">
	import { attacker } from '$lib/stores/stores';
	import type { AttackerProps, DefenderProps, MapProps } from '$lib/types';
	import type { NatureName } from '@pkmn/data';
	import Svelecte from 'svelecte';
	import type { Writable } from 'svelte/store';

	export let names: MapProps[];
	export let monType: 'Attacker' | 'Defender';
	export let pokemon: Writable<Partial<AttackerProps>> | Writable<Partial<DefenderProps>>;
	export let items: MapProps[];
	export let moves: MapProps[] | undefined = undefined;
	export let natures: { name: NatureName; id: NatureName }[];

	let item: Response | undefined;

	const getPokemonSprite = () => {
		if ($pokemon.name) {
			const sprite = names.find((o) => o.name === $pokemon.name);
			$pokemon.sprite = sprite?.sprite;
		}
	};

	const getItemSprite = async () => {
		if ($pokemon.item) {
			const sprite = await fetch(
				`https://pokeapi.co/api/v2/item/${$pokemon.item.toLocaleLowerCase().split(' ').join('-')}`
			);
			const json = await sprite.json();
			item = json.sprites.default;
		}
	};
</script>

<div class="card p-4 border border-white flex w-1/3 flex-col items-center gap-3 relative">
	{#if $pokemon.item}
		<img src={`${item}`} alt="Item" class="h-16 absolute top-[30%] left-1/3" />
	{/if}
	{#if $pokemon.sprite}
		<img src={`${$pokemon.sprite}`} alt="Sprite" class="w-52 h-52" />
	{:else}
		<span class="font-bold text-2xl w-52 h-52">No sprite available</span>
	{/if}
	<div class="text-black w-1/2">
		<Svelecte
			options={names.map((name) => ({ name: name.name, id: name.name }))}
			bind:value={$pokemon.name}
			placeholder="Enter Pokemon..."
			on:change={getPokemonSprite}
		/>
	</div>
	<div class="text-black w-1/2">
		<Svelecte
			options={items}
			bind:value={$pokemon.item}
			placeholder="Enter Item..."
			on:change={getItemSprite}
		/>
	</div>
	{#if 'move' in $pokemon}
		<div class="text-black w-1/2">
			<Svelecte options={moves} bind:value={$pokemon.move} placeholder="Enter Move..." />
		</div>
	{/if}
	<div class="text-black w-1/2">
		<Svelecte options={natures} bind:value={$pokemon.nature} placeholder="Enter Nature..." />
	</div>
	<input type="number" bind:value={$pokemon.level} class="text-black" max={100} min={0} />
	{#if monType == 'Attacker'}
		<input
			type="number"
			bind:value={$attacker.evs.atk}
			class="text-black"
			max={252}
			min={0}
			step={4}
		/>
		<input
			type="number"
			bind:value={$attacker.evs.spa}
			class="text-black"
			max={252}
			min={0}
			step={4}
		/>
	{/if}
</div>
