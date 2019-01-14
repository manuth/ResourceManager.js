import { CultureInfo } from "culture-info";
import { FileResource } from "./FileResource";
import { IResourceFileHandler } from "./IResourceFileHandler";

/**
 * Provides the functionality to handle a specific type of resource-file.
 */
export abstract class ResourceFileHandler<T extends FileResource> implements IResourceFileHandler
{
    /**
     * Initializes a new instance of the `ResourceFileHandler` class.
     */
    public constructor()
    {
    }

    public abstract CheckApplicability(fileName: string): boolean;

    public abstract Create(fileName: string, locale?: CultureInfo): T;
}