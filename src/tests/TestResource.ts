import { CultureInfo } from "@manuth/culture-info";
import { Resource } from "../Resource.js";

/**
 * Provides an implementation of the {@link Resource `Resource`} class for testing.
 */
export class TestResource extends Resource
{
    /**
     * Initializes a new instance of the {@link TestResource `TestResource`} class.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(locale?: CultureInfo)
    {
        super(undefined, locale);
    }
}
