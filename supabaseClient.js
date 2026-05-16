const SUPABASE_URL = 'https://jpzivufqazetryrvfwnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impweml2dWZxYXpldHJ5cnZmd25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDY4OTcsImV4cCI6MjA5NDUyMjg5N30.BA8IGUSlrOkiQzA5pijA4mw4Pw7eFXpN6R4ihxZjpM0';

const jstudycSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getCurrentUser() {
  const { data, error } = await jstudycSupabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}

async function ensureProfile(user, fallbackName) {
  if (!user) return null;

  const name = fallbackName || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const { data: existing } = await jstudycSupabase
    .from('profiles')
    .select('id, name')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await jstudycSupabase
    .from('profiles')
    .insert({ id: user.id, name })
    .select('id, name')
    .single();

  if (error) return { id: user.id, name };
  return data;
}

window.JStudyCBackend = {
  supabase: jstudycSupabase,
  getCurrentUser,
  requireCurrentUser,
  ensureProfile
};
