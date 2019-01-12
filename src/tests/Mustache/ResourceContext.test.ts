import Assert = require("assert");
import Dedent = require("dedent");
import Mustache = require("mustache");
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
                templateString = Dedent(
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

        test(
            "Checking whether the resource can be used as a mustache-context correctly…",
            () =>
            {
                Assert.strictEqual(
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
                Assert.throws(() => Mustache.render(`{{${inexistentID}}}`, context));
            });
    });