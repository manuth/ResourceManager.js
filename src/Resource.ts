import { CultureInfo } from "culture-info";
import { DuplicateKeyException } from "./DuplicateKeyException";
import { KeyNotFoundException } from "./KeyNotFoundException";

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
     * @param name
     * The `name` of the object to get.
     */
    public Get<T>(name: string): T
    {
        let result = this.Extract<T>(name, this.ResourceStore);

        if (result.length === 0)
        {
            throw new KeyNotFoundException(`A resource-item with the specified ID "${name}" does not exist!`);
        }
        else if (result.length > 1)
        {
            throw new DuplicateKeyException(`The specified ID "${name}" is not distinguishable!`);
        }
        else
        {
            return result[0];
        }
    }

    /**
     * Checks whether a resource-element with the specified `name` exists.
     *
     * @param name
     * The `name` that is to be checked for existence.
     *
     * @returns
     * A value indicating whether a resource-element with the specified `name` exists.
     */
    public Exists(name: string): boolean
    {
        return this.Extract(name, this.ResourceStore).length > 0;
    }

    /**
     * Extracts all items with the specified `name` from the `resourceStore`.
     *
     * @param name
     * The `name` to look for.
     *
     * @param resourceStore
     * The resource-store to browse.
     *
     * @returns
     * All resource-items with the specified `name`.
     */
    protected Extract<T>(name: string, resourceStore: any): T[]
    {
        let result: T[] = [];
        let dotIndex = name.indexOf(".");

        if (name in resourceStore)
        {
            result.push(resourceStore[name]);
        }

        if (dotIndex >= 0)
        {
            let namePart = name.substr(0, dotIndex);

            if (namePart in resourceStore)
            {
                result.push(...this.Extract<T>(name.substr(dotIndex + 1), resourceStore[namePart]));
            }
        }

        return result;
    }
}