import { parse } from "node:path";
import { CultureInfo } from "@manuth/culture-info";
import { JSONResource } from "./JSONResource.js";
import { ResourceFileHandler } from "./ResourceFileHandler.js";

/**
 * Provides the functionality to handle json-files with comments.
 */
export class JSONResourceHandler extends ResourceFileHandler<JSONResource>
{
    /**
     * Initializes a new instance of the {@link JSONResourceHandler `JSONResourceHandler`} class.
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
        return /^\.jsonc?$/.test(parse(fileName.toLowerCase()).ext);
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
    public Create(fileName: string, locale?: CultureInfo): JSONResource
    {
        return new JSONResource(fileName, locale);
    }
}
