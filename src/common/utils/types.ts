/** Remove optionality, null, and undefined from specific properties in a type.

Usage:
type A = {
  a?: string;
  b: number | null;
}
type B = RequiredKeys<A, 'a' | 'b'>
>> B = {
  a: string;
  b: number;
}
*/
export type RequiredKeys<T, K extends keyof T> = T & {
  [key in K]-?: NonNullable<T[key]>;
};

/** Inverse of RequiredKeys. */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & {
  [key in K]+?: T[key];
};

/** Set all keys to nullable. Some api response from backend is in the format
 * ``{nested: {a: null, b: null, c: null}}`` rather than ``{nested: null}``
 * but why tho
 */
export type NullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [key in K]: T[key] | null;
};

export type ReplaceKeys<TSrc, TSub> = Omit<TSrc, keyof TSub & keyof TSrc> &
  TSub;

/* Copy-pasted from fitzone.
Yields a union of all keys and keys nested within those keys in an object.
Further explanation: https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type NestedValue<
  TObject,
  TPath extends string | number,
> = TPath extends `${infer TKey extends keyof TObject &
  (number | string)}.${infer TRest}`
  ? NestedValue<TObject[TKey], TRest>
  : TPath extends keyof TObject
    ? TObject[TPath]
    : never;
