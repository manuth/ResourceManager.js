import Assert = require("assert");
import { CultureInfo } from "culture-info";
import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import YAML = require("yaml");
import { DuplicateKeyException } from "../DuplicateKeyException";
import { Resource } from "../Resource";
import { ResourceManager } from "../ResourceManager";
import { TestFile } from "./TestFile";
import { TestResource } from "./TestResource";
import { TestResourceManager } from "./TestResourceManager";

suite(
    "ResourceManager",
    () =>
    {
        let randomCulture: CultureInfo;
        let cultureNames: string[];

        suiteSetup(
            () =>
            {
                cultureNames = [
                    "en",
                    "en-US",
                    "de",
                    "de-CH",
                    "fr",
                    "fr-CH",
                    "cn",
                    "cn-CZ",
                    "cn-Hans-CZ"
                ];
            });

        setup(
            () =>
            {
                randomCulture = new CultureInfo(cultureNames[Math.floor(Math.random() * cultureNames.length)]);
            });

        suite(
            "constructor()",
            () =>
            {
                test(
                    "Checking whether the constructor works as expected…",
                    () =>
                    {
                        let manager = new TestResourceManager();
                        Assert.strictEqual(manager.Locale, CultureInfo.InvariantCulture);
                        Assert.strictEqual(manager.ManagedResources.length, 0);
                    });
            });

        suite(
            "constructor(CultureInfo locale)",
            () =>
            {
                test(
                    "Checking whether the constructor works as expected…",
                    () =>
                    {
                        Assert.strictEqual(new TestResourceManager(randomCulture).Locale, randomCulture);
                    });
            });

        suite(
            "constructor(Resource[] resources, CultureInfo locale)",
            () =>
            {
                let tags: string[];
                let manager: TestResourceManager;

                suiteSetup(
                    () =>
                    {
                        let resources: Resource[] = [];
                        tags = ["this", "is", "a", "test"];

                        for (let tag of tags)
                        {
                            let resource = new TestResource();
                            resource.Resource = {
                                [tag]: {}
                            };

                            resources.push(resource);
                        }

                        manager = new TestResourceManager(resources);
                    });

                test(
                    "Checking whether the constructor works as expected…",
                    () =>
                    {
                        Assert.strictEqual(new TestResourceManager([]).Locale, CultureInfo.InvariantCulture);
                        Assert.strictEqual(new TestResourceManager([], randomCulture).Locale, randomCulture);

                        for (let tag of tags)
                        {
                            let resourceIndex = manager.ManagedResources.findIndex(resource => resource.Exists(tag));
                            Assert.strictEqual(resourceIndex >= 0, true);
                            (manager.ManagedResources[resourceIndex] as TestResource).Resource = {};
                        }
                    });
            });

        suite(
            "constructor(string baseFileName, CultureInfo locale)",
            () =>
            {
                let manager: TestResourceManager;
                let tempDir: TempDirectory;
                let baseFileName: string;
                let testFiles: TestFile[];

                suiteSetup(
                    async () =>
                    {
                        tempDir = new TempDirectory();
                        baseFileName = "Test";
                        testFiles = [];

                        let fileExtensions = [
                            "yml",
                            "yaml",
                            "json",
                            "jsonc",
                            "js"
                        ];

                        let cultures = [
                            ...cultureNames.map(cultureName => new CultureInfo(cultureName)),
                            CultureInfo.InvariantCulture
                        ];

                        for (let i = 0; i < 10; i++)
                        {
                            let testFile = new TestFile(
                                tempDir.MakePath(baseFileName),
                                cultures[Math.floor(Math.random() * cultures.length)],
                                fileExtensions[Math.floor(Math.random() * fileExtensions.length)]);

                            await FileSystem.ensureFile(testFile.FileName);
                            testFiles.push(testFile);
                        }

                        manager = new TestResourceManager(tempDir.MakePath(baseFileName));
                    });

                suiteTeardown(
                    () =>
                    {
                        tempDir.Dispose();
                    });

                test(
                    "Checking whether the constructor works as expected…",
                    () =>
                    {
                        Assert.strictEqual(new TestResourceManager(tempDir.MakePath(baseFileName)).Locale, CultureInfo.InvariantCulture);
                        Assert.strictEqual(new TestResourceManager(tempDir.MakePath(baseFileName), randomCulture).Locale, randomCulture);

                        for (let testFile of testFiles)
                        {
                            let fileHandlerIndex = manager.FileHandlers.findIndex(fileHandler => fileHandler.CheckApplicability(testFile.FileName));

                            if (fileHandlerIndex >= 0)
                            {
                                let fileHandler = manager.FileHandlers[fileHandlerIndex];
                                let resourceConstructor = fileHandler.Create(testFile.FileName).constructor;

                                Assert.strictEqual(
                                    manager.ManagedResources.findIndex(
                                        resource => resource.constructor === resourceConstructor &&
                                            resource.Locale.Name === testFile.Locale.Name) >= 0,
                                    true);
                            }
                        }
                    });
            });

        suite(
            "Get<T>(string id, CultureInfo locale)",
            () =>
            {
                let locale: CultureInfo;
                let duplicateLocale: CultureInfo;
                let manager: ResourceManager;
                let tempDir: TempDirectory;
                let baseFileName: string;
                let id: string;
                let value: any;
                let parentValue: any;
                let fallbackID: string;
                let fallbackValue: any;
                let duplicate: string;
                let fileDuplicate: string;

                suiteSetup(
                    async () =>
                    {
                        locale = new CultureInfo("de-CH");
                        duplicateLocale = new CultureInfo("cn-Hans-CZ");
                        tempDir = new TempDirectory();
                        baseFileName = "Test";
                        id = "Street";
                        value = "Strasse";
                        parentValue = "Straße";
                        fallbackID = "PlaceHolderName";
                        fallbackValue = "Max Mustermann";
                        duplicate = "This.ID.Is.Indistinguishable";
                        fileDuplicate = "This.ID.Exists.In.Multiple.Files";

                        await FileSystem.writeJSON(
                            tempDir.MakePath(`${baseFileName}.${locale.Parent}.json`),
                            {
                                [id]: parentValue,
                                [fallbackID]: fallbackValue
                            });

                        await FileSystem.writeJSON(
                            tempDir.MakePath(`${baseFileName}.${locale}.json`),
                            {
                                [id]: value,
                                [fileDuplicate]: {}
                            });

                        await FileSystem.writeFile(
                            tempDir.MakePath(`${baseFileName}.${locale}.yaml`),
                            YAML.stringify(
                                {
                                    [fileDuplicate]: {}
                                }));

                        let duplicateResource = {
                            [duplicate]: {}
                        };

                        {
                            let duplicateStore = {};

                            for (let idPart of duplicate.split(".").reverse())
                            {
                                duplicateStore = {
                                    [idPart]: duplicateStore
                                };
                            }

                            duplicateResource = {
                                ...duplicateResource,
                                ...duplicateStore
                            };

                            await FileSystem.writeJSON(
                                tempDir.MakePath(`${baseFileName}.${duplicateLocale}.json`),
                                duplicateResource);
                        }

                        manager = new ResourceManager(tempDir.MakePath(baseFileName), locale);
                    });

                suiteTeardown(
                    () =>
                    {
                        tempDir.Dispose();
                    });

                test(
                    "Checking whether resource-items are resolved correctly…",
                    () =>
                    {
                        Assert.strictEqual(manager.Get(id), value);
                        Assert.strictEqual(manager.Get(id, locale.Parent), parentValue);
                    });

                test(
                    "Checking whether resource-items with fallbacks are resolved correctly…",
                    () =>
                    {
                        Assert.strictEqual(manager.Get(fallbackID), fallbackValue);
                    });

                test(
                    "Checking whether resolving a resource-id which exists multiple times in the same file throws…",
                    () =>
                    {
                        Assert.throws(() => manager.Get(duplicate, duplicateLocale), DuplicateKeyException);
                    });

                test(
                    "Checking whether resolving a resource-id which exists in multiple files of the same locale throws…",
                    () =>
                    {
                        Assert.throws(() => manager.Get(fileDuplicate), DuplicateKeyException);
                    });
            });
    });
