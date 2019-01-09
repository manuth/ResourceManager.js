import { CultureInfo } from "culture-info";
import Path = require("path");
import { ResourceFileHandler } from "./ResourceFileHandler(T)";
import { YAMLResource } from "./YAMLResource";

/**
 * Provides the functionality to handle json-files with comments.
 */
export class YAMLResourceHandler extends ResourceFileHandler<YAMLResource>
{
    /**
     * Initializes a new instance of the `YAMLResourceHandler` class.
     */
    public constructor()
    {
        super();
    }

    public CheckApplicability(fileName: string): boolean
    {
        return /^\.ya?ml$/.test(Path.parse(fileName).ext);
    }

    public Create(fileName: string, locale?: CultureInfo): YAMLResource
    {
        return new YAMLResource(fileName, locale);
    }
}