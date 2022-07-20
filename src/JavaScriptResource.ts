import { createRequire } from "module";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { CultureInfo } from "@manuth/culture-info";
import { FileResource } from "./FileResource.js";

/**
 * Represents a resource which bases on a `.js`-file.
 */
export class JavaScriptResource extends FileResource
{
    /**
     * Initializes a new instance of the {@link JavaScriptResource `JavaScriptResource`} class.
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
        return createRequire(fileURLToPath(new URL(".", import.meta.url)))(resolve(this.FileName));
    }
}
