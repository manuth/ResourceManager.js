import { basename } from "path";
import { MustacheResourceTests } from "./MustacheResource.test";
import { MustacheResourceManagerTests } from "./MustacheResourceManager.test";
import { ResourceContextTests } from "./ResourceContext.test";
import { ResourceManagerContextTests } from "./ResourceManagerContext.test";

/**
 * Registers tests for mustache components.
 */
export function MustacheTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            ResourceContextTests();
            MustacheResourceTests();
            ResourceManagerContextTests();
            MustacheResourceManagerTests();
        });
}
