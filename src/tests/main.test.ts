import { FileResourceTests } from "./FileResource.test";
import { JavaScriptResourceTests } from "./JavaScriptResource.test";
import { JSONResourceTests } from "./JSONResource.test";
import { MustacheTests } from "./Mustache";
import { ResourceTests } from "./Resource.test";
import { ResourceFileHandlerTests } from "./ResourceFileHandlers";
import { ResourceManagerTests } from "./ResourceManager.test";
import { YAMLResourceTests } from "./YAMLResource.test";

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
