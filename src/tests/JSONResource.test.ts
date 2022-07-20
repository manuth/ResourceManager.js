import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import fs from "fs-extra";
import { JSONResource } from "../JSONResource.js";

const { readFile, writeFile, writeJSON } = fs;

/**
 * Registers tests for the {@link JSONResource `JSONResource`} class.
 */
export function JSONResourceTests(): void
{
    suite(
        nameof(JSONResource),
        () =>
        {
            let tempFile: TempFile;
            let resource: JSONResource;
            let id: string;
            let value: any;

            suiteSetup(
                async () =>
                {
                    tempFile = new TempFile();
                    id = "This.Is.An.ID";
                    value = "Some cool value";

                    await writeJSON(
                        tempFile.FullName,
                        {
                            [id]: value
                        });

                    resource = new JSONResource(tempFile.FullName);
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                nameof<JSONResource>((resource) => resource.Get),
                () =>
                {
                    test(
                        "Checking whether ordinary .json-files are read correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(id), value);
                        });

                    test(
                        "Checking whether .json-files with comments are read correctly…",
                        async () =>
                        {
                            let content = await readFile(tempFile.FullName);

                            await writeFile(
                                tempFile.FullName,
                                `// This is a test
                                ${content}`);

                            strictEqual(resource.Get(id), value);
                            await writeFile(tempFile.FullName, content);
                        });
                });
        });
}
