[![view on npm](http://img.shields.io/npm/v/uttori-plugin-vm-random-documents.svg)](https://www.npmjs.org/package/uttori-plugin-vm-random-documents)
[![npm module downloads](http://img.shields.io/npm/dt/uttori-plugin-vm-random-documents.svg)](https://www.npmjs.org/package/uttori-plugin-vm-random-documents)
[![Build Status](https://travis-ci.org/uttori/uttori-plugin-vm-random-documents.svg?branch=master)](https://travis-ci.org/uttori/uttori-plugin-vm-random-documents)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-vm-random-documents.svg)](https://david-dm.org/uttori/uttori-plugin-vm-random-documents)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-vm-random-documents/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-vm-random-documents?branch=master)

# Uttori View Model Enrichment - Random Documents

A plugin to expose and add randomly selected documents to a view-model or other object.

## Install

```bash
npm install --save uttori-plugin-vm-random-documents
```

## Config

```js
{
  // Registration Events
  events: {
    callback: ['view-model-home'],
  },

  // Key to use in the view model
  key: 'recentDocuments',

  // Number of documents to return.
  limit: 10,

  // A list of slugs to ignore
  ignore_slugs: [],
}
```

* * *

## API Reference

<a name="ViewModelRandomDocuments"></a>

## ViewModelRandomDocuments
Uttori View Model Enrichment - Random Documents

**Kind**: global class  

* [ViewModelRandomDocuments](#ViewModelRandomDocuments)
    * [.configKey](#ViewModelRandomDocuments.configKey) ⇒ <code>String</code>
    * [.defaultConfig()](#ViewModelRandomDocuments.defaultConfig) ⇒ <code>Object</code>
    * [.validateConfig(config, _context)](#ViewModelRandomDocuments.validateConfig)
    * [.register(context)](#ViewModelRandomDocuments.register)
    * [.callback(viewModel, context)](#ViewModelRandomDocuments.callback) ⇒ <code>Object</code>

<a name="ViewModelRandomDocuments.configKey"></a>

### ViewModelRandomDocuments.configKey ⇒ <code>String</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>String</code> - The configuration key.  
**Example** *(ViewModelRandomDocuments.configKey)*  
```js
const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
```
<a name="ViewModelRandomDocuments.defaultConfig"></a>

### ViewModelRandomDocuments.defaultConfig() ⇒ <code>Object</code>
The default configuration.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>Object</code> - The configuration.  
**Example** *(ViewModelRandomDocuments.defaultConfig())*  
```js
const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
```
<a name="ViewModelRandomDocuments.validateConfig"></a>

### ViewModelRandomDocuments.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | A configuration object. |
| config[ViewModelRandomDocuments.configKey | <code>Object</code> | A configuration object specifically for this plugin. |
| config[ViewModelRandomDocuments.configKey].key | <code>String</code> | The that will be added to the passed in object and returned with the random documents. |
| config[ViewModelRandomDocuments.configKey].limit | <code>String</code> | The maximum number of documents to be returned. |
| _context | <code>Object</code> | A Uttori-like context (unused). |

**Example** *(ViewModelRandomDocuments.validateConfig(config, _context))*  
```js
ViewModelRandomDocuments.validateConfig({ ... });
```
<a name="ViewModelRandomDocuments.register"></a>

### ViewModelRandomDocuments.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | A Uttori-like context. |
| context.hooks | <code>Object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.events | <code>Object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

**Example** *(ViewModelRandomDocuments.register(context))*  
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [ViewModelRandomDocuments.configKey]: {
      ...,
      events: {
        callback: ['document-save', 'document-delete'],
        validateConfig: ['validate-config'],
      },
    },
  },
};
ViewModelRandomDocuments.register(context);
```
<a name="ViewModelRandomDocuments.callback"></a>

### ViewModelRandomDocuments.callback(viewModel, context) ⇒ <code>Object</code>
Queries for random documents and searches the storage provider.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>Object</code> - The provided view-model document.  

| Param | Type | Description |
| --- | --- | --- |
| viewModel | <code>Object</code> | A Uttori view-model object. |
| context | <code>Object</code> | A Uttori-like context. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.key | <code>String</code> | The key to add the array of documents to on the view-model. |
| context.config.limit | <code>Number</code> | The maximum number of documents to return. |
| context.config.ignore_slugs | <code>Array.&lt;String&gt;</code> | A list of slugs to not consider when fetching random documents. |
| context.storageProvider | <code>Object</code> | A provided Uttori StorageProvider instance. |
| context.storageProvider.getQuery | <code>function</code> | Access method for getting documents. |

**Example** *(ViewModelRandomDocuments.callback(viewModel, context))*  
```js
const context = {
  config: {
    [ViewModelRandomDocuments.configKey]: {
      ...,
    },
  },
  storageProvider: {
    getQuery: (query) => { ... }
  },
};
ViewModelRandomDocuments.callback(viewModel, context);
```

* * *

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
DEBUG=Uttori* npm test
```

## Contributors

* [Matthew Callis](https://github.com/MatthewCallis)

## License

* [MIT](LICENSE)
