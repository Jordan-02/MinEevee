import type { AttackerProps, DefenderProps } from '$lib/types';
import { writable } from 'svelte/store';

export const attacker = writable<Partial<AttackerProps>>({});

export const defender = writable<Partial<DefenderProps>>({});

export const generation = writable<number>(9);
