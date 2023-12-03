<script lang="ts">
	import type { AutocompleteValue } from '$lib/types';
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let items: string[] = [];
	export let store: AutocompleteValue;

	let comboboxValue: string = '';
	$: console.log(comboboxValue);
	let selected = '';
	$: filtered = items.filter((item) =>
		item.toLocaleLowerCase().includes(selected.toLocaleLowerCase())
	);

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<div>
	<input
		type="search"
		class="input focus:outline-none p-1 w-32"
		placeholder="Search..."
		use:popup={popupCombobox}
		bind:value={selected}
	/>
</div>

<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
	<ListBox rounded="rounded-none" class="h-72 overflow-auto">
		{#each filtered as name}
			<ListBoxItem
				bind:group={comboboxValue}
				name="medium"
				value={name}
				on:click={() => (store = comboboxValue.toLocaleLowerCase())}>{name}</ListBoxItem
			>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
