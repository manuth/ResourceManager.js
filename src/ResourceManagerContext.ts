import { CultureInfo } from "culture-info";
import { Context } from "mustache";
import { ResourceManager } from "./ResourceManager";

/**
 * Provides the functionality to resolve resource-items from a resource-manager.
 */
export class ResourceManagerContext extends Context
{
    /**
     * The resource-manager of the context.
     */
    private resourceManager: ResourceManager;

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
    public constructor(resourceManager: ResourceManager, locale?: CultureInfo, view?: any)
    {
        super(view);
        this.resourceManager = resourceManager;
        this.locale = locale;
    }

    /**
     * Gets the resource-manager of the context.
     */
    public get ResourceManager(): ResourceManager
    {
        return this.resourceManager;
    }

    /**
     * Gets sets the locale of the resource-items to get.
     */
    public get Locale(): CultureInfo
    {
        return this.locale;
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