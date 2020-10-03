import { CultureInfo } from "@manuth/culture-info";
import { Resource } from "./Resource";

/**
 * Provides an implementation of the `Resource` which loads resources from an object.
 */
export class ObjectResource extends Resource
{
    /**
     * The store of the resource.
     */
    private resource: Record<string, unknown>;

    /**
     * Initializes a new instance of the `Resource` class.
     *
     * @param resource
     * The store of the resource.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(resource: Record<string, unknown>, locale?: CultureInfo)
    {
        super(locale);
        this.resource = resource;
    }

    /**
     * @inheritdoc
     */
    protected get ResourceStore(): Record<string, unknown>
    {
        return this.resource;
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
}
