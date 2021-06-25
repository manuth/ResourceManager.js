import { CultureInfo } from "@manuth/culture-info";
import { render } from "mustache";
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
     * Initializes a new instance of the {@link MustacheResource `MustacheResource`}.
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
    public get Locale(): CultureInfo
    {
        return this.Resource.Locale;
    }

    /**
     * Gets the resource which contains the resource-items.
     */
    public get Resource(): IResource
    {
        return this.resource;
    }

    /**
     * @inheritdoc
     *
     * @template T
     * The type of the object to get.
     *
     * @param name
     * The {@link name `name`} of the object to get.
     *
     * @returns
     * The value with the specified {@link name `name`}.
     */
    public Get<T>(name: string): T
    {
        let result = this.Resource.Get<T>(name);

        if (typeof result === "string")
        {
            return render(result, new ResourceContext(this)) as any;
        }
        else
        {
            return result;
        }
    }

    /**
     * @inheritdoc
     *
     * @param name
     * The {@link name `name`} that is to be checked for existence.
     *
     * @returns
     * A value indicating whether a resource-element with the specified {@link name `name`} exists.
     */
    public Exists(name: string): boolean
    {
        return this.Resource.Exists(name);
    }
}
