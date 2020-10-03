import { JavaScriptResourceHandlerTests } from "./JavaScriptResourceHandler.test";
import { JSONResourceHandlerTests } from "./JSONResourceHandler.test";
import { YAMLResourceHandlerTests } from "./YAMLResourceHandler.test";

/**
 * Registers tests for resource file handlers.
 */
export function ResourceFileHandlerTests(): void
{
    suite(
        "ResourceFileHandlers",
        () =>
        {
            YAMLResourceHandlerTests();
            JSONResourceHandlerTests();
            JavaScriptResourceHandlerTests();
        });
}
