import { strictEqual } from "assert";
import { readFile, writeFile, writeJSON } from "fs-extra";
import { TempFile } from "temp-filesystem";
import { JSONResource } from "../JSONResource";

suite(
    "JSONResource",
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
            "Get<T>(string id)",
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
