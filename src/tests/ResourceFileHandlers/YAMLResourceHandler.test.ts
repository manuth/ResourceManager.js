import { strictEqual } from "node:assert";
import { TempFile } from "@manuth/temp-files";
import Case from "case";
import { IResourceFileHandler } from "../../IResourceFileHandler.js";
import { YAMLResource } from "../../YAMLResource.js";
import { YAMLResourceHandler } from "../../YAMLResourceHandler.js";

const { random } = Case;

/**
 * Registers tests for the {@link YAMLResourceHandler `YAMLResourceHandler`} class.
 */
export function YAMLResourceHandlerTests(): void
{
    suite(
        nameof(YAMLResourceHandler),
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
                nameof<YAMLResourceHandler>((handler) => handler.CheckApplicability),
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
                nameof<YAMLResourceHandler>((handler) => handler.Create),
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
