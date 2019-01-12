import { CultureInfo } from "culture-info";
import { Context } from "mustache";
import { ResourceManager } from "./ResourceManager";

/**
 * Provides the functionality to resolve resource-items.
 */
export class ResourceContext extends Context
{
    /**
     * The resource of the context.
     */
    private resource: ResourceManager;

    /**
     * The locale of the resource-items to get.
     */
    private locale: CultureInfo;

    /**
     * Initializes a new instance of the `ResourceContext` class.
     *
     * @param resource
     * The resource to get the lookup-values from.
     *
     * @param locale
     * The locale of the resource-items to get.
     *
     * @param view
     * The parent view of the context.
     */
    public constructor(resource: ResourceManager, locale?: CultureInfo, view?: any)
    {
        super(view);
        this.resource = resource;
        this.locale = locale;
    }

    /**
     * Gets the resource of the context.
     */
    public get Resource(): ResourceManager
    {
        return this.resource;
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
        return this.Resource.Get(name, this.Locale);
    }
}