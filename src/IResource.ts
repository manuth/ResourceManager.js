import { CultureInfo } from "@manuth/culture-info";

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
     * The {@link name `name`} of the object to get.
     *
     * @returns
     * The value with the specified {@link name `name`}.
     */
    Get<T>(name: string): T;

    /**
     * Checks whether a resource-element with the specified {@link name `name`} exists.
     *
     * @param name
     * The {@link name `name`} that is to be checked for existence.
     *
     * @returns
     * A value indicating whether a resource-element with the specified {@link name `name`} exists.
     */
    Exists(name: string): boolean;
}
