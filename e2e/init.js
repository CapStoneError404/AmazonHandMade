const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/mocha/adapter');


before(async () => {
  await detox.init(config);
});

beforeEach(async function () {
  await adapter.beforeEach(this);
});

afterEach(async function () {
  await adapter.afterEach(this);
});

after(async () => {
  await detox.cleanup();
});
<<<<<<< HEAD
=======

// const detox = require('detox');
// const config = require('../package.json').detox;
// const adapter = require('detox/runners/jest/adapter');

// // Set the default timeout
// jest.setTimeout(120000);
// jasmine.getEnv().addReporter(adapter);

// beforeAll(async () => {
//   await detox.init(config);
// });

// beforeEach(async function() {
//   await adapter.beforeEach();
// });

// afterAll(async () => {
//   await adapter.afterAll();
//   await detox.cleanup();
// });
>>>>>>> 7dc08bfb91ceed1c79c72d5edc36e299b49bf31b
