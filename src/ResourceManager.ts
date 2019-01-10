import { CultureInfo } from "culture-info";
import FileSystem = require("fs-extra");
import Path = require("path");
import { isNullOrUndefined } from "util";
import { FileResource } from "./FileResource";
import { IResourceFileHandler } from "./IResourceFileHandler";
import { JavaScriptResourceHandler } from "./JavaScriptResourceHandler";
import { JSONResourceHandler } from "./JSONResourceHandler";
import { Resource } from "./Resource";
import { YAMLResourceHandler } from "./YAMLResourceHandler";

/**
 * Provides the functionality to manage localized resources.
 */
export class ResourceManager
{
    /**
     * The locale of the resource-items to resolve.
     */
    private locale: CultureInfo;

    /**
     * The resources of the resource-manager.
     */
    private resources: Resource[];

    /**
     * Initializes a new instance of the `ResourceManager` class.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(locale: CultureInfo);

    /**
     * Initializes a new instance of the `ResourceManager` class.
     *
     * @param baseFileName
     * The base-filename of the resource-manager.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(baseFileName: string, locale?: CultureInfo);

    /**
     * Initializes a new instance of the `ResourceManager` class.
     *
     * @param resources
     * The resources managed by the resource-manager.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(resources?: Resource[], locale?: CultureInfo);
    public constructor(resourceDeclarations: CultureInfo | string | Resource[] = null, locale?: CultureInfo)
    {
        let resources: Resource[] = [];

        if (resourceDeclarations instanceof CultureInfo)
        {
            locale = resourceDeclarations;
        }
        else if (!isNullOrUndefined(resourceDeclarations))
        {
            if (typeof resourceDeclarations === "string")
            {
                let directory = Path.dirname(resourceDeclarations);
                let baseName = Path.basename(resourceDeclarations);
                let pattern = new RegExp(`^${baseName}(?:\\.([^.]+))?(?:\\.([^.]+))$`);
                let fileEntries = FileSystem.readdirSync(directory);

                for (let fileEntry of fileEntries)
                {
                    let match = pattern.exec(fileEntry);

                    if (match !== null)
                    {
                        let culture: CultureInfo;
                        let fileName = Path.join(directory, fileEntry);
                        let fileHandlerIndex = this.ResourceFileHandlers.findIndex((handler) => handler.CheckApplicability(fileName));

                        if (fileHandlerIndex >= 0)
                        {
                            let fileHandler = this.ResourceFileHandlers[fileHandlerIndex];

                            if (match[1])
                            {
                                culture = new CultureInfo(match[1]);
                            }
                            else
                            {
                                culture = CultureInfo.InvariantCulture;
                            }

                            resources.push(fileHandler.Create(fileName, culture));
                        }
                    }
                }
            }
            else
            {
                resources = resourceDeclarations;
            }
        }

        this.Locale = locale || CultureInfo.InvariantCulture;
        this.resources = resources;
    }

    /**
     * Gets or sets the locale of the resource-items to resolve.
     */
    public get Locale()
    {
        return this.locale;
    }

    public set Locale(value)
    {
        this.locale = value;
    }

    /**
     * Gets the file-handlers of the resrouce-manager.
     */
    protected get ResourceFileHandlers(): IResourceFileHandler[]
    {
        return [
            new YAMLResourceHandler(),
            new JSONResourceHandler(),
            new JavaScriptResourceHandler()
        ];
    }

    /**
     * Gets the resources of the resource-manager.
     */
    protected get Resources()
    {
        return this.resources;
    }

    /**
     * Gets a resource-item from the a resource with the locale of the resource-manager.
     *
     * @param id
     * The id of the resource-item to get.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified id.
     */
    public Get<T>(id: string, locale?: CultureInfo): T
    {
        locale = locale || this.Locale;
        let result = this.Extract<T>(id, locale);

        if (result.length === 0)
        {
            throw new RangeError(`A resource-item with the specified ID "${id}" does not exist for the culture "${locale}"!`);
        }
        else if (result.length > 1)
        {
            throw new RangeError(`The specified ID "${id}" is not distinguishable for the culture "${locale}"!`);
        }
        else
        {
            return result[0];
        }
    }

    /**
     * Extracts all items with the specified `id` from the resources.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified id.
     */
    protected Extract<T>(id: string, locale: CultureInfo): T[]
    {
        let result: T[] = [];

        for (let resource of this.Resources)
        {
            if (resource.Locale.Name === locale.Name)
            {
                try
                {
                    result.push(resource.Get(id));
                }
                catch
                { }
            }
        }

        if (
            result.length === 0 &&
            locale !== CultureInfo.InvariantCulture)
        {
            return this.Extract(id, locale.Parent);
        }
        else
        {
            return result;
        }
    }
}