import type { AttackerProps, BestEvs, DefenderProps } from '$lib/types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { Field, Pokemon, type GenerationNum } from '@smogon/calc';
import { writable, type Writable } from 'svelte/store';

export const attacker: Writable<AttackerProps> = localStorageStore<AttackerProps>('Attacker', {
	...new Pokemon(9, 'flutter-mane', {
		item: 'Choice Specs',
		nature: 'Modest',
		evs: { spa: 36 },
		level: 50
	}),
	sprite: undefined,
	// sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png',
	move: 'Shadow Ball'
});

export const defender: Writable<DefenderProps> = localStorageStore<DefenderProps>('Defender', {
	...new Pokemon(9, 'gothitelle', { item: 'Sitrus Berry', nature: 'Calm', level: 50 }),
	sprite: undefined
	// sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/576.png'
});

export const field = writable<Field>(new Field({ gameType: 'Doubles' }));

export const generation = writable<GenerationNum>(9);

export const itemSprite = writable<string>('');

export const bestEv = writable<BestEvs>();
