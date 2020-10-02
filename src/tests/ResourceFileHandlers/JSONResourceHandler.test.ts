import { strictEqual } from "assert";
import { random } from "case";
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
                        postfix: random(".json")
                    });

                jsoncFile = new TempFile(
                    {
                        postfix: random(".jsonc")
                    });

                txtFile = new TempFile(
                    {
                        postfix: random(".txt")
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
                        strictEqual(fileHandler.CheckApplicability(jsonFile.FullName), true);
                        strictEqual(fileHandler.CheckApplicability(jsoncFile.FullName), true);
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
                        strictEqual(fileHandler.Create(jsonFile.FullName) instanceof JSONResource, true);
                    });
            });
    });
