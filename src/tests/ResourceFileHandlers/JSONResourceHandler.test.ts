import Assert = require("assert");
import { IResourceFileHandler } from "../../IResourceFileHandler";
import { JSONResourceHandler } from "../../JSONResourceHandler";

suite(
    "JSONResourceHandler",
    () =>
    {
        let fileHandler: IResourceFileHandler;

        suiteSetup(
            () =>
            {
                fileHandler = new JSONResourceHandler();
            });

        suite(
            "CheckApplicability(string fileName)",
            () =>
            {
                test(
                    "Checking whether files are classified correctly…",
                    () =>
                    {
                        Assert.strictEqual(fileHandler.CheckApplicability("test.json"), true);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.jsonc"), true);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.txt"), false);
                        Assert.strictEqual(fileHandler.CheckApplicability("test.yml"), false);
                    });
            });
    });