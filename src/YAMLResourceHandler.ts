import { CultureInfo } from "culture-info";
import Path = require("path");
import { ResourceFileHandler } from "./ResourceFileHandler(T)";
import { YAMLResource } from "./YAMLResource";

/**
 * Provides the functionality to handle yaml-files with comments.
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

    /**
     * @inheritdoc
     */
    public CheckApplicability(fileName: string): boolean
    {
        return /^\.ya?ml$/.test(Path.parse(fileName.toLowerCase()).ext);
    }

    /**
     * @inheritdoc
     */
    public Create(fileName: string, locale?: CultureInfo): YAMLResource
    {
        return new YAMLResource(fileName, locale);
    }
}