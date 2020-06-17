<a name="ViewModelRandomDocuments"></a>

## ViewModelRandomDocuments
Uttori View Model Enrichment - Random Documents

**Kind**: global class  

* [ViewModelRandomDocuments](#ViewModelRandomDocuments)
    * [.configKey](#ViewModelRandomDocuments.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#ViewModelRandomDocuments.defaultConfig) ⇒ <code>object</code>
    * [.validateConfig(config, _context)](#ViewModelRandomDocuments.validateConfig)
    * [.register(context)](#ViewModelRandomDocuments.register)
    * [.callback(viewModel, context)](#ViewModelRandomDocuments.callback) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="ViewModelRandomDocuments.configKey"></a>

### ViewModelRandomDocuments.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>string</code> - The configuration key.  
**Example** *(ViewModelRandomDocuments.configKey)*  
```js
const config = { ...ViewModelRandomDocuments.defaultConfig(), ...context.config[ViewModelRandomDocuments.configKey] };
```
<a name="ViewModelRandomDocuments.defaultConfig"></a>

### ViewModelRandomDocuments.defaultConfig() ⇒ <code>object</code>
The default configuration.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>object</code> - The configuration.  
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
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| config.configKey.key | <code>string</code> | The that will be added to the passed in object and returned with the random documents. |
| config.configKey.limit | <code>string</code> | The maximum number of documents to be returned. |
| _context | <code>object</code> | A Uttori-like context (unused). |

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
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |

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

### ViewModelRandomDocuments.callback(viewModel, context) ⇒ <code>Promise.&lt;object&gt;</code>
Queries for random documents and searches the storage provider.

**Kind**: static method of [<code>ViewModelRandomDocuments</code>](#ViewModelRandomDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The provided view-model document.  

| Param | Type | Description |
| --- | --- | --- |
| viewModel | <code>object</code> | A Uttori view-model object. |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.key | <code>string</code> | The key to add the array of documents to on the view-model. |
| context.config.limit | <code>number</code> | The maximum number of documents to return. |
| context.config.ignore_slugs | <code>Array.&lt;string&gt;</code> | A list of slugs to not consider when fetching random documents. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.hooks.fetch | <code>function</code> | An event dispatch function that returns an array of results. |

**Example** *(ViewModelRandomDocuments.callback(viewModel, context))*  
```js
const context = {
  config: {
    [ViewModelRandomDocuments.configKey]: {
      ...,
    },
  },
  hooks: {
    on: (event) => { ... },
    fetch: (event, query) => { ... },
  },
};
ViewModelRandomDocuments.callback(viewModel, context);
```
