import { parse } from "node:path";
import { CultureInfo } from "@manuth/culture-info";
import { JavaScriptResource } from "./JavaScriptResource.js";
import { ResourceFileHandler } from "./ResourceFileHandler.js";

/**
 * Provides the functionality to handle ECMAScript-files.
 */
export class JavaScriptResourceHandler extends ResourceFileHandler<JavaScriptResource>
{
    /**
     * Initializes a new instance of the {@link JavaScriptResourceHandler `JavaScriptResourceHandler`} class.
     */
    public constructor()
    {
        super();
    }

    /**
     * @inheritdoc
     *
     * @param fileName
     * The name of the file to check.
     *
     * @returns
     * A value indicating whether the file is applicable to the resource-handler.
     */
    public CheckApplicability(fileName: string): boolean
    {
        return parse(fileName.toLowerCase()).ext === ".js";
    }

    /**
     * @inheritdoc
     *
     * @param fileName
     * The name of the file to load.
     *
     * @param locale
     * The locale of the resource to create.
     *
     * @returns
     * The newly created resource.
     */
    public Create(fileName: string, locale?: CultureInfo): JavaScriptResource
    {
        return new JavaScriptResource(fileName, locale);
    }
}
