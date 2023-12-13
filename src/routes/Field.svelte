<script lang="ts">
	import { field } from '$lib/stores/stores';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	$: console.log($field);
	let weatherTab: string;
	let terrainTab: string;
	$: {
		switch ($field.weather) {
			case 'Sand':
				weatherTab = 'bg-yellow-800';
				break;
			case 'Sun':
				weatherTab = 'bg-yellow-500';
				break;
			case 'Rain':
				weatherTab = 'bg-blue-500';
				break;
			case 'Snow':
				weatherTab = 'bg-secondary-400';
				break;
			default:
				weatherTab = 'bg-error-900';
				break;
		}
		switch ($field.terrain) {
			case 'Electric':
				terrainTab = 'bg-yellow-500';
				break;
			case 'Psychic':
				terrainTab = 'bg-pink-500';
				break;
			case 'Grassy':
				terrainTab = 'bg-green-500';
				break;
			case 'Misty':
				terrainTab = 'bg-rose-400';
				break;
			default:
				terrainTab = 'bg-error-900';
				break;
		}
	}
</script>

<div class="pb-4 border border-white flex flex-col items-center gap-3 relative">
	<div class="border-b w-full p-2">
		<h1 class="font-bold text-3xl">Field</h1>
	</div>

	<div class="flex flex-col items-center gap-y-2 p-2">
		<!-- <div class="btn-group variant-filled">
			<button
				on:click={() => ($field.gameType = 'Singles')}
				class={`${$field.gameType == 'Singles' ? 'bg-red-700 hover:bg-red-400' : ''}`}
			>
				Singles
			</button>
			<button on:click={() => ($field.gameType = 'Doubles')}> Doubles </button>
		</div> -->

		<TabGroup
			justify="justify-center"
			border="border-2 border-surface-900-50-token rounded-l-xl rounded-r-xl"
			active="bg-secondary-500 text-white"
			rounded="rounded-none  "
		>
			<Tab
				bind:group={$field.gameType}
				name="Singles"
				value={'Singles'}
				border="border-r-3 border-white"
			>
				<span>Singles</span>
			</Tab>
			<Tab bind:group={$field.gameType} name="Doubles" value={'Doubles'}>
				<span>Doubles</span>
			</Tab>
		</TabGroup>
		<TabGroup
			justify="justify-center"
			border="border-2 border-surface-900-50-token rounded-l-xl rounded-r-xl"
			rounded="rounded-none last:border-none border-r-2 border-white"
			flex="flex-1 lg:flex-none flex-wrap"
		>
			{#each ['None', 'Sand', 'Sun', 'Rain', 'Snow'] as weather}
				<Tab
					bind:group={$field.weather}
					name={weather}
					value={weather == 'None' ? undefined : weather}
					active={` ${weatherTab}`}
				>
					<span>{weather}</span>
				</Tab>
			{/each}
		</TabGroup>
		<TabGroup
			justify="justify-center"
			border="border-2 border-surface-900-50-token rounded-l-xl rounded-r-xl"
			rounded="rounded-none last:border-none border-r-2 border-white"
			flex="flex-1 lg:flex-none flex-wrap"
		>
			{#each ['None', 'Electric', 'Psychic', 'Grassy', 'Misty'] as terrain}
				<Tab
					bind:group={$field.terrain}
					name={terrain}
					value={terrain == 'None' ? undefined : terrain}
					active={` ${terrainTab}`}
				>
					<span>{terrain}</span>
				</Tab>
			{/each}
		</TabGroup>
	</div>
</div>
