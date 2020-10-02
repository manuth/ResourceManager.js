import { strictEqual, throws } from "assert";
import { CultureInfo } from "@manuth/culture-info";
import { render } from "mustache";
import { MustacheResourceManager } from "../../MustacheResourceManager";
import { ResourceManager } from "../../ResourceManager";
import { TestResource } from "../TestResource";

suite(
    "MustacheResourceManager",
    () =>
    {
        let manager: MustacheResourceManager;
        let id: string;
        let value: any;
        let parentValue: any;
        let compositeItemID: string;
        let compositeItemValue: string;
        let inexistentID: string;
        let inexistenceTestID: string;

        suiteSetup(
            () =>
            {
                let swissResource = new TestResource(new CultureInfo("de-ch"));
                let germanResource = new TestResource(new CultureInfo("de"));
                id = "Unit";
                value = "Masseinheit";
                parentValue = "Maßeinheit";
                compositeItemID = "UnitMessage";
                compositeItemValue = "Bitte wähle eine {{Unit}}.";
                inexistentID = "This.ID.Does.Not.Exist";
                inexistenceTestID = "Inexistence.Test.ID";

                swissResource.Resource = {
                    [id]: value
                };

                germanResource.Resource = {
                    [id]: parentValue,
                    [compositeItemID]: compositeItemValue,
                    [inexistenceTestID]: `{{${inexistentID}}}`
                };

                manager = new MustacheResourceManager(
                    new ResourceManager(
                        [
                            germanResource,
                            swissResource
                        ],
                        new CultureInfo("de-CH")));
            });

        suite(
            "Get<T>(string name, CultureInfo locale)",
            () =>
            {
                test(
                    "Checking whether the resource-manager can be used as a mustache-context…",
                    () =>
                    {
                        strictEqual(
                            manager.Get(compositeItemID),
                            render(
                                compositeItemValue,
                                {
                                    [id]: value
                                }));
                    });

                test(
                    "Checking whether passing a custom locale affects the output correctly…",
                    () =>
                    {
                        strictEqual(
                            manager.Get(compositeItemID, new CultureInfo("de")),
                            render(
                                compositeItemValue,
                                {
                                    [id]: parentValue
                                }));
                    });

                test(
                    "Checking whether processing a resource-item with an inexistent ID throws…",
                    () =>
                    {
                        throws(() => manager.Get(inexistenceTestID));
                    });
            });
    });
