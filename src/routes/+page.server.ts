import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const { data } = await supabase.from('countries').select();
	return {
		countries: data ?? []
	};
};
