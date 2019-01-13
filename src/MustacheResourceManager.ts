import { CultureInfo } from "culture-info";
import Mustache = require("mustache");
import { IResourceManager } from "./IResourceManager";
import { ResourceManagerContext } from "./ResourceManagerContext";

/**
 * Represents a resource-manager which provides the functionality to interpret mustache-templates in resource-items.
 */
export class MustacheResourceManager implements IResourceManager
{
    /**
     * The resource-manager which serves the resource-items.
     */
    private resourceManager: IResourceManager;

    /**
     * Initializes a new instance of the `MustacheResourceManager` class.
     *
     * @param resourceManager
     * The resource-manager which serves the resource-items.
     */
    public constructor(resourceManager: IResourceManager, locale?: CultureInfo)
    {
        this.resourceManager = resourceManager;
        this.Locale = locale;
    }

    public get Locale()
    {
        return this.ResourceManager.Locale;
    }

    public set Locale(value)
    {
        this.ResourceManager.Locale = value;
    }

    /**
     * Gets the resource-manager which serves the resource-items.
     */
    public get ResourceManager()
    {
        return this.resourceManager;
    }

    public Get<T>(name: string, locale?: CultureInfo): T
    {
        let result = this.ResourceManager.Get<T>(name, locale);

        if (typeof result === "string")
        {
            return Mustache.render(result, new ResourceManagerContext(this, locale)) as any;
        }
        else
        {
            return result;
        }
    }
}