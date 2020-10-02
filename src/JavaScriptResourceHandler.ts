import { parse } from "path";
import { CultureInfo } from "culture-info";
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
