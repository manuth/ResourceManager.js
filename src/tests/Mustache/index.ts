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
        "Mustache",
        () =>
        {
            ResourceContextTests();
            MustacheResourceTests();
            ResourceManagerContextTests();
            MustacheResourceManagerTests();
        });
}
