import fetcher from './fetcher';

const addToMyDatasetById: (datasetId: string) => Promise<void> = async (
  datasetId,
) => {
  try {
    await fetcher(`/api/user/dataset/${datasetId}`, {
      method: 'POST',
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[addToMyDatasetById] error', err);
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

export default addToMyDatasetById;
