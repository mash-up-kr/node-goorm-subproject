module.exports = {
  apps: [
    {
      name: 'app',
      cwd: './packages/app/',
      script: './packages/app/dist/index.js',
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'webhook',
      cwd: './packages/webhook/',
      script: './packages/webhook/dist/index.js',
      env: {
        PORT: 3100,
      },
    },
  ],
};
