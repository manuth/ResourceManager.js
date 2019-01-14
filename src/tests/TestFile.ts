import Case = require("case");
import { CultureInfo } from "culture-info";
import { TempDirectory } from "temp-filesystem";

/**
 * Represents a test-file.
 */
export class TestFile
{
    /**
     * The base-name of the file.
     */
    private baseFileName: string;

    /**
     * The locale of the file.
     */
    private locale: CultureInfo;

    /**
     * The extension of the file.
     */
    private extension: string;

    /**
     * Initializes a new instance of the `TestFile` class.
     *
     * @param baseFileName
     * The base-name of the file.
     *
     * @param locale
     * The locale of the file.
     *
     * @param extension
     * The extension of the file.
     */
    public constructor(baseFileName: string, locale: CultureInfo, extension: string)
    {
        this.baseFileName = baseFileName;
        this.locale = locale || CultureInfo.InvariantCulture;
        this.extension = extension;
    }

    /**
     * Gets the locale of the file.
     */
    public get Locale()
    {
        return this.locale;
    }

    /**
     * Gets the name of the file.
     */
    public get FileName()
    {
        let extension = `${this.extension}`;

        if (this.locale !== CultureInfo.InvariantCulture)
        {
            extension = `${this.locale}.${extension}`;
        }

        return `${this.baseFileName}.${Case.random(extension)}`;
    }
}