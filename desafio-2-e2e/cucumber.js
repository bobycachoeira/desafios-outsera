export default {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['steps/**/*.ts', 'support/**/*.ts'],
    format: ['progress', 'html:results/cucumber-report.html', 'json:results/cucumber-report.json'],
    publishQuiet: true,
  },
};
