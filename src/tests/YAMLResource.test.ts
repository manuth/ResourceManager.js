import { strictEqual } from "assert";
import { writeFile } from "fs-extra";
import { TempFile } from "temp-filesystem";
import { stringify } from "yaml";
import { YAMLResource } from "../YAMLResource";

suite(
    "YAMLResource",
    () =>
    {
        let tempFile: TempFile;
        let resource: YAMLResource;
        let id: string;
        let value: any;

        suiteSetup(
            async () =>
            {
                id = "This.Is.A.Test";
                value = "Example";
                tempFile = new TempFile();

                await writeFile(
                    tempFile.FullName,
                    stringify(
                        {
                            [id]: value
                        }));

                resource = new YAMLResource(tempFile.FullName);
            });

        suite(
            "Get<T>(string id)",
            () =>
            {
                test(
                    "Checking whether .yaml-files are read correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(id), value);
                    });
            });
    });
