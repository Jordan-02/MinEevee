import { GameClient, POKEDEXES, PokemonClient } from 'pokenode-ts';
import type { PageLoad } from './$types';

const generations = {
	1: 'kanto',
	2: 'updated-johto',
	3: 'updated-hoenn',
	4: 'extended-sinnoh',
	5: 'updated-unova',
	6: 'kalos',
	7: 'updated-alola',
	8: 'galar',
	9: 'paldea'
};

export const load = (async () => {
	//const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${generations[9]}/`);
	const api = new GameClient();
	const monApi = new PokemonClient();
	const pokedex = await Promise.all([
		api.getPokedexById(POKEDEXES.CROWN_TUNDRA),
		api.getPokedexById(POKEDEXES.ISLE_OF_ARMOR),
		api.getPokedexById(POKEDEXES.GALAR)
	]);

	const genMons = pokedex.reduce((acc, curr) => {
		acc.pokemon_entries = [...acc.pokemon_entries, ...curr.pokemon_entries];
		return acc;
	});

	const correct = await Promise.all(
		genMons.pokemon_entries.map(async (entry) => {
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
	//const json = await res.json();
	return {
		correct
	};
}) satisfies PageLoad;
