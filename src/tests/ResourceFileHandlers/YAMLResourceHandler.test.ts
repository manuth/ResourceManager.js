import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { random } from "case";
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { YAMLResource } from "../../YAMLResource";
import { YAMLResourceHandler } from "../../YAMLResourceHandler";

/**
 * Registers tests for the {@link YAMLResourceHandler `YAMLResourceHandler`} class.
 */
export function YAMLResourceHandlerTests(): void
{
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
                            Suffix: random(".yml")
                        });

                    yamlFile = new TempFile(
                        {
                            Suffix: random(".yaml")
                        });

                    jsonFile = new TempFile(
                        {
                            Suffix: random(".json")
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
                "CheckApplicability",
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
                "Create",
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
}
