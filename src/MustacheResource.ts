import Mustache = require("mustache");
import { IResource } from "./IResource";
import { ResourceContext } from "./ResourceContext";

/**
 * Represents a resource which provides the functionality to interpret mustache-templates in resource-items.
 */
export class MustacheResource implements IResource
{
    /**
     * The resource which contains the resource-items.
     */
    private resource: IResource;

    /**
     * Initializes a new instance of the `MustacheResource`.
     *
     * @param resource
     * The resource which contains the resource-items.
     */
    public constructor(resource: IResource)
    {
        this.resource = resource;
    }

    /**
     * @inheritdoc
     */
    public get Locale()
    {
        return this.Resource.Locale;
    }

    /**
     * Gets the resource which contains the resource-items.
     */
    public get Resource()
    {
        return this.resource;
    }

    /**
     * @inheritdoc
     */
    public Get<T>(name: string): T
    {
        let result = this.Resource.Get<T>(name);

        if (typeof result === "string")
        {
            return Mustache.render(result, new ResourceContext(this)) as any;
        }
        else
        {
            return result;
        }
    }

    /**
     * @inheritdoc
     */
    public Exists(name: string): boolean
    {
        return this.Resource.Exists(name);
    }
}