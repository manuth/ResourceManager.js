import { Resource } from "../Resource";

/**
 * Provides an implementation of the `Resource` class for testing.
 */
export class TestResource extends Resource
{
    /**
     * The store of the resource.
     */
    private resource: any;

    protected get ResourceStore()
    {
        return this.resource;
    }

    /**
     * Gets or sets the resource-store of the resource.
     */
    public get Resource()
    {
        return this.resource;
    }

    public set Resource(value)
    {
        this.resource = value;
    }
}