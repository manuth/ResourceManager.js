import { CultureInfo } from "culture-info";
import Path = require("path");
import { FileResource } from "./FileResource";

/**
 * Represents a resource which bases on a `.js`-file.
 */
export class JavaScriptResource extends FileResource
{
    /**
     * Initializes a new instance of the `JavaScriptResource` class.
     *
     * @param fileName
     * The path to the resource-file.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(fileName: string, locale?: CultureInfo)
    {
        super(fileName, locale);
    }

    protected Load()
    {
        return require(Path.resolve(this.FileName));
    }
}