import { CultureInfo } from "culture-info";

/**
 * Represents a resource.
 */
export abstract class Resource
{
    /**
     * The locale of the resource.
     */
    private locale: CultureInfo;

    /**
     * Initializes a new instance of the `Resource` class.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(locale: CultureInfo)
    {
        this.locale = locale;
    }

    /**
     * Gets or sets the locale of the resource.
     */
    public get Locale()
    {
        return this.locale;
    }

    public set Locale(value)
    {
        this.locale = value;
    }

    /**
     * Gets the store of the resource.
     */
    protected abstract get ResourceStore(): any;

    /**
     * Gets an object of the resource-store.
     *
     * @param id
     * The id of the object to get.
     */
    public Get<T>(id: string): T
    {
        let relativeID = id;
        let idParts = id.split(".");
        let resourceStore = this.ResourceStore;

        for (let idPart of idParts)
        {
            if (relativeID in resourceStore)
            {
                return resourceStore[relativeID] as T;
            }
            else if (idPart in resourceStore)
            {
                resourceStore = resourceStore[idPart];
                relativeID = relativeID.substr(idPart.length).replace(/^\./, "");
            }
            else
            {
                throw new RangeError(`An object with the id "${id}" doesn't exist!`);
            }
        }

        return resourceStore as T;
    }

    /**
     * Checks whether a resource-element with the specified `id` exists.
     *
     * @param id
     * The id that is to be checked for existence.
     *
     * @returns
     * A value indicating whether a resource-element with the specified `id` exists.
     */
    public Exists(id: string): boolean
    {
        try
        {
            this.Get(id);
            return true;
        }
        catch
        {
            return false;
        }
    }
}