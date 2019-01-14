import { CultureInfo } from "culture-info";
import { Resource } from "./Resource";

/**
 * Represents a resource which bases on a file.
 */
export abstract class FileResource extends Resource
{
    /**
     * The path to the resource-file.
     */
    private fileName: string;

    /**
     * A value indicating whether the resource is cached.
     */
    private cached = false;

    /**
     * The cache of the resource.
     */
    private cache: any;

    /**
     * Initializes a new instance of the `FileResource` class.
     *
     * @param fileName
     * The path to the resource-file.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(fileName: string, locale?: CultureInfo)
    {
        super(locale);
        this.fileName = fileName;
    }

    /**
     * Gets the path to the resource-file
     */
    public get FileName()
    {
        return this.fileName;
    }

    /**
     * Gets or sets a value indicating whether the resource is cached.
     */
    public get Cached()
    {
        return this.cached;
    }

    public set Cached(value)
    {
        this.cached = value;
        this.Refresh();
    }

    /**
     * Gets or sets the cache of the resource.
     */
    protected get Cache(): any
    {
        return this.cache;
    }

    protected set Cache(value)
    {
        this.cache = value;
    }

    protected get ResourceStore(): any
    {
        if (this.Cached)
        {
            return this.Cache;
        }
        else
        {
            return this.Load();
        }
    }

    /**
     * Forces the cache to refresh.
     */
    public Refresh(): void
    {
        if (this.Cached)
        {
            this.cache = this.Load();
        }
        else
        {
            this.cache = null;
        }
    }

    /**
     * Loads the resource from the file.
     */
    protected abstract Load(): any;
}