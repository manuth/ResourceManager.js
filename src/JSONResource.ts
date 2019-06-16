import JSON = require("comment-json");
import { CultureInfo } from "culture-info";
import FileSystem = require("fs-extra");
import { FileResource } from "./FileResource";

/**
 * Represents a resource which bases on a `.json`-file.
 */
export class JSONResource extends FileResource
{
    /**
     * Initializes a new instance of the `JSONResource` class.
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

    /**
     * @inheritdoc
     */
    protected Load()
    {
        return JSON.parse(FileSystem.readFileSync(this.FileName).toString(), null, true);
    }
}