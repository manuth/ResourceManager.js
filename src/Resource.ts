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
    public constructor(locale?: CultureInfo)
    {
        this.locale = locale || CultureInfo.InvariantCulture;
    }

    /**
     * Gets or sets the locale of the resource.
     */
    public get Locale()
    {
        return this.locale;
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
        let result = this.Extract<T>(id, this.ResourceStore);

        if (result.length === 0)
        {
            throw new RangeError(`A resource-item with the specified ID "${id}" does not exist!`);
        }
        else if (result.length > 1)
        {
            throw new RangeError(`The specified ID "${id}" is not distinguishable!`);
        }
        else
        {
            return result[0];
        }
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

    /**
     * Extracts all items with the specified `id` from the `resourceStore`.
     *
     * @param id
     * The id to look for.
     *
     * @param resourceStore
     * The resource-store to browse.
     *
     * @returns
     * All resource-items with the specified id.
     */
    protected Extract<T>(id: string, resourceStore: any): T[]
    {
        let result: T[] = [];
        let dotIndex = id.indexOf(".");

        if (id in resourceStore)
        {
            result.push(resourceStore[id]);
        }

        if (dotIndex >= 0)
        {
            let idPart = id.substr(0, dotIndex);

            if (idPart in resourceStore)
            {
                result.push(...this.Extract<T>(id.substr(dotIndex + 1), resourceStore[idPart]));
            }
        }

        return result;
    }
}