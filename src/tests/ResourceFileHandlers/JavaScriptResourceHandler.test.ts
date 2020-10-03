import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import { random } from "case";
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { JavaScriptResource } from "../../JavaScriptResource";
import { JavaScriptResourceHandler } from "../../JavaScriptResourceHandler";

/**
 * Registers tests for the `JavaScriptResourceHandler` class.
 */
export function JavaScriptResourceHandlerTests(): void
{
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
                            Suffix: random(".js")
                        });

                    txtFile = new TempFile(
                        {
                            Suffix: random(".txt")
                        });
                });

            suiteTeardown(
                () =>
                {
                    jsFile.Dispose();
                    txtFile.Dispose();
                });

            suite(
                "CheckApplicability",
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
                "Create",
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
}
