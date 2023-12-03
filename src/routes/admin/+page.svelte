<script lang="ts">
	let checked = false;
</script>

<div class="flex justify-center items-center flex-col gap-y-4 h-[80vh]">
	<label class="flex items-center gap-x-3">
		<input type="checkbox" bind:checked class="checkbox" />
		<p>Yes am sure I want to fill</p>
	</label>

	<form method="POST" class="flex flex-col">
		<button
			type="submit"
			class="btn variant-filled-error px-10 py-3 disabled:variant-soft-error"
			disabled={!checked}>Fill DB</button
		>
	</form>
	{#if checked}
		<aside class=" italic dark:text-error-400/50">
			Do not run this unless you have a postgres database connected
		</aside>
	{/if}
</div>
