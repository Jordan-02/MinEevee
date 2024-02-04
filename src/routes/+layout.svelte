<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import '../app.css';
	import type { PageData } from './$types';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	console.log(data);
</script>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="grow">
		<PageTransition url={data.props.url.toString()}>
			<slot />
		</PageTransition>
	</main>
	<Footer />
</div>
