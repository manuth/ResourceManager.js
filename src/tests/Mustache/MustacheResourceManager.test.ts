import { strictEqual, throws } from "node:assert";
import { CultureInfo } from "@manuth/culture-info";
import Mustache from "mustache";
import { MustacheResourceManager } from "../../MustacheResourceManager.js";
import { ResourceManager } from "../../ResourceManager.js";
import { TestResource } from "../TestResource.js";

/**
 * Registers tests for the {@link MustacheResourceManager `MustacheResourceManager`} class.
 */
export function MustacheResourceManagerTests(): void
{
    suite(
        nameof(MustacheResourceManager),
        () =>
        {
            let manager: MustacheResourceManager;
            let id: string;
            let value: any;
            let parentValue: any;
            let compositeItemID: string;
            let compositeItemValue: string;
            let inexistentID: string;
            let nonexistenceTestID: string;

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
                    nonexistenceTestID = "Nonexistence.Test.ID";

                    swissResource.Resource = {
                        [id]: value
                    };

                    germanResource.Resource = {
                        [id]: parentValue,
                        [compositeItemID]: compositeItemValue,
                        [nonexistenceTestID]: `{{${inexistentID}}}`
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
                nameof<MustacheResourceManager>((manager) => manager.Get),
                () =>
                {
                    test(
                        "Checking whether the resource-manager can be used as a mustache-context…",
                        () =>
                        {
                            strictEqual(
                                manager.Get(compositeItemID),
                                Mustache.render(
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
                                Mustache.render(
                                    compositeItemValue,
                                    {
                                        [id]: parentValue
                                    }));
                        });

                    test(
                        "Checking whether processing a resource-item with an inexistent ID throws…",
                        () =>
                        {
                            throws(() => manager.Get(nonexistenceTestID));
                        });
                });
        });
}
