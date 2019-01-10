import Assert = require("assert");
import { CultureInfo } from "culture-info";
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

                inexistentID = "This.ID.Doesn.Not.Exist";

                resource.Resource = {
                    [rootID]: rootValue,
                    [duplicateID]: duplicateRootValue
                };

                let idValuePairs: [string, any][] = [[nestedID, nestedValue], [duplicateID, duplicateNestedValue]];

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
                        Assert.strictEqual(new TestResource().Locale.Name, CultureInfo.InvariantCulture.Name);
                        Assert.strictEqual(new TestResource(englishCulture).Locale.Name, englishCulture.Name);
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
                         Assert.strictEqual(resource.Get(rootID), rootValue);
                    });

                test(
                    "Checking whether nested elements can be resolved…",
                    () =>
                    {
                        Assert.strictEqual(resource.Get(nestedID), nestedValue);
                    });

                test(
                    "Checking whether resolving duplicate IDs throws an exception…",
                    () =>
                    {
                        Assert.throws(() => resource.Get(duplicateID));
                    });

                test(
                    "Checking whether resolving an inexistent id triggers an error…",
                    () =>
                    {
                        Assert.throws(() => resource.Get(inexistentID));
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
                        Assert.strictEqual(resource.Exists(rootID), true);
                        Assert.strictEqual(resource.Exists(inexistentID), false);
                    });

                test(
                    "Checking whether the method detects whether duplicate IDs exist…",
                    () =>
                    {
                        Assert.strictEqual(resource.Exists(duplicateID), true);
                    });
            });
    });