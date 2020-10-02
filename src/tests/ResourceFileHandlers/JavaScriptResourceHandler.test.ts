import { strictEqual } from "assert";
import { random } from "case";
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
                        postfix: random(".js")
                    });

                txtFile = new TempFile(
                    {
                        postfix: random(".txt")
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
                        strictEqual(fileHandler.CheckApplicability(jsFile.FullName), true);
                        strictEqual(fileHandler.CheckApplicability(txtFile.FullName), false);
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
                        strictEqual(fileHandler.Create(txtFile.FullName) instanceof JavaScriptResource, true);
                    });
            });
    });
