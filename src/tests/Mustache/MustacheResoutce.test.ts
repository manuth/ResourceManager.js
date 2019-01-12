import Assert = require("assert");
import Mustache = require("mustache");
import { MustacheResource } from "../../MustacheResource";
import { TestResource } from "../TestResource";

suite(
    "MustacheResource",
    () =>
    {
        let resource: MustacheResource;
        let firstItemID: string;
        let firstItemValue: any;
        let secondItemID: string;
        let secondItemValue: any;
        let compositeItemID: string;
        let compositeItemValue: string;
        let inexistentID: string;
        let inexistenceTestID: string;

        suiteSetup(
            () =>
            {
                let internalResource = new TestResource();
                firstItemID = "ProjectName";
                firstItemValue = "My Awesome Project";
                secondItemID = "Author";
                secondItemValue = "m@nuth";
                compositeItemID = "CopyRight";
                compositeItemValue = `{{${firstItemID}}} © by {{${secondItemID}}} ${new Date().getFullYear()}`;
                inexistentID = "This.ID.Does.Not.Exist";
                inexistenceTestID = "Inexistence.Test";
                internalResource.Resource = {
                    [firstItemID]: firstItemValue,
                    [secondItemID]: secondItemValue,
                    [compositeItemID]: compositeItemValue,
                    [inexistenceTestID]: inexistentID
                };
                resource = new MustacheResource(internalResource);
            });

        test(
            "Checking whether the values of the resources are preprocessed using mustache…",
            () =>
            {
                Assert.strictEqual(
                    resource.Get(compositeItemID),
                    Mustache.render(
                        compositeItemValue,
                        {
                            [firstItemID]: firstItemValue,
                            [secondItemID]: secondItemValue
                        }));
            });
    });