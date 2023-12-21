<script lang="ts">
	import { getBestEVs } from '$lib/calculate';
	import { attacker, bestEv, defender, field, generation } from '$lib/stores/stores';
	import { Generations } from '@pkmn/data';
	import { Dex } from '@pkmn/dex';
	console.log($bestEv);
	const defType = $bestEv.category == 'Physical' ? 'DEF' : 'SPD';
	let threshold = $bestEv.max;
	const gens = new Generations(Dex);

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

{#if $bestEv}
	<div class="flex flex-col justify-center items-center gap-y-8 my-8">
		<h1 class="font-black text-4xl">Results</h1>
		<div class="card p-4 w-1/3 text-center flex flex-col gap-y-2">
			{#if $bestEv.same}
				<div class="flex flex-col items-center">
					<p class="font-bold whitespace-pre-line">Least amount of EVs to survive:</p>
					<span class="chip variant-ghost-secondary hover:variant-filled-secondary p-2 mt-2">
						HP:{$bestEv.minEvs[0]}
						{defType}: {$bestEv.minEvs[1]}
					</span>
					<p class="pre capitalize text-xs">
						{$bestEv.minEvs[2].desc()}
					</p>
				</div>

				<div class="flex flex-col items-center">
					<p class="font-bold">Least amount of EVs to survive whilst optimizing for HP:</p>
					<span class="chip variant-ghost-secondary hover:variant-filled-secondary p-2 mt-2">
						HP:{$bestEv.maxHp[0]}
						{defType}: {$bestEv.maxHp[1]}
					</span>
					<p class="pre capitalize text-xs">
						{$bestEv.maxHp[2].desc()}
					</p>
				</div>
				<div class="flex flex-col items-center">
					<p class="font-bold">
						Least amount of EVs to survive whilst maximing {defType}:
					</p>
					<span class="chip variant-ghost-secondary hover:variant-filled-secondary p-2 mt-2">
						HP:{$bestEv.maxDef[0]}
						{defType}: {$bestEv.maxDef[1]}
					</span>

					<p class="pre capitalize text-xs">
						{$bestEv.maxDef[2].desc()}
					</p>
				</div>
				<div class="mt-4 flex flex-col items-center gap-y-2">
					<p>Would you like to try again with a different survival benchmark?</p>
					<select class="select text-center mt-2" bind:value={threshold}>
						{#each { length: 16 } as _, i}
							<option value={1 - i / 16}>{((i / 16) * 100).toFixed(1)}% to KO</option>
						{/each}
					</select>
					<a href="/results" on:click={handleClick} class="btn variant-filled-secondary">
						Recalc
					</a>
				</div>
			{:else}
				<h2 class="h2 font-bold">
					<span class="capitalize">{$defender.name} </span>
					cannot survive {['a', 'e', 'i', 'o', 'u'].some((char) =>
						$attacker.move?.toLowerCase().charAt(0).includes(char)
					)
						? 'an'
						: 'a'}
					{$attacker.move} from <span class="capitalize"> {$attacker.name}</span>
					at all.
				</h2>
				<div class="mt-4 flex flex-col items-center gap-y-2">
					<p>Would you like to try again with a different nature?</p>
					<select class="select" bind:value={$defender.nature}>
						{#each Object.entries(gens.dex.data.Natures).map((i) => i[1].name) as nature, i}
							<option value={nature}>{nature}</option>
						{/each}
					</select>
					<a href="/results" on:click={handleClick} class="btn variant-filled-secondary">
						Recalc
					</a>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<p class="flex justify-center h-screen font-black text-4xl items-center">
		There are no results available.
	</p>
{/if}
