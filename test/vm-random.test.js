// @ts-nocheck
/* eslint-disable security/detect-non-literal-fs-filename */
const test = require('ava');
const { ViewModelRandomDocuments } = require('../src');

const config = {
  [ViewModelRandomDocuments.configKey]: {
    ...ViewModelRandomDocuments.defaultConfig(),
    events: [],
    key: 'editedDocs',
    limit: 1,
  },
};
const hooks = {
  on: () => {},
  fetch: () => [
    [
      {
        updateDate: null,
        createDate: new Date('2019-04-20').toISOString(),
        slug: 'good-title',
      },
      {
        updateDate: new Date('2019-04-21').toISOString(),
        createDate: new Date('2019-04-21').toISOString(),
        slug: 'fake-title',
      },
    ],
  ],
};

test('ViewModelRandomDocuments.register(context): can register', (t) => {
  t.notThrows(() => {
    ViewModelRandomDocuments.register({ hooks: { on: () => {} }, config: { [ViewModelRandomDocuments.configKey]: { events: { callback: [] } } } });
  });
});

test('ViewModelRandomDocuments.register(context): errors without event dispatcher', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.register({ hooks: {} });
  }, { message: 'Missing event dispatcher in \'context.hooks.on(event, callback)\' format.' });
});

test('ViewModelRandomDocuments.register(context): errors without events', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.register({ hooks: { on: () => {} }, config: { [ViewModelRandomDocuments.configKey]: {} } });
  }, { message: 'Missing events to listen to for in \'config.events\'.' });
});

test('ViewModelRandomDocuments.register(context): does not error with events corresponding to missing methods', (t) => {
  t.notThrows(() => {
    ViewModelRandomDocuments.register({
      hooks: {
        on: () => {},
      },
      config: {
        [ViewModelRandomDocuments.configKey]: {
          events: {
            test: ['test'],
            validateConfig: ['validate-config'],
          },
        },
      },
    });
  });
});

test('ViewModelRandomDocuments.defaultConfig(): can return a default config', (t) => {
  t.notThrows(ViewModelRandomDocuments.defaultConfig);
});

test('ViewModelRandomDocuments.validateConfig(config, _context): throws when configuration key is missing', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.validateConfig({});
  }, { message: 'Config Error: \'uttori-plugin-vm-random-documents\' configuration key is missing.' });
});

test('ViewModelRandomDocuments.validateConfig(config, _context): throws when ignore_slugs is not an array', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.validateConfig({
      [ViewModelRandomDocuments.configKey]: {
        ignore_slugs: {},
      },
    });
  }, { message: 'Config Error: `ignore_slugs` is should be an array.' });
});

test('ViewModelRandomDocuments.validateConfig(config, _context): throws when limit is not a number', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.validateConfig({
      [ViewModelRandomDocuments.configKey]: {
        limit: '10',
      },
    });
  }, { message: 'Config Error: `limit` should be a number.' });
});

test('ViewModelRandomDocuments.validateConfig(config, _context): throws when key is not a string', (t) => {
  t.throws(() => {
    ViewModelRandomDocuments.validateConfig({
      [ViewModelRandomDocuments.configKey]: {
        key: 10,
      },
    });
  }, { message: 'Config Error: `key` should be a valid Object key string.' });
});

test('ViewModelRandomDocuments.validateConfig(config, _context): can validate', (t) => {
  t.notThrows(() => {
    ViewModelRandomDocuments.validateConfig({
      [ViewModelRandomDocuments.configKey]: {
        key: 'popularDocuments',
        limit: 10,
        ignore_slugs: ['home-page'],
      },
    });
  });
});

test('ViewModelRandomDocuments.callback(viewModel, context): returns the input when an invalid structure is provided', async (t) => {
  t.plan(1);
  const output = await ViewModelRandomDocuments.callback(null, { config: { ...config, [ViewModelRandomDocuments.configKey]: { key: 'recentDocs', limit: 0 } }, hooks });
  t.is(output, null);
});

test('ViewModelRandomDocuments.callback(viewModel, context): adds an empty array when limit is less than 1', async (t) => {
  t.plan(1);
  const viewModel = {};
  const output = await ViewModelRandomDocuments.callback(viewModel, { config: { ...config, [ViewModelRandomDocuments.configKey]: { key: 'editedDocs', limit: 0 } }, hooks });
  t.deepEqual(output, {
    editedDocs: [],
  });
});

test('ViewModelRandomDocuments.callback(viewModel, context): can return recent documents', async (t) => {
  t.plan(1);
  const viewModel = {};
  const output = await ViewModelRandomDocuments.callback(viewModel, { config, hooks });
  t.deepEqual({
    editedDocs: [
      {
        updateDate: null,
        createDate: new Date('2019-04-20').toISOString(),
        slug: 'good-title',
      },
      {
        updateDate: new Date('2019-04-21').toISOString(),
        createDate: new Date('2019-04-21').toISOString(),
        slug: 'fake-title',
      },
    ],
  }, output);
});
