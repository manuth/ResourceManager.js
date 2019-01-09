import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import YAML = require("yaml");
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
                await FileSystem.writeFile(
                    tempFile.FullName,
                    YAML.stringify(
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
                        Assert.strictEqual(resource.Get(id), value);
                    });
            });
    });