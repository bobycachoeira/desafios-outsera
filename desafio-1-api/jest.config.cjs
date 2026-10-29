module.exports = {
  setupFiles: ['dotenv/config'],
  testMatch: ['**/tests/**/*.spec.mjs'],
  testTimeout: 30000,
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './results', filename: 'report.html' }],
  ],
};
