import { CultureInfo } from "@manuth/culture-info";
import { FileResource } from "./FileResource";
import { IResourceFileHandler } from "./IResourceFileHandler";

/**
 * Provides the functionality to handle a specific type of resource-file.
 */
export abstract class ResourceFileHandler<T extends FileResource> implements IResourceFileHandler
{
    /**
     * Initializes a new instance of the {@link `ResourceFileHandler<T>`} class.
     */
    public constructor()
    {
    }

    /**
     * @inheritdoc
     *
     * @param fileName
     * The name of the file to check.
     *
     * @returns
     * A value indicating whether the file is applicable to the resource-handler.
     */
    public abstract CheckApplicability(fileName: string): boolean;

    /**
     * @inheritdoc
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
    public abstract Create(fileName: string, locale?: CultureInfo): T;
}
