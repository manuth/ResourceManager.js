import { basename } from "node:path";
import { MustacheResourceTests } from "./MustacheResource.test.js";
import { MustacheResourceManagerTests } from "./MustacheResourceManager.test.js";
import { ResourceContextTests } from "./ResourceContext.test.js";
import { ResourceManagerContextTests } from "./ResourceManagerContext.test.js";

/**
 * Registers tests for mustache components.
 */
export function MustacheTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ResourceContextTests();
            MustacheResourceTests();
            ResourceManagerContextTests();
            MustacheResourceManagerTests();
        });
}
