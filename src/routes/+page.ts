import { PokemonClient } from 'pokenode-ts';
import type { PageLoad } from './$types';

export const load = (async ({ data, fetch }) => {
	//const api = new GameClient();
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
				const getId = async () => {
					const mon = await monApi.getPokemonById(+pokemon_species.url.split('/').at(-2)!);
					return { id: mon.id, name: mon.name };
				};

				return await getId();
			} catch (e) {
				console.log(e);
			}
		})
	);
	return {
		data,
		mons
	};

	// const pokedex = await Promise.all([
	// 	api.getPokedexById(POKEDEXES.CROWN_TUNDRA),
	// 	api.getPokedexById(POKEDEXES.ISLE_OF_ARMOR),
	// 	api.getPokedexById(POKEDEXES.GALAR)
	// ]);

	// const genMons = pokedex.reduce((acc, curr) => {
	// 	acc.pokemon_entries = [...acc.pokemon_entries, ...curr.pokemon_entries];
	// 	return acc;
	// });

	// mons = await Promise.all(
	// 	genMons.pokemon_entries.map(async (entry) => {
	// 		try {
	// 			const { pokemon_species } = entry;
	// 			const getId = async () => {
	// 				const mon = await monApi.getPokemonById(+pokemon_species.url.split('/').at(-2)!);
	// 				return { id: mon.id, name: mon.name };
	// 			};

	// 			return await getId();
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	})
	// );
	// return {
	// 	data,
	// 	mons
	// };
}) satisfies PageLoad;
