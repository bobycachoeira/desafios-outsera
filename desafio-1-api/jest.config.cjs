module.exports = {
  setupFiles: ['dotenv/config'],
  testMatch: ['**/tests/**/*.spec.mjs'],
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './results', filename: 'report.html' }],
  ],
};
