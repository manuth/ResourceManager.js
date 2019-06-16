import { CultureInfo } from "culture-info";
import Path = require("path");
import { JavaScriptResource } from "./JavaScriptResource";
import { ResourceFileHandler } from "./ResourceFileHandler(T)";

/**
 * Provides the functionality to handle ECMAScript-files with comments.
 */
export class JavaScriptResourceHandler extends ResourceFileHandler<JavaScriptResource>
{
    /**
     * Initializes a new instance of the `JavaScriptResourceHandler` class.
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
        return Path.parse(fileName.toLowerCase()).ext === ".js";
    }

    /**
     * @inheritdoc
     */
    public Create(fileName: string, locale?: CultureInfo): JavaScriptResource
    {
        return new JavaScriptResource(fileName, locale);
    }
}