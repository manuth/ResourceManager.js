import { strictEqual } from "assert";
import { render } from "mustache";
import { MustacheResource } from "../../MustacheResource";
import { TestResource } from "../TestResource";

/**
 * Registers tests for the {@link MustacheResource `MustacheResource`} class.
 */
export function MustacheResourceTests(): void
{
    suite(
        nameof(MustacheResource),
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

            suite(
                nameof<MustacheResource>((resource) => resource.Get),
                () =>
                {
                    test(
                        "Checking whether the values of the resources are preprocessed using mustache…",
                        () =>
                        {
                            strictEqual(
                                resource.Get(compositeItemID),
                                render(
                                    compositeItemValue,
                                    {
                                        [firstItemID]: firstItemValue,
                                        [secondItemID]: secondItemValue
                                    }));
                        });
                });
        });
}
