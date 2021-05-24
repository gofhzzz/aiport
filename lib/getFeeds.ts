import fetcher from './fetcher';

// types
import { FeedInfo } from 'types/feed';

const getFeeds: () => Promise<FeedInfo[]> = async () => {
  const { feeds } = await fetcher('/api/feed');

  return feeds;
};

export default getFeeds;
