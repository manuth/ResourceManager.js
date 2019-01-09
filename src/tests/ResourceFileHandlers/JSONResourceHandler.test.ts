import Assert = require("assert");
import { TempFile } from "temp-filesystem";
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { JSONResource } from "../../JSONResource";
import { JSONResourceHandler } from "../../JSONResourceHandler";

suite(
    "JSONResourceHandler",
    () =>
    {
        let fileHandler: IResourceFileHandler;
        let jsonFile: TempFile;
        let jsoncFile: TempFile;
        let txtFile: TempFile;
        let yamlFile: TempFile;

        suiteSetup(
            () =>
            {
                fileHandler = new JSONResourceHandler();
                jsonFile = new TempFile(
                    {
                        postfix: ".json"
                    });

                jsoncFile = new TempFile(
                    {
                        postfix: ".jsonc"
                    });

                txtFile = new TempFile(
                    {
                        postfix: ".txt"
                    });

                yamlFile = new TempFile(
                    {
                        postfix: ".yml"
                    });
            });

        suiteTeardown(
            () =>
            {
                jsonFile.Dispose();
                jsoncFile.Dispose();
                txtFile.Dispose();
                yamlFile.Dispose();
            });

        suite(
            "CheckApplicability(string fileName)",
            () =>
            {
                test(
                    "Checking whether files are classified correctly…",
                    () =>
                    {
                        Assert.strictEqual(fileHandler.CheckApplicability("test.json"), true);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.jsonc"), true);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.txt"), false);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.yml"), false);
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
                        Assert.strictEqual(fileHandler.Create(jsonFile.FullName) instanceof JSONResource, true);
                        Assert.strictEqual(fileHandler.Create(jsoncFile.FullName) instanceof JSONResource, true);
                    });
            });
    });