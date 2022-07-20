import { FileResourceTests } from "./FileResource.test.js";
import { JavaScriptResourceTests } from "./JavaScriptResource.test.js";
import { JSONResourceTests } from "./JSONResource.test.js";
import { MustacheTests } from "./Mustache/index.test.js";
import { ResourceTests } from "./Resource.test.js";
import { ResourceFileHandlerTests } from "./ResourceFileHandlers/index.test.js";
import { ResourceManagerTests } from "./ResourceManager.test.js";
import { YAMLResourceTests } from "./YAMLResource.test.js";

suite(
    "ResourceManager.js",
    () =>
    {
        ResourceTests();
        FileResourceTests();
        YAMLResourceTests();
        JSONResourceTests();
        JavaScriptResourceTests();
        ResourceFileHandlerTests();
        ResourceManagerTests();
        MustacheTests();
    });
