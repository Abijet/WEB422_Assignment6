import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { readToken } from '@/lib/authenticate';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const publicPaths = ['/login', '/register'];
    const path = url.split('?')[0];
    if (!readToken() && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return authorized ? children : null;
}
