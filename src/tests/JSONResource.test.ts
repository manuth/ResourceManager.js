import Assert = require("assert");
import FileSystem = require("fs-extra");
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
                FileSystem.writeJSON(
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
                        Assert.strictEqual(resource.Get(id), value);
                    });

                test(
                    "Checking whether .json-files with comments are read correctly…",
                    async () =>
                    {
                        let content = await FileSystem.readFile(tempFile.FullName);
                        await FileSystem.writeFile(
                            tempFile.FullName,
                            `// This is a test
                            ${content}`);
                        Assert.strictEqual(resource.Get(id), value);
                        await FileSystem.writeFile(tempFile.FullName, content);
                    });
            });
    });