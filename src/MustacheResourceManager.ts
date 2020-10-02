import { CultureInfo } from "culture-info";
import { render } from "mustache";
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
     *
     * @param locale
     * The locale of the resources to resolve.
     */
    public constructor(resourceManager: IResourceManager, locale?: CultureInfo)
    {
        this.resourceManager = resourceManager;

        if (locale)
        {
            this.Locale = locale;
        }
    }

    /**
     * @inheritdoc
     */
    public get Locale(): CultureInfo
    {
        return this.ResourceManager.Locale;
    }

    /**
     * @inheritdoc
     */
    public set Locale(value: CultureInfo)
    {
        this.ResourceManager.Locale = value;
    }

    /**
     * Gets the resource-manager which serves the resource-items.
     */
    public get ResourceManager(): IResourceManager
    {
        return this.resourceManager;
    }

    /**
     * @inheritdoc
     *
     * @param name
     * The `name` of the resource-item to get.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified `name`.
     */
    public Get<T>(name: string, locale?: CultureInfo): T
    {
        let result = this.ResourceManager.Get<T>(name, locale);

        if (typeof result === "string")
        {
            return render(result, new ResourceManagerContext(this, locale)) as any;
        }
        else
        {
            return result;
        }
    }
}
