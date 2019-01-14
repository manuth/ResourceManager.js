import { CultureInfo } from "culture-info";
import { Context } from "mustache";
import { IResourceManager } from "./IResourceManager";

/**
 * Provides the functionality to resolve resource-items from a resource-manager.
 */
export class ResourceManagerContext extends Context
{
    /**
     * The resource-manager of the context.
     */
    private resourceManager: IResourceManager;

    /**
     * The locale of the resource-items to get.
     */
    private locale: CultureInfo;

    /**
     * Initializes a new instance of the `ResourceManagerContext` class.
     *
     * @param resourceManager
     * The resource-manager to get the lookup-values from.
     *
     * @param locale
     * The locale of the resource-items to get.
     *
     * @param view
     * The parent view of the context.
     */
    public constructor(resourceManager: IResourceManager, locale?: CultureInfo, view?: any)
    {
        super(view);
        this.resourceManager = resourceManager;
        this.locale = locale;
    }

    /**
     * Gets the resource-manager of the context.
     */
    public get ResourceManager(): IResourceManager
    {
        return this.resourceManager;
    }

    /**
     * Gets or sets the locale of the resource-items to get.
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
     * Returns the value of the given name in this context, traversing up the context hierarchy if the value is absent in this context's view.
     *
     * @param name
     * The name to look up.
     */
    public lookup(name: string): any
    {
        return this.ResourceManager.Get(name, this.Locale);
    }
}