import { CultureInfo } from "@manuth/culture-info";
import Mustache from "mustache";
import { IResourceManager } from "./IResourceManager.js";

/**
 * Provides the functionality to resolve resource-items from a resource-manager.
 */
export class ResourceManagerContext extends Mustache.Context
{
    /**
     * The resource-manager of the context.
     */
    private resourceManager: IResourceManager;

    /**
     * The locale of the resource-items to get.
     */
    private locale: CultureInfo;

    /**
     * Initializes a new instance of the {@link ResourceManagerContext `ResourceManagerContext`} class.
     *
     * @param resourceManager
     * The resource-manager to get the lookup-values from.
     *
     * @param locale
     * The locale of the resource-items to get.
     *
     * @param view
     * The parent view of the context.
     */
    public constructor(resourceManager: IResourceManager, locale?: CultureInfo, view?: any)
    {
        super(view);
        this.resourceManager = resourceManager;
        this.locale = locale;
    }

    /**
     * Gets the resource-manager of the context.
     */
    public get ResourceManager(): IResourceManager
    {
        return this.resourceManager;
    }

    /**
     * Gets or sets the locale of the resource-items to get.
     */
    public get Locale(): CultureInfo
    {
        return this.locale;
    }

    /**
     * @inheritdoc
     */
    public set Locale(value: CultureInfo)
    {
        this.locale = value;
    }

    /**
     * @inheritdoc
     *
     * @param name
     * The name to look up.
     *
     * @returns
     * The value with the specified {@link name `name`}.
     */
    public override lookup(name: string): any
    {
        return this.ResourceManager.Get(name, this.Locale);
    }
}
