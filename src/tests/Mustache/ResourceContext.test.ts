import { strictEqual, throws } from "assert";
import dedent from "dedent";
import Mustache from "mustache";
import { ResourceContext } from "../../ResourceContext.js";
import { TestResource } from "../TestResource.js";

/**
 * Registers tests for the {@link ResourceContext `ResourceContext`} class.
 */
export function ResourceContextTests(): void
{
    suite(
        nameof(ResourceContext),
        () =>
        {
            let context: ResourceContext;
            let templateString: string;
            let id: string;
            let value: any;
            let inexistentID: string;

            suiteSetup(
                () =>
                {
                    id = "WelcomeMessage";
                    value = "Welcome to my project!";
                    inexistentID = "This.Item.Does.Not.Exist";
                    templateString = dedent(
                        `
                        <html>
                            <head>
                            </head>
                            <body>
                                <div class="container">
                                    {{${id}}}
                                </div>
                            </body>
                        </html>
                        `);

                    let resource = new TestResource();

                    resource.Resource = {
                        [id]: value
                    };

                    context = new ResourceContext(resource);
                });

            suite(
                nameof<ResourceContext>((context) => context.lookup),
                () =>
                {
                    test(
                        "Checking whether the resource can be used as a mustache-context correctly…",
                        () =>
                        {
                            strictEqual(
                                Mustache.render(templateString, context),
                                Mustache.render(
                                    templateString,
                                    {
                                        [id]: value
                                    }));
                        });

                    test(
                        "Checking whether resolving inexistent IDs throws…",
                        () =>
                        {
                            throws(() => Mustache.render(`{{${inexistentID}}}`, context));
                        });
                });
        });
}
