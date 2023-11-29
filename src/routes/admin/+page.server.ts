import { db } from '$lib/db/drizzle';
import { pokemon } from '$lib/db/schema';
import { PokemonClient } from 'pokenode-ts';

export const actions = {
	default: async () => {
		const monApi = new PokemonClient();

		const [res, res2] = await Promise.all([
			fetch(`https://pokeapi.co/api/v2/pokedex/31/`),
			fetch(`https://pokeapi.co/api/v2/pokedex/32/`)
		]);

		const json = await res.json();
		const json2 = await res2.json();
		const poke = [...json.pokemon_entries, ...json2.pokemon_entries];
		const mons = await Promise.all(
			poke.map(async (entry) => {
				try {
					const { pokemon_species } = entry;

					const mon = await monApi.getPokemonById(+pokemon_species.url.split('/').at(-2)!);
					return { id: mon.id, name: mon.name, sprite: mon.sprites.front_default! };
				} catch (e) {
					console.log(e);
				}
			})
		);
		const filtered = [...new Map(mons.map((mon) => [mon!.id, mon])).values()];
		try {
			await db
				.insert(pokemon)
				.values(filtered.map((mon) => ({ name: mon!.name, sprite: mon!.sprite, id: mon!.id })));
		} catch (e) {
			console.log('Insertion Failed');
		}
	}
};
