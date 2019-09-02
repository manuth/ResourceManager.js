import { CultureInfo } from "culture-info";
import { Resource } from "./Resource";

/**
 * Provides an implementation of the `Resource` which loads resources from an object.
 */
export class ObjectResource extends Resource
{
    /**
     * The store of the resource.
     */
    private resource: any;

    /**
     * Initializes a new instance of the `Resource` class.
     *
     * @param resource
     * The store of the resource.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(resource: any, locale?: CultureInfo)
    {
        super(locale);
        this.resource = resource;
    }

    /**
     * @inheritdoc
     */
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