import { basename } from "path";
import { JavaScriptResourceHandlerTests } from "./JavaScriptResourceHandler.test";
import { JSONResourceHandlerTests } from "./JSONResourceHandler.test";
import { YAMLResourceHandlerTests } from "./YAMLResourceHandler.test";

/**
 * Registers tests for resource file handlers.
 */
export function ResourceFileHandlerTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            YAMLResourceHandlerTests();
            JSONResourceHandlerTests();
            JavaScriptResourceHandlerTests();
        });
}
