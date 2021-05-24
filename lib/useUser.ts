import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// types
import { UserInfo } from 'types/user';

interface UseUserOptions {
  redirectTo?: string;
  redirectAs?: string;
  redirectIfFound?: boolean;
}

const useUser: (
  options?: UseUserOptions,
) => {
  loading: boolean;
  mutate: (
    data?: UserInfo | Promise<UserInfo> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<UserInfo | undefined>;
  user?: UserInfo;
  error?: string;
} = ({ redirectTo, redirectAs, redirectIfFound } = {}) => {
  const router = useRouter();
  const { data: user, mutate, error } = useSWR('/api/user', {
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (!user && !error) return;

    if (!user && redirectTo && !redirectIfFound) {
      router.replace(redirectTo, redirectAs);
    } else if (user && redirectIfFound) {
      router.replace(redirectTo ?? '/dashboard');
    }
  }, [error, user, router, redirectTo, redirectAs, redirectIfFound]);

  return {
    loading: !user && !error,
    user,
    error,
    mutate,
  };
};

export default useUser;
