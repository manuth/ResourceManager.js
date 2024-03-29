import { strictEqual } from "node:assert";
import { TempFile } from "@manuth/temp-files";
import fs from "fs-extra";
import { stringify } from "yaml";
import { YAMLResource } from "../YAMLResource.js";

const { writeFile } = fs;

/**
 * Registers tests for the {@link YAMLResource `YAMLResource`} class.
 */
export function YAMLResourceTests(): void
{
    suite(
        nameof(YAMLResource),
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
                nameof<YAMLResource>((resource) => resource.Get),
                () =>
                {
                    test(
                        "Checking whether `.yaml`-files are read correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(id), value);
                        });
                });
        });
}
