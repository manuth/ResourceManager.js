import { CultureInfo } from "culture-info";
import FileSystem = require("fs-extra");
import YAML = require("yaml");
import { FileResource } from "./FileResource";

/**
 * Represents a resource which bases on a `.yml`-file.
 */
export class YAMLResource extends FileResource
{
    /**
     * Initializes a new instance of the `YAMLResource` class.
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
        return YAML.parse(FileSystem.readFileSync(this.FileName).toString());
    }
}