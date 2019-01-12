import Assert = require("assert");
import { CultureInfo } from "culture-info";
import Mustache = require("mustache");
import { ResourceManager } from "../../ResourceManager";
import { ResourceManagerContext } from "../../ResourceManagerContext";
import { TestResource } from "../TestResource";

suite(
    "ResourceManagerContext",
    () =>
    {
        let context: ResourceManagerContext;
        let templateString: string;
        let fallbackTemplateString: string;
        let id: string;
        let value: string;
        let parentValue: string;
        let fallbackID: string;
        let fallbackValue: string;
        let inexistentID: string;

        suiteSetup(
            () =>
            {
                id = "Street";
                value = "Strasse";
                parentValue = "Straße";
                fallbackID = "House";
                fallbackValue = "Haus";
                inexistentID = "This.ID.Does.Not.Exist";
                templateString = `{{Street}}`;
                fallbackTemplateString = `Am Ende der {{Street}} steht ein {{House}} am See`;
                let swissResource = new TestResource(new CultureInfo("de-ch"));
                swissResource.Resource = {
                    [id]: value
                };
                let germanResource = new TestResource(new CultureInfo("de"));
                germanResource.Resource = {
                    [id]: parentValue,
                    [fallbackID]: fallbackValue
                };

                context = new ResourceManagerContext(
                    new ResourceManager(
                        [
                            swissResource,
                            germanResource
                        ],
                        new CultureInfo("de-ch")));
            });

        suite(
            "General",
            () =>
            {

                test(
                    "Checking whether the resource-manager can be used as a mustache-context correctly…",
                    () =>
                    {
                        Assert.strictEqual(
                            Mustache.render(templateString, context),
                            Mustache.render(
                                templateString,
                                {
                                    [id]: value,
                                    [fallbackID]: fallbackValue
                                }));
                    });

                test(
                    "Checking whether resource-manager with fallback-items can be used as a mustache-context correctly…",
                    () =>
                    {
                        Assert.strictEqual(
                            Mustache.render(fallbackTemplateString, context),
                            Mustache.render(
                                fallbackTemplateString,
                                {
                                    [id]: value,
                                    [fallbackID]: fallbackValue
                                }));
                    });

                test(
                    "Checking whether resolving an inexistent ID throws…",
                    () =>
                    {
                        Assert.throws(() => Mustache.render(`{{${inexistentID}}}`, context));
                    });
            });

        suite(
            "Locale { get; set; }",
            () =>
            {
                test(
                    "Checking whether setting the locale of the context affects the context correctly…",
                    () =>
                    {
                        context.Locale = new CultureInfo("de");

                        Assert.strictEqual(
                            Mustache.render(templateString, context),
                            Mustache.render(
                                templateString,
                                {
                                    [id]: parentValue
                                }));
                    });
            });
    });