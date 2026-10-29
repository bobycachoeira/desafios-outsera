export default {
  paths: ['features/**/*.feature'],
  import: ['./support/*.js', './steps/*.js'],
  format: ['progress', 'html:results/cucumber-report.html', 'json:results/cucumber-report.json'],
};
