module.exports = {
  apps: [
    {
      name: 'app',
      cwd: './packages/app/',
      script: './dist/index.js',
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'webhook',
      cwd: './packages/webhook/',
      script: './dist/index.js',
      env: {
        PORT: 3100,
      },
    },
  ],
};
