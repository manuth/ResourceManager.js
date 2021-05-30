import { createRequire } from "module";
import { resolve } from "path";
import { CultureInfo } from "@manuth/culture-info";
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

    /**
     * @inheritdoc
     *
     * @returns
     * The loaded resource.
     */
    protected Load(): Record<string, unknown>
    {
        return createRequire(__dirname)(resolve(this.FileName));
    }
}
