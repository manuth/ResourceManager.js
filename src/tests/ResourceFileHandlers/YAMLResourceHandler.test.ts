import { strictEqual } from "assert";
import { random } from "case";
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
                        postfix: random(".yml")
                    });

                yamlFile = new TempFile(
                    {
                        postfix: random(".yaml")
                    });

                jsonFile = new TempFile(
                    {
                        postfix: random(".json")
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
                        strictEqual(fileHandler.CheckApplicability(ymlFile.FullName), true);
                        strictEqual(fileHandler.CheckApplicability(yamlFile.FullName), true);
                        strictEqual(fileHandler.CheckApplicability(jsonFile.FullName), false);
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
                        strictEqual(fileHandler.Create(ymlFile.FullName) instanceof YAMLResource, true);
                    });
            });
    });
