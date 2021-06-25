import { strictEqual, throws } from "assert";
import { CultureInfo } from "@manuth/culture-info";
import { TempDirectory } from "@manuth/temp-files";
import { ensureFile, writeFile, writeJSON } from "fs-extra";
import { stringify } from "yaml";
import { DuplicateKeyException } from "../DuplicateKeyException";
import { Resource } from "../Resource";
import { ResourceManager } from "../ResourceManager";
import { TestFile } from "./TestFile";
import { TestResource } from "./TestResource";
import { TestResourceManager } from "./TestResourceManager";

/**
 * Registers tests for the {@link ResourceManager `ResourceManager`} class.
 */
export function ResourceManagerTests(): void
{
    suite(
        nameof(ResourceManager),
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
                nameof(ResourceManager.constructor),
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            let resources: Resource[];
                            let tags: string[];

                            suiteSetup(
                                () =>
                                {
                                    resources = [];
                                    tags = ["this", "is", "a", "test"];

                                    for (let tag of tags)
                                    {
                                        let resource = new TestResource();
                                        resource.Resource = {
                                            [tag]: {}
                                        };

                                        resources.push(resource);
                                    }
                                });

                            test(
                                "Checking whether the constructor can be executed without any arguments…",
                                () =>
                                {
                                    let manager = new TestResourceManager();
                                    strictEqual(manager.Locale, CultureInfo.InvariantCulture);
                                    strictEqual(manager.ManagedResources.length, 0);
                                });

                            test(
                                "Checking whether the constructor can be executed with a locale…",
                                () =>
                                {
                                    strictEqual(new TestResourceManager(randomCulture).Locale, randomCulture);
                                });

                            test(
                                "Checking whether the constructor works as expected…",
                                () =>
                                {
                                    let manager = new TestResourceManager(resources, CultureInfo.InvariantCulture);
                                    strictEqual(new TestResourceManager([]).Locale, CultureInfo.InvariantCulture);
                                    strictEqual(new TestResourceManager([], randomCulture).Locale, randomCulture);

                                    for (let tag of tags)
                                    {
                                        let resourceIndex = manager.ManagedResources.findIndex(resource => resource.Exists(tag));
                                        strictEqual(resourceIndex >= 0, true);
                                        (manager.ManagedResources[resourceIndex] as TestResource).Resource = {};
                                    }
                                });
                        });

                    suite(
                        "File-Collections",
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

                                        await ensureFile(testFile.FileName);
                                        testFiles.push(testFile);
                                    }
                                });

                            suiteTeardown(
                                () =>
                                {
                                    tempDir.Dispose();
                                });

                            setup(
                                () =>
                                {
                                    manager = new TestResourceManager(tempDir.MakePath(baseFileName));
                                });

                            test(
                                "Checking whether the constructor can be executed with a base-filename…",
                                () =>
                                {
                                    strictEqual(new TestResourceManager(tempDir.MakePath(baseFileName)).Locale, CultureInfo.InvariantCulture);
                                    strictEqual(new TestResourceManager(tempDir.MakePath(baseFileName), randomCulture).Locale, randomCulture);

                                    for (let testFile of testFiles)
                                    {
                                        let fileHandlerIndex = manager.FileHandlers.findIndex(fileHandler => fileHandler.CheckApplicability(testFile.FileName));

                                        if (fileHandlerIndex >= 0)
                                        {
                                            let fileHandler = manager.FileHandlers[fileHandlerIndex];
                                            let resourceConstructor = fileHandler.Create(testFile.FileName).constructor;

                                            strictEqual(
                                                manager.ManagedResources.findIndex(
                                                    resource => resource.constructor === resourceConstructor &&
                                                        resource.Locale.Name === testFile.Locale.Name) >= 0,
                                                true);
                                        }
                                    }
                                });
                        });
                });

            suite(
                nameof<ResourceManager>((manager) => manager.Get),
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

                            await writeJSON(
                                tempDir.MakePath(`${baseFileName}.${locale.Parent}.json`),
                                {
                                    [id]: parentValue,
                                    [fallbackID]: fallbackValue
                                });

                            await writeJSON(
                                tempDir.MakePath(`${baseFileName}.${locale}.json`),
                                {
                                    [id]: value,
                                    [fileDuplicate]: {}
                                });

                            await writeFile(
                                tempDir.MakePath(`${baseFileName}.${locale}.yaml`),
                                stringify(
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

                                await writeJSON(
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
                            strictEqual(manager.Get(id), value);
                            strictEqual(manager.Get(id, locale.Parent), parentValue);
                        });

                    test(
                        "Checking whether resource-items with fallbacks are resolved correctly…",
                        () =>
                        {
                            strictEqual(manager.Get(fallbackID), fallbackValue);
                        });

                    test(
                        "Checking whether resolving a resource-id which exists multiple times in the same file throws…",
                        () =>
                        {
                            throws(() => manager.Get(duplicate, duplicateLocale), DuplicateKeyException);
                        });

                    test(
                        "Checking whether resolving a resource-id which exists in multiple files of the same locale throws…",
                        () =>
                        {
                            throws(() => manager.Get(fileDuplicate), DuplicateKeyException);
                        });
                });
        });
}
