<script>
	import image from '$lib/assets/eevee.png';
</script>

<nav class="border flex justify-between items-center">
	<a class="ml-6 flex items-center" href="/" data-sveltekit-preload-data>
		<img src={image} alt="MinEevee" class="h-10" />
		<span>MinEevee</span>
	</a>
	<ul class="mr-6 flex gap-6">
		<a href="/about">About Me</a>
		<li>Projects</li>
	</ul>
</nav>
