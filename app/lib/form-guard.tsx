import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useFormGuard = (isDirty: boolean) => {
  const router = useRouter();
  const message = 'OK?';

  const pageChangeHandler = (
    url: string,
    { shallow }: { shallow: boolean }
  ) => {
    if (!shallow) {
      const answer = window.confirm(message);
      if (!answer) {
        router.events.emit('routeChangeError', 'キャンセルされました', url, {
          shallow,
        });
        throw 'キャンセルされました';
      }
    }
  };

  const beforeUnloadhandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = message;
  };

  useEffect(() => {
    if (isDirty) {
      router.events.on('routeChangeStart', pageChangeHandler);
      window.addEventListener('beforeunload', beforeUnloadhandler);

      return () => {
        router.events.off('routeChangeStart', pageChangeHandler);
        window.removeEventListener('beforeunload', beforeUnloadhandler);
      };
    }
  }, [isDirty, router]);
};

export default useFormGuard;
