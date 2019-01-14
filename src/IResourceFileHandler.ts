import { CultureInfo } from "culture-info";
import { FileResource } from "./FileResource";

/**
 * Represents a component for handling resource-files.
 */
export interface IResourceFileHandler
{
    /**
     * Checks whether the file is supported.
     *
     * @param fileName
     * The name of the file to check.
     *
     * @returns
     * A value indicating whether the file is supported.
     */
    CheckApplicability(fileName: string): boolean;

    /**
     * Creates a resource based on a file.
     *
     * @param fileName
     * The name of the file to create a resource for.
     *
     * @param locale
     * The locale of the resource.
     *
     * @returns
     * The resource for the specified file.
     */
    Create(fileName: string, locale?: CultureInfo): FileResource;
}