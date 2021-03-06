import { CultureInfo } from "@manuth/culture-info";
import { parse } from "comment-json";
import { readFileSync } from "fs-extra";
import { FileResource } from "./FileResource";

/**
 * Represents a resource which bases on a `.json`-file with comments.
 */
export class JSONResource extends FileResource
{
    /**
     * Initializes a new instance of the {@link JSONResource `JSONResource`} class.
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
        return parse(readFileSync(this.FileName).toString(), null, true);
    }
}
