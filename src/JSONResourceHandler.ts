import { CultureInfo } from "culture-info";
import Path = require("path");
import { JSONResource } from "./JSONResource";
import { ResourceFileHandler } from "./ResourceFileHandler(T)";

/**
 * Provides the functionality to handle json-files with comments.
 */
export class JSONResourceHandler extends ResourceFileHandler<JSONResource>
{
    /**
     * Initializes a new instance of the `JSONResourceHandler` class.
     */
    public constructor()
    {
        super();
    }

    public CheckApplicability(fileName: string): boolean
    {
        return /^\.jsonc?$/.test(Path.parse(fileName).ext);
    }

    public Create(fileName: string, locale?: CultureInfo): JSONResource
    {
        return new JSONResource(fileName, locale);
    }
}