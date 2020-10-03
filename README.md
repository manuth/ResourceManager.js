# ResourceManager.js
A manager for localized resources.

## General
`ResourceManager.js` allows you to load and resolve resource-objects from different files.

It also has the capability to load and manage localized resources which allows you to resolve resource-items for the locale of your choice and to take care of locales and their parental relationships which simplifies the creation of resources for different dialects of the same language.

## Table of Contents
- [ResourceManager.js](#resourcemanagerjs)
  - [General](#general)
  - [Table of Contents](#table-of-contents)
  - [Installing `ResourceManager.js`](#installing-resourcemanagerjs)
  - [Resources](#resources)
    - [Example](#example)
    - [Caching](#caching)
      - [Example](#example-1)
    - [Mustache-Resources](#mustache-resources)
      - [Example](#example-2)
  - [Localized Resources](#localized-resources)
    - [Example](#example-3)
    - [Mustache-ResourceManager](#mustache-resourcemanager)
      - [Example](#example-4)
  - [Use with Mustache](#use-with-mustache)
    - [Example](#example-5)
  - [Exception-Handling](#exception-handling)

## Installing `ResourceManager.js`
`ResourceManager.js` can be installed using following command:

```bash
npm install --save @manuth/resource-manager
```

## Resources
You might want to work with a resource rather than a resource-manager, if you don't care about localization.

`ResourceManager.js` provides classes for loading resources from different file-types:
  - `JSONResource` for `JSON` and `JSON with Comment`-files
  - `YAMLResource` for `YAML`-files
  - `JavaScriptResource` for `.js`-files
  - `ObjectResource` for objects

### Example
***Messages.json:***
```json
{
    "StartMessage": "My App just started",
    "WelcomeMessage": {
        "Title": "My App",
        "Message": "Hello and a warmth welcome to My App!"
    },
    "Duplicate.Test": "",
    "Duplicate": {
        "Test": ""
    }
}
```

***Messages.yml:***
```yaml
Test: YAML-Resource
```

***Messages.js:***
```js
module.exports = {
    StartMessage: "JavaScript-Resource"
}
```

```js
const Dialog = require("dialog");
const { JSONResource, ObjectResource, YAMLResource } = require("@manuth/resource-manager");

let jsonResource = new JSONResource("./Messages.json");
let yamlResource = new YAMLResource("./Messages.yml");
let jsResource = new JavaScriptResource("./Messages.js");
let objectResource = new ObjectResource(require("./Messages"));

console.log(jsonResource.Get("StartMessage"));
Dialog.info(jsonResource.Get("WelcomeMessage.Message"), jsonResource.Get("WelcomeMessage.Title"), () =>{});
console.log(jsonResource.Get("Inexistent.Key")); //Throws a "KeyNotFoundException"
console.log(jsonResource.Get("Duplicate.Test")); // Throws a "DuplicateKeyException"
console.log(yamlResource.Get("Test")); // Logs "YAML-Resource"
console.log(jsResource.Get("Test")); // Logs "JavaScript-Resource"
console.log(objectResource.Get("Test")); // Logs "JavaScript-Resource"
```

### Caching
When working with file-resources you can also enable the cache-mode by setting `FileResource.Cached`.  
This forces the system to cache the resource-items of the file and to read resource-items from the cache rather than from the file.

#### Example
```js
const FileSystem = require("fs");
const { JSONResource } = require("@manuth/resource-manager");

let resource = new JSONResource("./Messages.json");
resource.Cached = true;
console.log(resource.Get("StartMessage"));
FileSystem.unlinkSync("./Messages.json");
console.log(resource.Get("StartMessage")); // Does not throw
FileSystem.writeFileSync("./Messages.json", '{ "Test": "Test" }');
resource.Refresh();
console.log(resource.Get("Test")); // Logs "Test"
console.log(resource.Get("StartMessage")); // Throws a "KeyNotFoundException"
```

### Mustache-Resources
You might want to composite resource-items using mustache.  
This can be done by wrapping your resource with a mustache-resource which pre-processes resource-items using `mustache.render()`.

#### Example
***MustacheResource.yml:***
```yml
ProjectName: My App
Author: m@nuth
Console:
    CopyRightMessage: "{{ProjectName}} © by {{Author}}"
```

```js
const { MustacheResource, YAMLResource } = require("@manuth/resource-manager");

let resource = new MustacheResource(new YAMLResource("./MustacheResource.yml"));
console.log(resource.Get("Console.CopyRightMessage"));
```

This produces following output:
```
My App © by m@nuth
```

## Localized Resources
One thing you might have missed is that a resource also contains information about its locale (the default is the global, invariant culture).
This information is used by the `ResourceManager` to resolve resource-items of the best-matching culture.

The `ResourceManager` is capable to load resource-files automatically based on their file-name if they follow the path-convention:
```
{ BaseFileName }[.{ locale-abbreviation }].{ File-Extension }
```

If you skip the locale-part the global, invariant culture will be set.

***Examples:***
```
Resource.json
Resource.de.jsonc
Resource.en.yml
Resource.en-US.js
```

This might be very useful if you work with similar languages and dialects.

### Example
***Resource.en.json:***
```json
{
    "WelcomeMessage": "Welcome to my awesome web-developer tool",
    "CopyItem": "Copy to Clipboard",
    "UnknownError": "An unexpected error occured",
    "ColorError": "Please specify a valid color",
    "Duplicate.File": "",
    "Duplicate.Test": "",
    "Duplicate": {
        "Test": ""
    }
}
```

***Resource.en.yml:***
```yml
Duplicate.File: ""
```

***Resource.en-GB.json:***
```json
{
    "ColorError": "Please specify a valid colour"
}
```

```js
const { CultureInfo, ResourceManager } = require("@manuth/resource-manager");

let manager = new ResourceManager("./Resource", new CultureInfo("en-gb"));
console.log(manager.Get("CopyItem")); // "Copy to Clipboard"
console.log(manager.Get("ColorError")); // "Please specify a valid colour"
console.log(manager.Get("ColorError"), new CultureInfo("en-US")); // "Please specify a valid color"
manager.Locale = new CultureInfo("en");
console.log(manager.Get("ColorError")); // "Please specify a valid color"
console.log(manager.Get("Inexistent.Key")); // Throws a KeyNotFoundException
console.log(manager.Get("Duplicate.Test")); // Throws a DuplicateKeyException
console.log(manager.Get("Duplicate.File")); // Throws a DuplicateKeyException
```

### Mustache-ResourceManager
The resource-manager is mustachable, too!  
The above example can be simplified by wrapping the resource-manager with a `MustacheResourceManager` which allows you to pre-process localized resource-items.

#### Example
***Resource.en.json:***
```json
{
    "Color": "color",
    "WelcomeMessage": "Welcome to my awesome web-developer tool",
    "CopyItem": "Copy to Clipboard",
    "UnknownError": "An unexpected error occured",
    "ColorError": "Please specify a valid {{Color}}"
}
```

***Resource.en-gb.yml:***
```yml
Color: colour
```

```js
const { CultureInfo, MustacheResourceManager, ResourceManager } = require("@manuth/resource-manager");

let manager = new MustacheResourceManager(new ResourceManager("./Resource"));
manager.Locale = new CultureInfo("en-gb");
console.log(manager.Get("WelcomeMessage")); // "Welcome to my awesome web-developer tool"
console.log(manager.Get("ColorError")); // "Please specify a valid colour"
console.log(manager.Get("ColorError", new CultureInfo("en"))); // "Please specify a valid color"
```

## Use with Mustache
The `ResourceContext` and `ResourceManagerContext`-classes allow you to use a resource or a resource-manager as a mustache-context, which might be useful for you:

### Example
```js
const { CultureInfo, ResourceManager, ResourceManagerContext } = require("@manuth/resource-manager");
const Mustache = require("mustache");

let manager = new ResourceManager("./Resource", new CultureInfo("en"));
Mustache.render(
    `
    <html>
        <head>
        </head>
        <body>
            <div class="container">
                {{WelcomeMessage}}
            </div>
        </body>
    </html>`,
    new ResourceManagerContext(manager));
```

## Exception-Handling
Generally all classes may throw one of these exceptions:
  - `KeyNotFoundException`:  
    This error occurs when a key could not be found.
  - `DuplicateKeyException`:  
    This error occurs when a key is not distinguishable