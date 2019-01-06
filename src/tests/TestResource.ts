import { Resource } from "../Resource";

/**
 * Provides an implementation of the `Resource` class for testing.
 */
export class TestResource extends Resource
{
    protected ResourceStore: any;

    /**
     * Gets or sets the resource-store of the resource.
     */
    public get Resource()
    {
        return this.ResourceStore;
    }

    public set Resource(value)
    {
        this.ResourceStore = value;
    }
}