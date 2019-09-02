import { CultureInfo } from "culture-info";
import { ObjectResource } from "../ObjectResource";

/**
 * Provides an implementation of the `Resource` class for testing.
 */
export class TestResource extends ObjectResource
{
    public constructor(locale?: CultureInfo)
    {
        super(undefined, locale);
    }
}