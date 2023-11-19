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

export const load = (async ({ fetch }) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${generations[3]}/`);
	const json = await res.json();
	return {
		json
	};
}) satisfies PageLoad;
