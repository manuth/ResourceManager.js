import { CultureInfo } from "@manuth/culture-info";
import fs from "fs-extra";
import { parse } from "yaml";
import { FileResource } from "./FileResource.js";

const { readFileSync } = fs;

/**
 * Represents a resource which bases on a `.yml`-file.
 */
export class YAMLResource extends FileResource
{
    /**
     * Initializes a new instance of the {@link YAMLResource `YAMLResource`} class.
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
        return parse(readFileSync(this.FileName).toString());
    }
}
