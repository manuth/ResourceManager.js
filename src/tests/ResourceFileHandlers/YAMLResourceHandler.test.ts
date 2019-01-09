import Assert = require("assert");
import { TempFile } from "temp-filesystem";
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { YAMLResource } from "../../YAMLResource";
import { YAMLResourceHandler } from "../../YAMLResourceHandler";

suite(
    "YAMLResourceHandler",
    () =>
    {
        let fileHandler: IResourceFileHandler;
        let ymlFile: TempFile;
        let yamlFile: TempFile;
        let jsonFile: TempFile;

        suiteSetup(
            () =>
            {
                fileHandler = new YAMLResourceHandler();
                ymlFile = new TempFile(
                    {
                        postfix: ".yml"
                    });

                yamlFile = new TempFile(
                    {
                        postfix: ".yaml"
                    });

                jsonFile = new TempFile(
                    {
                        postfix: ".json"
                    });
            });

        suiteTeardown(
            () =>
            {
                ymlFile.Dispose();
                yamlFile.Dispose();
                jsonFile.Dispose();
            });

        suite(
            "CheckApplicability(string fileName)",
            () =>
            {
                test(
                    "Checking whether files are classified correctly…",
                    () =>
                    {
                        Assert.strictEqual(fileHandler.CheckApplicability(ymlFile.FullName), true);
                        Assert.strictEqual(fileHandler.CheckApplicability(yamlFile.FullName), true);
                        Assert.strictEqual(fileHandler.CheckApplicability(jsonFile.FullName), false);
                    });
            });

        suite(
            "Create(string fileName, CultureInfo locale)",
            () =>
            {
                test(
                    "Checking whether the created resources have the correct type…",
                    () =>
                    {
                        Assert.strictEqual(fileHandler.Create(ymlFile.FullName) instanceof YAMLResource, true);
                    });
            });
    });