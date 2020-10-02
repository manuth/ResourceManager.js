import { strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import dedent = require("dedent");
import { writeFile } from "fs-extra";
import { JavaScriptResource } from "../JavaScriptResource";

suite(
    "JavaScriptResource",
    () =>
    {
        let tempFile: TempFile;
        let resource: JavaScriptResource;
        let id: string;
        let value: any;
        let containerID: string;
        let nestedID: string;
        let nestedValue: any;
        let propertyID: string;
        let propertyFormula: any;

        suiteSetup(
            async () =>
            {
                tempFile = new TempFile(
                    {
                        Suffix: ".js"
                    });

                resource = new JavaScriptResource(tempFile.FullName);

                id = "Key";
                value = "Value";
                containerID = "Window";
                nestedID = "Width";
                nestedValue = 200;
                propertyID = "Height";
                propertyFormula = `return ${nestedValue} / 2`;

                await writeFile(
                    tempFile.FullName,
                    dedent(
                        `
                            module.exports = {
                                ${id}: ${JSON.stringify(value)},
                                ${containerID}: {
                                    ${nestedID}: ${JSON.stringify(nestedValue)},
                                    get ${propertyID}()
                                    {
                                        ${propertyFormula};
                                    }
                                }
                            }
                        `));
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
                    "Checking whether normal items are read correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(id), value);
                    });

                test(
                    "Checking whether nested items are read correctly…",
                    () =>
                    {
                        strictEqual(resource.Get(`${containerID}.${nestedID}`), nestedValue);
                    });

                test(
                    "Checking whether properties are read correctly…",
                    () =>
                    {
                        /**
                         * Represents a function.
                         */
                        class MyFunction extends Function
                        {
                            /**
                             * Initializes a new instance of the `MyFunction` class.
                             *
                             * @param args
                             *The arguments for creating the function.
                             */
                            public constructor(...args: string[])
                            {
                                super(...args);
                            }
                        }

                        strictEqual(resource.Get(`${containerID}.${propertyID}`), (new MyFunction(propertyFormula))());
                    });
            });
    });
