module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // {
      //   source: '/signin',
      //   destination: '/api/signin',
      // },
      {
        source: '/signout',
        destination: '/api/signout',
      },
    ];
  },
};
