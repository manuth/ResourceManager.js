import Assert = require("assert");
import { TestFileResource } from "./TestFileResource";

suite(
    "FileResource",
    () =>
    {
        let resource: TestFileResource;
        let primaryID: string;
        let primaryValue: any;
        let secondaryID: string;
        let secondaryValue: any;

        suiteSetup(
            () =>
            {
                resource = new TestFileResource();
                primaryID = "First.ID";
                primaryValue = "This is the first Item";
                secondaryID = "Second.ID";
                secondaryValue = "This is the second Item";

                resource.Resource = {
                    [primaryID]: primaryValue
                };
            });

        setup(
            () =>
            {
                resource = new TestFileResource();

                resource.Resource = {
                    [primaryID]: primaryValue
                };
            });

        suite(
            "Get<T>(id)",
            () =>
            {
                test(
                    "Checking whether resource-items can be queried correctly…",
                    () =>
                    {
                        Assert.strictEqual(resource.Get(primaryID), primaryValue);
                    });
            });

        suite(
            "Cached { get; set; }",
            () =>
            {
                suite(
                    "Testing the functionality with cache-mode disabled…",
                    () =>
                    {
                        setup(
                            () =>
                            {
                                resource.Cached = false;
                            });

                        test(
                            "Checking whether file-changes affect the resource immediately…",
                            () =>
                            {
                                resource.Resource[secondaryID] = secondaryValue;
                                Assert.strictEqual(resource.Get(secondaryID), secondaryValue);
                            });
                    });

                suite(
                    "Testing the functionality with cache-mode enabled…",
                    () =>
                    {
                        setup(
                            () =>
                            {
                                resource.Cached = true;
                            });

                        test(
                            "Checking whether file-changes don't affect the resource immediately…",
                            () =>
                            {
                                resource.Resource[secondaryID] = secondaryValue;
                                Assert.throws(() => resource.Get(secondaryID));
                            });

                        test(
                            "Checking whether the file-resource still works when the resource-file is deleted…",
                            () =>
                            {
                                resource.Resource = {};
                                Assert.strictEqual(resource.Get(primaryID), primaryValue);
                            });
                    });
            });
    });