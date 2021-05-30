import { CultureInfo } from "@manuth/culture-info";
import { Resource } from "../Resource";

/**
 * Provides an implementation of the `Resource` class for testing.
 */
export class TestResource extends Resource
{
    /**
     * Initializes a new instance of the `TestResource` class.
     *
     * @param locale
     * The locale of the resource.
     */
    public constructor(locale?: CultureInfo)
    {
        super(undefined, locale);
    }
}
