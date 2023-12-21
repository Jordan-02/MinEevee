<script lang="ts">
	import type { AttackerProps, DefenderProps, MapProps } from '$lib/types';
	import type { NatureName } from '@pkmn/data';
	import Svelecte from 'svelecte';
	import type { Writable } from 'svelte/store';
	export let names: MapProps[];
	export let monType: 'Attacker' | 'Defender';
	export let pokemon: Writable<AttackerProps> | Writable<Partial<DefenderProps>>;
	export let items: MapProps[];
	export let moves: MapProps[] | undefined = undefined;
	export let natures: { name: NatureName; id: NatureName }[];

	let item: Response | undefined;

	const getPokemonSprite = () => {
		const sprite = names.find((o) => o.name === $pokemon.name);
		$pokemon.sprite = sprite?.sprite;
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

<!-- {$itemSprite || 'hey'}
<Autocomplete items={items.map((item) => item.name)} store={itemSprite} /> -->
<div class="pb-4 border border-white flex w-1/3 flex-col items-center gap-3 relative">
	<div class="border-b w-full p-2">
		{#if monType == 'Attacker'}
			<h1 class="font-bold text-3xl">Attacker</h1>
		{:else}
			<h1 class="font-bold text-3xl">Defender</h1>
		{/if}
	</div>
	{#if $pokemon.item}
		<img src={`${item}`} alt="Item" class="h-16 absolute top-[30%] left-1/3" />
	{/if}
	{#if $pokemon.sprite}
		<img src={`${$pokemon.sprite}`} alt="Sprite" class="w-52 h-52" />
	{:else}
		<span class="font-bold text-2xl w-52 h-52">No sprite available</span>
	{/if}
	<div class=" w-1/2">
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
			class="svelecte-control "
		/>
	</div>
	{#if 'move' in $pokemon}
		<div class="text-black w-1/2">
			<Svelecte options={moves} bind:value={$pokemon.move} placeholder="Enter Move..." />
		</div>
	{/if}
	<div class="text-black w-1/2">
		<select class="select text-white" bind:value={$pokemon.nature}>
			{#each natures as nature}
				<option value={nature.name}> {nature.name}</option>
			{/each}
		</select>
		<!-- <Svelecte options={natures} bind:value={$pokemon.nature} placeholder="Enter Nature..." /> -->
	</div>
	<input type="number" bind:value={$pokemon.level} class="text-black" max={100} min={0} />
	{#if monType == 'Attacker' && $pokemon.evs && $pokemon.ivs}
		<table class="mx-3">
			<tbody>
				<tr>
					<th />
					<th>IVs</th>
					<th>EVs</th>
				</tr>
				<tr>
					<td>Attack</td>
					<td
						><input
							type="number"
							class="input focus:outline-none p-1"
							bind:value={$pokemon.ivs.atk}
							max={31}
							min={0}
							step={1}
						/>
					</td>
					<td
						><input
							type="number"
							class="input focus:outline-none p-1"
							bind:value={$pokemon.evs.atk}
							max={252}
							min={0}
							step={4}
						/>
					</td>
				</tr>
				<tr>
					<td>Sp. Attack</td>
					<td
						><input
							type="number"
							class="input focus:outline-none p-1"
							bind:value={$pokemon.ivs.spa}
							max={31}
							min={0}
							step={1}
						/>
					</td>
					<td
						><input
							type="number"
							class="input focus:outline-none p-1"
							bind:value={$pokemon.evs.spa}
							max={252}
							min={0}
							step={4}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	{/if}
</div>
