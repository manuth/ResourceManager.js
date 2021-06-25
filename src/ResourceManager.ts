import { basename, dirname, join } from "path";
import { CultureInfo } from "@manuth/culture-info";
import { readdirSync } from "fs-extra";
import { DuplicateKeyException } from "./DuplicateKeyException";
import { IResource } from "./IResource";
import { IResourceFileHandler } from "./IResourceFileHandler";
import { IResourceManager } from "./IResourceManager";
import { JavaScriptResourceHandler } from "./JavaScriptResourceHandler";
import { JSONResourceHandler } from "./JSONResourceHandler";
import { KeyNotFoundException } from "./KeyNotFoundException";
import { YAMLResourceHandler } from "./YAMLResourceHandler";

/**
 * Provides the functionality to manage localized resources.
 */
export class ResourceManager implements IResourceManager
{
    /**
     * The locale of the resource-items to resolve.
     */
    private locale: CultureInfo;

    /**
     * The resources of the resource-manager.
     */
    private resources: IResource[];

    /**
     * Initializes a new instance of the {@link ResourceManager `ResourceManager`} class.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(locale: CultureInfo);

    /**
     * Initializes a new instance of the {@link ResourceManager `ResourceManager`} class.
     *
     * @param baseFileName
     * The base-filename of the resource-manager.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(baseFileName: string, locale?: CultureInfo);

    /**
     * Initializes a new instance of the {@link ResourceManager `ResourceManager`} class.
     *
     * @param resources
     * The resources managed by the resource-manager.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(resources?: IResource[], locale?: CultureInfo);

    /**
     * Initializes a new instance of the {@link ResourceManager `ResourceManager`} class.
     *
     * @param resourceDeclarations
     * The resources or the locale.
     *
     * @param locale
     * The locale of the resource-items to resolve.
     */
    public constructor(resourceDeclarations: CultureInfo | string | IResource[] = null, locale?: CultureInfo)
    {
        let resources: IResource[] = [];

        if (resourceDeclarations instanceof CultureInfo)
        {
            locale = resourceDeclarations;
        }
        else if (resourceDeclarations)
        {
            if (typeof resourceDeclarations === "string")
            {
                let directory = dirname(resourceDeclarations);
                let baseName = basename(resourceDeclarations);
                let pattern = new RegExp(`^${baseName}(?:\\.([^.]+))?(?:\\.([^.]+))$`);
                let fileEntries = readdirSync(directory);

                for (let fileEntry of fileEntries)
                {
                    let match = pattern.exec(fileEntry);

                    if (match !== null)
                    {
                        let culture: CultureInfo;
                        let fileName = join(directory, fileEntry);
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

        this.Locale = locale;
        this.resources = resources;
    }

    /**
     * @inheritdoc
     */
    public get Locale(): CultureInfo
    {
        return this.locale;
    }

    /**
     * @inheritdoc
     */
    public set Locale(value)
    {
        this.locale = value || CultureInfo.InvariantCulture;
    }

    /**
     * Gets the file-handlers of the resource-manager.
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
    protected get Resources(): IResource[]
    {
        return this.resources;
    }

    /**
     * @inheritdoc
     *
     * @template T
     * The type of the resource-item to get.
     *
     * @param name
     * The {@link name `name`} of the resource-item to get.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified {@link name `name`}.
     */
    public Get<T>(name: string, locale?: CultureInfo): T
    {
        locale = locale || this.Locale;
        return this.Extract(name, locale);
    }

    /**
     * Extracts all items with the specified {@link name `name`} from the resources.
     *
     * @template T
     * The type of the resource-item to get.
     *
     * @param name
     * The {@link name `name`} of the resource-item to get.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified {@link name `name`}.
     */
    protected Extract<T>(name: string, locale: CultureInfo): T
    {
        let result: T[] = [];
        let keyNotFoundException = new KeyNotFoundException(`A resource-item with the specified ID "${name}" does not exist for the ${locale === CultureInfo.InvariantCulture ? "invariant culture" : `culture "${locale}"`}!`);
        let duplicateException = new DuplicateKeyException(`The specified ID "${name}" is not distinguishable for the ${locale === CultureInfo.InvariantCulture ? "invariant culture" : `culture "${locale}"`}!`);

        try
        {
            for (let resource of this.Resources)
            {
                if (resource.Locale.Name === locale.Name)
                {
                    try
                    {
                        result.push(resource.Get(name));
                    }
                    catch (exception)
                    {
                        if (exception instanceof DuplicateKeyException)
                        {
                            throw exception;
                        }
                    }
                }
            }
        }
        catch (exception)
        {
            if (exception instanceof DuplicateKeyException)
            {
                throw duplicateException;
            }
            else
            {
                throw exception;
            }
        }

        if (result.length === 0)
        {
            if (locale === CultureInfo.InvariantCulture)
            {
                throw keyNotFoundException;
            }
            else
            {
                try
                {
                    return this.Extract(name, locale.Parent);
                }
                catch (exception)
                {
                    if (exception instanceof KeyNotFoundException)
                    {
                        throw keyNotFoundException;
                    }
                    else
                    {
                        throw exception;
                    }
                }
            }
        }
        else if (result.length > 1)
        {
            throw duplicateException;
        }
        else
        {
            return result[0];
        }
    }
}
