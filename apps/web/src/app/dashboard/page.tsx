import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const session = await getSession();
  if (!session || !session.user) {
    redirect('/auth/sign-in');
  }

  console.log({ session });

  return <div></div>;
}

export default DashboardPage;
