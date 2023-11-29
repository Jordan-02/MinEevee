import type { AttackerProps, BestEvs, DefenderProps } from '$lib/types';
import type { GenerationNum } from '@smogon/calc';
import { writable } from 'svelte/store';

export const attacker = writable<AttackerProps>({
	level: 50,
	move: 'Shadow Ball',
	evs: {
		atk: 0,
		spa: 36
	},
	nature: 'Modest',
	item: 'Choice Specs',
	name: 'flutter-mane'
});

export const defender = writable<Partial<DefenderProps>>({
	level: 50,
	nature: 'Calm',
	item: 'Sitrus Berry',
	name: 'gothitelle'
});
// export const attacker = writable<AttackerProps>({
// 	level: 50,
// 	move: undefined,
// 	evs: { atk: 0, spa: 0 }
// });

// export const defender = writable<Partial<DefenderProps>>({ level: 50 });

export const generation = writable<GenerationNum>(9);

export const itemSprite = writable<string>('');

//export const bestEv = writable<BestEvs>();
export const bestEv = writable<BestEvs>({
	minEvs: [204, 164],
	equal: [],
	maxHp: [252, 132],
	maxDef: [140, 252],
	max: 1,
	category: 'Special'
});
