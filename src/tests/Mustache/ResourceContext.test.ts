import { strictEqual, throws } from "assert";
import dedent = require("dedent");
import { render } from "mustache";
import { ResourceContext } from "../../ResourceContext";
import { TestResource } from "../TestResource";

suite(
    "ResourceContext",
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
            "lookup(string name)",
            () =>
            {
                test(
                    "Checking whether the resource can be used as a mustache-context correctly…",
                    () =>
                    {
                        strictEqual(
                            render(templateString, context),
                            render(
                                templateString,
                                {
                                    [id]: value
                                }));
                    });

                test(
                    "Checking whether resolving inexistent IDs throws…",
                    () =>
                    {
                        throws(() => render(`{{${inexistentID}}}`, context));
                    });
            });
    });
