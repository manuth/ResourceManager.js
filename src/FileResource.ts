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
    public get FileName(): string
    {
        return this.fileName;
    }

    /**
     * Gets or sets a value indicating whether the resource is cached.
     */
    public get Cached(): boolean
    {
        return this.cached;
    }

    /**
     * @inheritdoc
     */
    public set Cached(value: boolean)
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

    /**
     * @inheritdoc
     */
    protected set Cache(value: any)
    {
        this.cache = value;
    }

    /**
     * @inheritdoc
     */
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
     *
     * @returns
     * The loaded resource.
     */
    protected abstract Load(): Record<string, unknown>;
}
