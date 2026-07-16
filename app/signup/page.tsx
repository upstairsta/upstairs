import { redirect } from 'next/navigation';

type SignupPageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const role = params.role === 'employer' ? 'employer' : 'talent';
  redirect(`/apply?role=${role}`);
}
