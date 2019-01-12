import { CultureInfo } from "culture-info";

/**
 * Represents a manager for localized resources.
 */
export interface IResourceManager
{
    /**
     * Gets or sets the locale of the resource-items to resolve.
     */
    Locale: CultureInfo;

    /**
     * Gets a resource-item from the a resource with the locale of the resource-manager.
     *
     * @param name
     * The `name` of the resource-item to get.
     *
     * @param locale
     * The locale of the resource-item to get.
     *
     * @returns
     * The resource-item with the specified `name`.
     */
    Get<T>(name: string, locale?: CultureInfo): T;
}