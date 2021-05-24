const signout: () => Promise<void> = async () => {
  await fetch('/api/auth', { method: 'DELETE' });
};

export default signout;
