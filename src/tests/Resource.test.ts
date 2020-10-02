import { strictEqual, throws } from "assert";
import { CultureInfo } from "culture-info";
import { DuplicateKeyException } from "../DuplicateKeyException";
import { KeyNotFoundException } from "../KeyNotFoundException";
import { TestResource } from "./TestResource";

suite(
    "Resource",
    () =>
    {
        let resource: TestResource;
        let rootID: string;
        let rootValue: any;
        let nestedID: string;
        let nestedValue: any;
        let duplicateID: string;
        let duplicateRootValue: any;
        let duplicateNestedValue: any;
        let independentID: string;
        let composedID: string;
        let independentInIndependent: any;
        let independentInComposed: any;
        let composedInIndependent: any;
        let composedInComposed: any;
        let inexistentID: string;

        suiteSetup(
            () =>
            {
                resource = new TestResource();
                rootID = "Root.Distinguishable.Resource";
                rootValue = "Root-Item";

                nestedID = "Nested.Distinguishable.Resource";
                nestedValue = "Nested-Item";

                duplicateID = "Duplicate.Resource";
                duplicateRootValue = "Root-Duplicate";
                duplicateNestedValue = "Nested-Duplicate";

                independentID = "This";
                composedID = "This.Is.A";

                independentInIndependent = "Test-value";
                independentInComposed = "Other test-value";
                composedInIndependent = "One more test-value";
                composedInComposed = "One last test-value";

                inexistentID = "This.ID.Doesn.Not.Exist";

                resource.Resource = {
                    [rootID]: rootValue,
                    [duplicateID]: duplicateRootValue,
                    [independentID]: {
                        [independentID]: independentInIndependent,
                        [composedID]: composedInIndependent
                    },
                    [composedID]: {
                        [independentID]: independentInComposed,
                        [composedID]: composedInComposed
                    }
                };

                let idValuePairs: Array<[string, any]> = [[nestedID, nestedValue], [duplicateID, duplicateNestedValue]];

                for (let idValuePair of idValuePairs)
                {
                    let id = idValuePair[0];
                    let value = idValuePair[1];

                    for (let idPart of id.split(".").reverse())
                    {
                        value = {
                            [idPart]: value
                        };
                    }

                    resource.Resource = {
                        ...resource.Resource,
                        ...value
                    };
                }
            });

        suite(
            "constructor(CultureInfo locale)",
            () =>
            {
                test(
                    "Checking whether the generated resources have the correct locale…",
                    () =>
                    {
                        let englishCulture = new CultureInfo("en");
                        strictEqual(new TestResource().Locale.Name, CultureInfo.InvariantCulture.Name);
                        strictEqual(new TestResource(englishCulture).Locale.Name, englishCulture.Name);
                    });
            });

        suite(
            "Get(string id)",
            () =>
            {
                test(
                    "Checking whether containing dots can be resolved…",
                    () =>
                    {
                        strictEqual(resource.Get(rootID), rootValue);
                    });

                test(
                    "Checking whether nested elements can be resolved…",
                    () =>
                    {
                        strictEqual(resource.Get(nestedID), nestedValue);
                    });

                test(
                    "Checking whether resolving duplicate IDs throws an exception…",
                    () =>
                    {
                        throws(() => resource.Get(duplicateID), DuplicateKeyException);
                    });

                test(
                    "Checking whether resolving an inexistent id triggers an error…",
                    () =>
                    {
                        throws(() => resource.Get(inexistentID), KeyNotFoundException);
                    });

                test(
                    "Checking whether independent key in independent keys are resolved correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(`${independentID}.${independentID}`), independentInIndependent);
                    });

                test(
                    "Checking whether composed keys in independent keys are resolved correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(`${independentID}.${composedID}`), composedInIndependent);
                    });

                test(
                    "Checking whether independent keys in composed keys are resolved correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(`${composedID}.${independentID}`), independentInComposed);
                    });

                test(
                    "Checking whether composed keys in composed keys are resolved correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(`${composedID}.${composedID}`), composedInComposed);
                    });
            });

        suite(
            "Exists(string id)",
            () =>
            {
                test(
                    "Checking whether the method detects whether an ID exists…",
                    () =>
                    {
                        strictEqual(resource.Exists(rootID), true);
                        strictEqual(resource.Exists(inexistentID), false);
                    });

                test(
                    "Checking whether the method detects whether duplicate IDs exist…",
                    () =>
                    {
                        strictEqual(resource.Exists(duplicateID), true);
                    });
            });
    });
