import type { GenerationNum, Move } from '@smogon/calc';
import type { Generation, MoveCategory } from '@smogon/calc/dist/data/interface';

export interface PokemonProps {
	name?: string;
	item?: string;
	nature?: string;
	evs: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	ivs?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	boosts?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	level?: number;
	sprite?: string;
}

export interface DefenderProps extends PokemonProps {}

export interface AttackerProps extends PokemonProps {
	move?: string;
}

export interface OptimizeProps extends EvMapProps {
	move: Move;
}

export interface EvMapProps {
	attacker: Partial<AttackerProps>;
	defender: Partial<DefenderProps>;
	generation: GenerationNum | Generation;
}

export interface BestEvProps extends EvMapProps {
	threshold: number;
}

export type DamageRoll = number | number[] | [number[], number[]];

export interface MapProps {
	name: string;
	sprite?: string;
	id: string | number;
}

export interface BestEvs {
	minEvs: number[];
	equal: number[][];
	maxHp: number[];
	maxDef: number[];
	max: number;
	category: MoveCategory;
}
