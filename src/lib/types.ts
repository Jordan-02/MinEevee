import type { GenerationNum, Move } from '@smogon/calc';
import type { Generation } from '@smogon/calc/dist/data/interface';

export interface DefenderProps {
	name?: string;
	item?: string;
	nature?: string;
	evs?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	ivs?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	boosts?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	level?: number;
}

export interface AttackerProps extends DefenderProps {
	move?: string;
}

export interface OptimizeProps extends EvMapProps {
	move: Move;
}

export interface EvMapProps {
	attacker: AttackerProps;
	defender: DefenderProps;
	generation: GenerationNum | Generation;
}

export interface BestEvProps extends EvMapProps {
	threshold: number;
}

export type DamageRoll = number | number[] | [number[], number[]];
