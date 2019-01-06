import { CultureInfo } from "culture-info";
import { Resource } from "./Resource";

/**
 * Represents a resource which bases on a file.
 */
export abstract class FileResource extends Resource
{
    /**
     * A value indicating whether the resource is cached.
     */
    private cached = false;

    /**
     * A value indicating whether the cache should be refreshed.
     */
    private refreshPending = true;

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
    public constructor(fileName: string, locale: CultureInfo)
    {
        super(locale);
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
        if (!value)
        {
            this.Cache = null;
            this.RefreshPending = true;
        }

        this.cached = value;
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
     * Gets or sets a value indicating whether the cache should be refreshed.
     */
    protected get RefreshPending(): boolean
    {
        return this.refreshPending;
    }

    protected set RefreshPending(value)
    {
        this.refreshPending = value;
    }

    /**
     * Gets or sets the cache of the resource.
     */
    protected get Cache(): any
    {
        if (this.RefreshPending)
        {
            this.RefreshPending = false;
            this.cache = this.Load();
        }

        return this.cache;
    }

    protected set Cache(value)
    {
        this.cache = value;
    }

    /**
     * Forces the cache to refresh.
     */
    public Refresh(): void
    {
        if (this.Cached)
        {
            this.RefreshPending = true;
        }
    }

    /**
     * Loads the resource from the file.
     */
    protected abstract Load(): any;
}