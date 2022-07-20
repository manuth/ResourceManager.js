import { CultureInfo } from "@manuth/culture-info";
import { ResourceBase } from "./ResourceBase.js";

/**
 * Provides an implementation of the {@link ResourceBase `ResourceBase`} which loads resources from an object.
 */
export class Resource extends ResourceBase
{
    /**
     * The store of the resource.
     */
    private resource: Record<string, unknown>;

    /**
     * Initializes a new instance of the {@link Resource `Resource`} class.
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
