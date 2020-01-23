const debug = require('debug')('Uttori.Plugin.ViewModel.RandomDocuments');
const R = require('ramda');

/**
 * Uttori View Model Enrichment - Random Documents
 * @example <caption>ViewModelRandomDocuments</caption>
 * const viewModel = ViewModelRandomDocuments.callback(viewModel, context);
 * @class
 */
class ViewModelRandomDocuments {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   * @return {String} The configuration key.
   * @example <caption>ViewModelRandomDocuments.configKey</caption>
   * const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-vm-random-documents';
  }

  /**
   * The default configuration.
   * @return {Object} The configuration.
   * @example <caption>ViewModelRandomDocuments.defaultConfig()</caption>
   * const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
   * @static
   */
  static defaultConfig() {
    return {
      // Key to use in the view model
      key: 'randomDocuments',

      // Number of documents to return.
      limit: 10,

      // Slugs to not consider when selecting the random documents.
      ignore_slugs: [],
    };
  }

  /**
   * Validates the provided configuration for required entries.
   * @param {Object} config - A configuration object.
   * @param {Object} config[ViewModelRandomDocuments.configKey] - A configuration object specifically for this plugin.
   * @param {String} config[ViewModelRandomDocuments.configKey].key - The that will be added to the passed in object and returned with the random documents.
   * @param {String} config[ViewModelRandomDocuments.configKey].limit - The maximum number of documents to be returned.
   * @param {Object} _context - A Uttori-like context (unused).
   * @example <caption>ViewModelRandomDocuments.validateConfig(config, _context)</caption>
   * ViewModelRandomDocuments.validateConfig({ ... });
   * @static
   */
  static validateConfig(config, _context) {
    debug('Validating config...');
    if (!config[ViewModelRandomDocuments.configKey]) {
      const error = `Config Error: '${ViewModelRandomDocuments.configKey}' configuration key is missing.`;
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRandomDocuments.configKey].key && typeof config[ViewModelRandomDocuments.configKey].key !== 'string') {
      const error = 'Config Error: `key` should be a valid Object key string.';
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRandomDocuments.configKey].limit && typeof config[ViewModelRandomDocuments.configKey].limit !== 'number') {
      const error = 'Config Error: `limit` should be a number.';
      debug(error);
      throw new Error(error);
    }
    if (config[ViewModelRandomDocuments.configKey].ignore_slugs && !Array.isArray(config[ViewModelRandomDocuments.configKey].ignore_slugs)) {
      const error = 'Config Error: `ignore_slugs` is should be an array.';
      debug(error);
      throw new Error(error);
    }
    debug('Validated config.');
  }

  /**
   * Register the plugin with a provided set of events on a provided Hook system.
   * @param {Object} context - A Uttori-like context.
   * @param {Object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {Object} context.config - A provided configuration to use.
   * @param {Object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>ViewModelRandomDocuments.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [ViewModelRandomDocuments.configKey]: {
   *       ...,
   *       events: {
   *         callback: ['document-save', 'document-delete'],
   *         validateConfig: ['validate-config'],
   *       },
   *     },
   *   },
   * };
   * ViewModelRandomDocuments.register(context);
   * @static
   */
  static register(context) {
    debug('register');
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
    if (!config.events) {
      throw new Error("Missing events to listen to for in 'config.events'.");
    }
    Object.keys(config.events).forEach((method) => {
      config.events[method].forEach((event) => context.hooks.on(event, ViewModelRandomDocuments[method]));
    });
  }

  /**
   * Queries for random documents and searches the storage provider.
   * @param {Object} viewModel - A Uttori view-model object.
   * @param {Object} context - A Uttori-like context.
   * @param {Object} context.config - A provided configuration to use.
   * @param {String} context.config.key - The key to add the array of documents to on the view-model.
   * @param {Number} context.config.limit - The maximum number of documents to return.
   * @param {String[]} context.config.ignore_slugs - A list of slugs to not consider when fetching random documents.
   * @param {Object} context.storageProvider - A provided Uttori StorageProvider instance.
   * @param {Function} context.storageProvider.getQuery - Access method for getting documents.
   * @return {Object} The provided view-model document.
   * @example <caption>ViewModelRandomDocuments.callback(viewModel, context)</caption>
   * const context = {
   *   config: {
   *     [ViewModelRandomDocuments.configKey]: {
   *       ...,
   *     },
   *   },
   *   storageProvider: {
   *     getQuery: (query) => { ... }
   *   },
   * };
   * ViewModelRandomDocuments.callback(viewModel, context);
   * @static
   */
  static async callback(viewModel, context) {
    debug('callback');
    const { key, limit, ignore_slugs } = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
    debug(`key: "${key}", limit: ${limit}, ignore_slugs: [${ignore_slugs.join(',')}]`);
    if (limit < 1) {
      viewModel[key] = [];
      return viewModel;
    }
    let results = [];
    try {
      const not_in = `"${ignore_slugs.join('", "')}"`;
      results = await context.storageProvider.getQuery(`SELECT * FROM documents WHERE slug NOT_IN (${not_in}) ORDER BY RANDOM LIMIT ${limit}`);
    } catch (error) {
      /* istanbul ignore next */
      debug('Error:', error);
    }
    results = R.reject(R.isNil, results);
    debug('results:', results.length);
    viewModel[key] = results;
    return viewModel;
  }
}

module.exports = ViewModelRandomDocuments;
