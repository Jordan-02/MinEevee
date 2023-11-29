import { db } from '$lib/db/drizzle';
import { pokemon } from '$lib/db/schema';

export const load = async () => {
	const mons = await db.select().from(pokemon);
	return {
		pokemon: mons ?? []
	};
};
