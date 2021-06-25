import { IResource } from "../IResource";
import { IResourceFileHandler } from "../IResourceFileHandler";
import { ResourceManager } from "../ResourceManager";

/**
 * Provides an implementation of the {@link ResourceManager `ResourceManager`} for testing.
 */
export class TestResourceManager extends ResourceManager
{
    /**
     * Gets the file-handlers of this resource-manager.
     */
    public get FileHandlers(): IResourceFileHandler[]
    {
        return this.ResourceFileHandlers;
    }

    /**
     * Gets the resources managed by this resource-manager.
     */
    public get ManagedResources(): IResource[]
    {
        return this.Resources;
    }
}
