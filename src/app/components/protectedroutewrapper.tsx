import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ProtectedRouteWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
     
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}

export default ProtectedRouteWrapper;