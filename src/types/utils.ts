/* eslint-disable @typescript-eslint/no-explicit-any */

export type BrowserNativeObject = Date | FileList | File
export type IsAny<T> = 0 extends 1 & T ? true : false
export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true
export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false
export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>
export type ArrayKey = number
export type FieldValues = Record<string, any>
type AnyIsEqual<T1, T2> = T1 extends T2 ? (IsEqual<T1, T2> extends true ? true : never) : never
type PathImpl<K extends string | number, V, TraversedTypes> = V extends Primitive | BrowserNativeObject
  ? `${K}`
  : // Check so that we don't recurse into the same type
  // by ensuring that the types are mutually assignable
  // mutually required to avoid false positives of subtypes
  true extends AnyIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`

type PathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>
      }[TupleKeys<T>]
    : PathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>
    }[keyof T]

export type Path<T> = T extends any ? PathInternal<T> : never

/**
 * See {@link Path}
 */
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>
type PathValueImpl<T, P extends string> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? PathValueImpl<T[K], R>
      : K extends `${ArrayKey}`
      ? T extends ReadonlyArray<infer V>
        ? PathValueImpl<V, R>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : P extends `${ArrayKey}`
    ? T extends ReadonlyArray<infer V>
      ? V
      : never
    : never
  : never
type ArrayPathImpl<K extends string | number, V, TraversedTypes> = V extends Primitive | BrowserNativeObject
  ? IsAny<V> extends true
    ? string
    : never
  : V extends ReadonlyArray<infer U>
  ? U extends Primitive | BrowserNativeObject
    ? IsAny<V> extends true
      ? string
      : never
    : // Check so that we don't recurse into the same type
    // by ensuring that the types are mutually assignable
    // mutually required to avoid false positives of subtypes
    true extends AnyIsEqual<TraversedTypes, V>
    ? never
    : `${K}` | `${K}.${ArrayPathInternal<V, TraversedTypes | V>}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? never
  : `${K}.${ArrayPathInternal<V, TraversedTypes | V>}`

type ArrayPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>
      }[TupleKeys<T>]
    : ArrayPathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>
    }[keyof T]
export type ArrayPath<T> = T extends any ? ArrayPathInternal<T> : never
export type PathValue<T, P extends Path<T> | ArrayPath<T>> = PathValueImpl<T, P>
export type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<
  TFieldValues,
  TFieldPath
>
