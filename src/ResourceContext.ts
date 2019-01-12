import { Context } from "mustache";
import { IResource } from "./IResource";

/**
 * Provides the functionality to resolve resource-items.
 */
export class ResourceContext extends Context
{
    /**
     * The resource of the context.
     */
    private resource: IResource;

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
    public constructor(resource: IResource, view?: any)
    {
        super(view);
        this.resource = resource;
    }

    /**
     * Gets the resource of the context.
     */
    public get Resource(): IResource
    {
        return this.resource;
    }

    /**
     * Returns the value of the given name in this context, traversing up the context hierarchy if the value is absent in this context's view.
     *
     * @param name
     * The name to look up.
     */
    public lookup(name: string): any
    {
        return this.Resource.Get(name);
    }
}