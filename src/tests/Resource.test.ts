import { strictEqual, throws } from "assert";
import { CultureInfo } from "@manuth/culture-info";
import { randexp } from "randexp";
import { DuplicateKeyException } from "../DuplicateKeyException";
import { KeyNotFoundException } from "../KeyNotFoundException";
import { TestResource } from "./TestResource";

/**
 * Registers tests for the `Resource` class.
 */
export function ResourceTests(): void
{
    suite(
        "Resource",
        () =>
        {
            let resource: TestResource;
            let rootID: string;
            let rootValue: any;
            let nestedID: string;
            let nestedValue: any;
            let duplicateID: string;
            let duplicateRootValue: any;
            let duplicateNestedValue: any;
            let independentID: string;
            let composedID: string;
            let independentInIndependent: any;
            let independentInComposed: any;
            let composedInIndependent: any;
            let composedInComposed: any;
            let inexistentID: string;

            suiteSetup(
                () =>
                {
                    let idPattern = /[a-z]*(\.[a-z]*){3}/;
                    resource = new TestResource();
                    rootID = randexp(idPattern);
                    rootValue = randexp(/.{10}/);

                    nestedID = randexp(idPattern);
                    nestedValue = randexp(/.{11}/);

                    duplicateID = randexp(idPattern);
                    duplicateRootValue = randexp(/.{12}/);
                    duplicateNestedValue = randexp(/.{13}/);

                    independentID = randexp(/[a-z]*/);
                    composedID = randexp(idPattern);

                    independentInIndependent = randexp(/.{14}/);
                    independentInComposed = randexp(/.{15}/);
                    composedInIndependent = randexp(/.{16}/);
                    composedInComposed = randexp(/.{17}/);

                    inexistentID = "This.ID.Doesn.Not.Exist";

                    resource.Resource = {
                        [rootID]: rootValue,
                        [duplicateID]: duplicateRootValue,
                        [independentID]: {
                            [independentID]: independentInIndependent,
                            [composedID]: composedInIndependent
                        },
                        [composedID]: {
                            [independentID]: independentInComposed,
                            [composedID]: composedInComposed
                        }
                    };

                    let idValuePairs: Array<[string, any]> = [[nestedID, nestedValue], [duplicateID, duplicateNestedValue]];

                    for (let idValuePair of idValuePairs)
                    {
                        let id = idValuePair[0];
                        let value = idValuePair[1];

                        for (let idPart of id.split(".").reverse())
                        {
                            value = {
                                [idPart]: value
                            };
                        }

                        resource.Resource = {
                            ...resource.Resource,
                            ...value
                        };
                    }
                });

            suite(
                "constructor",
                () =>
                {
                    test(
                        "Checking whether the generated resources have the correct locale…",
                        () =>
                        {
                            let englishCulture = new CultureInfo("en");
                            strictEqual(new TestResource().Locale.Name, CultureInfo.InvariantCulture.Name);
                            strictEqual(new TestResource(englishCulture).Locale.Name, englishCulture.Name);
                        });
                });

            suite(
                "Get",
                () =>
                {
                    test(
                        "Checking whether containing dots can be resolved…",
                        () =>
                        {
                            strictEqual(resource.Get(rootID), rootValue);
                        });

                    test(
                        "Checking whether nested elements can be resolved…",
                        () =>
                        {
                            strictEqual(resource.Get(nestedID), nestedValue);
                        });

                    test(
                        "Checking whether resolving duplicate IDs throws an exception…",
                        () =>
                        {
                            throws(() => resource.Get(duplicateID), DuplicateKeyException);
                        });

                    test(
                        "Checking whether resolving an inexistent id triggers an error…",
                        () =>
                        {
                            throws(() => resource.Get(inexistentID), KeyNotFoundException);
                        });

                    test(
                        "Checking whether independent key in independent keys are resolved correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(`${independentID}.${independentID}`), independentInIndependent);
                        });

                    test(
                        "Checking whether composed keys in independent keys are resolved correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(`${independentID}.${composedID}`), composedInIndependent);
                        });

                    test(
                        "Checking whether independent keys in composed keys are resolved correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(`${composedID}.${independentID}`), independentInComposed);
                        });

                    test(
                        "Checking whether composed keys in composed keys are resolved correctly…",
                        () =>
                        {
                            strictEqual(resource.Get(`${composedID}.${composedID}`), composedInComposed);
                        });
                });

            suite(
                "Exists",
                () =>
                {
                    test(
                        "Checking whether the method detects whether an ID exists…",
                        () =>
                        {
                            strictEqual(resource.Exists(rootID), true);
                            strictEqual(resource.Exists(inexistentID), false);
                        });

                    test(
                        "Checking whether the method detects whether duplicate IDs exist…",
                        () =>
                        {
                            strictEqual(resource.Exists(duplicateID), true);
                        });
                });
        });
}
