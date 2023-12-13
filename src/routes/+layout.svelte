<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import '../app.css';
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
	import PageTransition from './PageTransition.svelte';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
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
