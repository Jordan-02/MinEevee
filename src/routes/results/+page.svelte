<script>
	import { bestEv } from '$lib/stores/stores';
	console.log($bestEv);
	const defType = $bestEv.category == 'Physical' ? 'DEF' : 'SPD';
</script>

{#if $bestEv}
	<div class="flex flex-col justify-center items-center h-[80vh] gap-y-10">
		<h1 class="font-black text-4xl">Results</h1>
		<div class="card p-4 w-1/3 h-1/2 text-center">
			{#if $bestEv.max == 1}
				<p>Least Amount of Evs to survive: HP:{$bestEv.minEvs[0]} {defType}: {$bestEv.minEvs[1]}</p>
			{:else}
				<p>
					Least Amount of Evs to survive with maximum HP: HP:{$bestEv.maxHp[0]}
					{defType}: {$bestEv.maxHp[1]}
				</p>
			{/if}
			<div class="">
				<p>Would you like to try again with a different nature?</p>
				<a href="/" class="btn variant-filled-primary">Recalc</a>
			</div>
		</div>
	</div>
{:else}
	<p class="flex justify-center h-screen font-black text-4xl items-center">
		There are no results available.
	</p>
{/if}
