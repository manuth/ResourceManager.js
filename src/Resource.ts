import { CultureInfo } from "culture-info";
import { DuplicateKeyException } from "./DuplicateKeyException";
import { IResource } from "./IResource";
import { KeyNotFoundException } from "./KeyNotFoundException";

/**
 * Represents a resource.
 */
export abstract class Resource implements IResource
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
        this.locale = locale ?? CultureInfo.InvariantCulture;
    }

    /**
     * @inheritdoc
     */
    public get Locale(): CultureInfo
    {
        return this.locale;
    }

    /**
     * Gets the store of the resource.
     */
    protected abstract get ResourceStore(): Record<string, unknown>;

    /**
     * @inheritdoc
     *
     * @param name
     * The `name` of the object to get.
     *
     * @returns
     * The value with the specified `name`.
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
     * @inheritdoc
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

        while (dotIndex >= 0)
        {
            let namePart = name.substr(0, dotIndex);

            if (namePart in resourceStore)
            {
                if (typeof resourceStore[namePart] === "object")
                {
                    result.push(...this.Extract<T>(name.substr(dotIndex + 1), resourceStore[namePart]));
                }
            }

            dotIndex = name.indexOf(".", dotIndex + 1);
        }

        return result;
    }
}
