import Assert = require("assert");
import Case = require("case");
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

        suiteSetup(
            () =>
            {
                fileHandler = new JSONResourceHandler();
                jsonFile = new TempFile(
                    {
                        postfix: Case.random(".json")
                    });

                jsoncFile = new TempFile(
                    {
                        postfix: Case.random(".jsonc")
                    });

                txtFile = new TempFile(
                    {
                        postfix: Case.random(".txt")
                    });
            });

        suiteTeardown(
            () =>
            {
                jsonFile.Dispose();
                jsoncFile.Dispose();
                txtFile.Dispose();
            });

        suite(
            "CheckApplicability(string fileName)",
            () =>
            {
                test(
                    "Checking whether files are classified correctly…",
                    () =>
                    {
                        Assert.strictEqual(fileHandler.CheckApplicability(jsonFile.FullName), true);
                        Assert.strictEqual(fileHandler.CheckApplicability(jsoncFile.FullName), true);
                        Assert.strictEqual(fileHandler.CheckApplicability(txtFile.FullName), false);
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
                    });
            });
    });