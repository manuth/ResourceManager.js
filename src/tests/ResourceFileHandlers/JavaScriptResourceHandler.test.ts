import Assert = require("assert");
import Case = require("case");
import { TempFile } from "temp-filesystem";
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { JavaScriptResource } from "../../JavaScriptResource";
import { JavaScriptResourceHandler } from "../../JavaScriptResourceHandler";

suite(
    "JavaScriptResourceHandler",
    () =>
    {
        let fileHandler: IResourceFileHandler;
        let jsFile: TempFile;
        let txtFile: TempFile;

        suiteSetup(
            () =>
            {
                fileHandler = new JavaScriptResourceHandler();
                jsFile = new TempFile(
                    {
                        postfix: Case.random(".js")
                    });

                txtFile = new TempFile(
                    {
                        postfix: Case.random(".txt")
                    });
            });

        suiteTeardown(
            () =>
            {
                jsFile.Dispose();
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
                        Assert.strictEqual(fileHandler.CheckApplicability(jsFile.FullName), true);
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
                        Assert.strictEqual(fileHandler.Create(txtFile.FullName) instanceof JavaScriptResource, true);
                    });
            });
    });