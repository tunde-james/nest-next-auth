import { getProfile } from '@/lib/actions';

async function ProfilePage() {
  const res = await getProfile();

  return (
    <div>
      ProfilePage
      <p>{JSON.stringify(res)}</p>
    </div>
  );
}

export default ProfilePage;
