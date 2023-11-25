import type { AttackerProps, BestEvs, DefenderProps } from '$lib/types';
import type { GenerationNum } from '@smogon/calc';
import { writable } from 'svelte/store';

export const attacker = writable<AttackerProps>({
	level: 50,
	move: undefined,
	evs: { atk: 0, spa: 0 }
});

export const defender = writable<Partial<DefenderProps>>({ level: 50 });

export const generation = writable<GenerationNum>(9);

export const bestEv = writable<BestEvs>();
