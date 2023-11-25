import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://wmlqkkfrfxpdgvnueknn.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtbHFra2ZyZnhwZGd2bnVla25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NjUwMTIsImV4cCI6MjAxNjM0MTAxMn0.W60lkjhuy-7KRZIZ23uUgxanBi4TQ56A0J_uZ9O8H7A'
);
