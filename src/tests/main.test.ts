suite(
    "ResourceManager.js",
    () =>
    {
        require("./Resource.test");
        require("./FileResource.test");
        require("./YAMLResource.test");
        require("./JSONResource.test");
        require("./JavaScriptResource.test");
        require("./ResourceFileHandlers/main.test");
    });