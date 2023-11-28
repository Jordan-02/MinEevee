<script>
	import { bestEv } from '$lib/stores/stores';
	console.log($bestEv);
</script>

{#if $bestEv}
	<p>Least Amount of Evs to survive: HP:{$bestEv.minEvs[0]} DEF: {$bestEv.minEvs[1]}</p>
	<p>Category: {$bestEv.category}</p>
{:else}
	<p class="flex justify-center h-screen font-black text-4xl items-center">
		There are no results available.
	</p>
{/if}
