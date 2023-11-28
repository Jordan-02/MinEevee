<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import '../app.css';
	import type { PageData } from './$types';
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
