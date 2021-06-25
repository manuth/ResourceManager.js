import { parse } from "path";
import { CultureInfo } from "@manuth/culture-info";
import { ResourceFileHandler } from "./ResourceFileHandler";
import { YAMLResource } from "./YAMLResource";

/**
 * Provides the functionality to handle yaml-files with comments.
 */
export class YAMLResourceHandler extends ResourceFileHandler<YAMLResource>
{
    /**
     * Initializes a new instance of the {@link YAMLResourceHandler `YAMLResourceHandler`} class.
     */
    public constructor()
    {
        super();
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
    public CheckApplicability(fileName: string): boolean
    {
        return /^\.ya?ml$/.test(parse(fileName.toLowerCase()).ext);
    }

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
    public Create(fileName: string, locale?: CultureInfo): YAMLResource
    {
        return new YAMLResource(fileName, locale);
    }
}
