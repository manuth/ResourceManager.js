import { FileResource } from "../FileResource";

/**
 * Provides an implementation of the `FileResource` class for testing.
 */
export class TestFileResource extends FileResource
{
    /**
     * The resource-items of the resource.
     */
    private resource: any;

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
    public get Resource()
    {
        return this.resource;
    }

    public set Resource(value)
    {
        this.resource = value;
    }

    /**
     * @inheritdoc
     */
    protected Load()
    {
        return {
            ...this.Resource
        };
    }
}