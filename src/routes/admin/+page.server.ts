import { db } from '$lib/db/drizzle';
import { itemSprites, pokemon } from '$lib/db/schema';
import { Generations } from '@pkmn/data';
import { Dex } from '@pkmn/dex';
import { PokemonClient } from 'pokenode-ts';

export const actions = {
	default: async () => {
		const monApi = new PokemonClient();
		const itemNames: string[] = [];
		const gens = new Generations(Dex);
		for (const i of gens.get(9).items) {
			itemNames.push(i.name as string);
		}

		const [res, res2, res3] = await Promise.all([
			fetch(`https://pokeapi.co/api/v2/pokedex/31/`),
			fetch(`https://pokeapi.co/api/v2/pokedex/32/`),
			fetch(`https://pokeapi.co/api/v2/pokedex/33/`)
		]);

		const json = await res.json();
		const json2 = await res2.json();
		const json3 = await res3.json();
		const poke = [...json.pokemon_entries, ...json2.pokemon_entries, ...json3.pokemon_entries];
		const mons = await Promise.all(
			poke.map(async (entry) => {
				try {
					const { pokemon_species } = entry;

					const mon = await monApi.getPokemonById(+pokemon_species.url.split('/').at(-2)!);
					return { id: mon.id, name: mon.name, sprite: mon.sprites.front_default || '' };
				} catch (e) {
					console.log(e);
				}
			})
		);
		const items: ({ name: string; sprite: string } | undefined)[] = await Promise.all(
			itemNames.map(async (item) => {
				try {
					console.log(item);
					const itemData = await fetch(
						`https://pokeapi.co/api/v2/item/${item.toLocaleLowerCase().split(' ').join('-')}`
					);
					const json = await itemData.json();
					return { name: item, sprite: json.sprites.default || '' };
				} catch (e) {
					console.log(e);
					return { name: item, sprite: '' };
				}
			})
		);

		const filtered = [...new Map(mons.map((mon) => [mon!.id, mon])).values()];
		console.log(filtered);
		try {
			await db
				.insert(pokemon)
				.values(filtered.map((mon) => ({ name: mon!.name, sprite: mon!.sprite, id: mon!.id })))
				.onConflictDoNothing();
			await db
				.insert(itemSprites)
				.values(items.map((item) => ({ name: item!.name, sprite: item!.sprite })))
				.onConflictDoNothing();
		} catch (e) {
			console.log('Insertion Failed');
			console.log(e);
		}
	}
};
