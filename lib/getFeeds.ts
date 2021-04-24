import fetcher from './fetcher';

const getFeeds: () => Promise<FeedInfo[]> = async () => {
  const { feeds } = await fetcher('/api/feed');

  return feeds;
};

export default getFeeds;
