import { FileResource } from "../FileResource";

/**
 * Provides an implementation of the `FileResource` class for testing.
 */
export class TestFileResource extends FileResource
{
    /**
     * The resource-items of the resource.
     */
    private resource: Record<string, unknown>;

    /**
     * Initializes a new instance of the `TestFileResource` class.
     */
    public constructor()
    {
        super(null);
    }

    /**
     * Gets or sets the resource-store of the resource.
     */
    public get Resource(): Record<string, unknown>
    {
        return this.resource;
    }

    /**
     * @inheritdoc
     */
    public set Resource(value)
    {
        this.resource = value;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The loaded resource.
     */
    protected Load(): Record<string, unknown>
    {
        return {
            ...this.Resource
        };
    }
}
