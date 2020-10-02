import { CultureInfo } from "culture-info";

/**
 * Represents a resource.
 */
export interface IResource
{
    /**
     * Gets or sets the locale of the resource.
     */
    readonly Locale: CultureInfo;

    /**
     * Gets an object of the resource-store.
     *
     * @param name
     * The `name` of the object to get.
     *
     * @returns
     * The value with the specified `name`.
     */
    Get<T>(name: string): T;

    /**
     * Checks whether a resource-element with the specified `name` exists.
     *
     * @param name
     * The `name` that is to be checked for existence.
     *
     * @returns
     * A value indicating whether a resource-element with the specified `name` exists.
     */
    Exists(name: string): boolean;
}
