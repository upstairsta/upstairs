import { supabase } from '@/utils/supabase';

export type UserRole = 'talent' | 'employer' | 'admin';

export function getRoleRedirectPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'employer':
      return '/workspace/employer-dashboard';
    case 'talent':
      return '/workspace/talent-dashboard';
    default:
      return '/apply';
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !profile) return null;
  return profile.role as UserRole;
}

export async function signInAndGetRedirect(email: string, password: string): Promise<string> {
  const { user } = await signIn(email, password);
  if (!user) throw new Error('No user profile returned.');

  const role = await getUserRole(user.id);
  if (!role) {
    throw new Error("Your credentials validated, but we couldn't resolve your workspace configuration.");
  }

  return getRoleRedirectPath(role);
}
