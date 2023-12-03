import type { Field, GenerationNum, Move, Pokemon, Result } from '@smogon/calc';
import type { Generation, MoveCategory, SpeciesName } from '@smogon/calc/dist/data/interface';

export interface PokemonProps {
	name?: string;
	item?: string;
	nature?: string;
	evs: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	ivs: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	boosts?: Partial<{ hp: number; atk: number; def: number; spa: number; spd: number; spe: number }>;
	level?: number;
	sprite?: string;
}

export interface DefenderProps extends Partial<Pokemon> {
	sprite: string;
}

export interface AttackerProps extends Partial<Pokemon> {
	move?: string;
	sprite: string;
}

export interface OptimizeProps {
	attacker: AttackerProps;
	defender: DefenderProps;
	generation: GenerationNum | Generation;
	move: Move;
	field?: Field;
}
export interface EvMapProps {
	attacker: AttackerProps;
	defender: DefenderProps;
	generation: GenerationNum | Generation;
	field?: Field;
	move: string;
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
	minEvs: [number, number, Result];
	equal: [number, number, Result][];
	maxHp: [number, number, Result];
	maxDef: [number, number, Result];
	max: number;
	category: MoveCategory;
	same: boolean;
}

export type AutocompleteValue = SpeciesName | Move | string | undefined;
