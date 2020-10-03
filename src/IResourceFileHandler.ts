import { CultureInfo } from "@manuth/culture-info";
import { FileResource } from "./FileResource";

/**
 * Represents a component for handling resource-files.
 */
export interface IResourceFileHandler
{
    /**
     * Checks whether the specified file is applicable to this resource-handler.
     *
     * @param fileName
     * The name of the file to check.
     *
     * @returns
     * A value indicating whether the file is applicable to the resource-handler.
     */
    CheckApplicability(fileName: string): boolean;

    /**
     * Creates a new resource from the specified file.
     *
     * @param fileName
     * The name of the file to load.
     *
     * @param locale
     * The locale of the resource to create.
     *
     * @returns
     * The newly created resource.
     */
    Create(fileName: string, locale?: CultureInfo): FileResource;
}
