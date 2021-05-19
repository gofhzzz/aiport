const fetcher: <T>(url: string, init?: RequestInit) => Promise<T> = async (
  url,
  init?,
) => {
  const response = await fetch(url, init);

  if (response.status === 413) {
    const error = new Error('File too large') as CustomError;
    error.code = -999;
    throw error;
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    if (response.ok) {
      const bodyJson = await response.json();

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[fetcher.ts] Success to fetch on ${init?.method ?? 'GET'} ${url}`,
        );
        console.log('[fetcher.ts] Recieved Data:', bodyJson);
      }

      return { ...bodyJson, statusCode: response.status };
    }

    const { error } = await response.json();

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[fetcher.ts] Failed to fetch on ${init?.method ?? 'GET'} ${url}`,
      );
      console.log('[fetcher.ts] Recieved error:', error);
    }

    throw error as CustomError;
  }
};

export default fetcher;
