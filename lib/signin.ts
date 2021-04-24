const signin: (
  username: string,
  password: string,
) => Promise<Response> = async (username, password) => {
  return await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
};

export default signin;
