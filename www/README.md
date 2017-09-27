# FormMaker

## Preparation

Work with mongoose model. On your api, create a route 'metadata' for a given model :
```javascript
// First of all, import the module
const Metadata = require('/path/to/metadata.js')

// let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/pets/metadata', Metadata.meta('Pet'))
```

That's it for the API.

Now on the client side react project :

```javascript

```
