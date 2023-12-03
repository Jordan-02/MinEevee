import type { AttackerProps, BestEvs, DefenderProps } from '$lib/types';
import { Field, Pokemon, type GenerationNum } from '@smogon/calc';
import { writable } from 'svelte/store';

export const attacker = writable<AttackerProps>({
	...new Pokemon(9, 'flutter-mane', {
		item: 'Choice Specs',
		nature: 'Modest',
		evs: { spa: 36 },
		level: 50
	}),
	sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png',
	move: 'Shadow Ball'
});

export const defender = writable<DefenderProps>({
	...new Pokemon(9, 'gothitelle', { item: 'Sitrus Berry', nature: 'Calm', level: 50 }),
	sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/576.png'
});

export const field = writable<Field>(new Field());

export const generation = writable<GenerationNum>(9);

export const itemSprite = writable<string>('');

export const bestEv = writable<BestEvs>();
