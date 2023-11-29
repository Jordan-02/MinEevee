<script>
	import image from '$lib/assets/eevee.png';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar class="sticky top-0 left-0 w-full z-50 px-24">
	<svelte:fragment slot="lead">
		<a href="/" class="flex items-center">
			<img src={image} alt="MinEevee" class="h-10" />
			<span>MinEevee</span>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<ul class="flex gap-x-4">
			<li>
				<a href="about">About Me</a>
			</li>
			<li>
				<a href="admin">Dashboard</a>
			</li>
			<li>
				<LightSwitch />
			</li>
		</ul>
	</svelte:fragment>
</AppBar>
