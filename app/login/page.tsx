import { redirect } from 'next/navigation';

type LoginPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams({ mode: 'login' });
  if (params.message) query.set('message', params.message);
  redirect(`/apply?${query.toString()}`);
}
