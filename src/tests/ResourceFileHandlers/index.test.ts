import { basename } from "node:path";
import { JavaScriptResourceHandlerTests } from "./JavaScriptResourceHandler.test.js";
import { JSONResourceHandlerTests } from "./JSONResourceHandler.test.js";
import { YAMLResourceHandlerTests } from "./YAMLResourceHandler.test.js";

/**
 * Registers tests for resource file handlers.
 */
export function ResourceFileHandlerTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            YAMLResourceHandlerTests();
            JSONResourceHandlerTests();
            JavaScriptResourceHandlerTests();
        });
}
