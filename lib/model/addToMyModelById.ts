import fetcher from '@lib/fetcher';

const addToMyModelById: (modelId: string) => Promise<void> = async (
  modelId,
) => {
  try {
    await fetcher(`/api/user/model/${modelId}`, {
      method: 'POST',
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[addToMyModelById] error', err);
    }

    const { code, additionalInfo } = err;
    let message: string;
    switch (code) {
      case 101:
        message = 'Already has been added';
        break;
      default:
        message = `[${code}] internal server error ${err.message}`;
        break;
    }

    const error = new Error(message) as CustomError;
    error.code = code;
    error.additionalInfo = additionalInfo;

    throw error;
  }
};

export default addToMyModelById;
