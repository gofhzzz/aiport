const signin: () => Promise<void> = async () => {
  await fetch('/api/auth', { method: 'POST' });
};

export default signin;
