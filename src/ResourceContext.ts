import Mustache from "mustache";
import { IResource } from "./IResource.js";

/**
 * Provides the functionality to resolve resource-items.
 */
export class ResourceContext extends Mustache.Context
{
    /**
     * The resource of the context.
     */
    private resource: IResource;

    /**
     * Initializes a new instance of the {@link ResourceContext `ResourceContext`} class.
     *
     * @param resource
     * The resource to get the lookup-values from.
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
     * @inheritdoc
     *
     * @param name
     * The name to look up.
     *
     * @returns
     * The value of the resource with the specified {@link name `name`}.
     */
    public override lookup(name: string): unknown
    {
        return this.Resource.Get(name);
    }
}
