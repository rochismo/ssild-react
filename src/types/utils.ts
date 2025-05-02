export type Path<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}` | `${K}.${keyof T[K] & string}`
    : `${K}`;
}[keyof T & string];

export type PathValue<T, P extends string> =
  P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? T[K] extends object
        ? R extends keyof T[K] & string
          ? T[K][R]
          : never
        : never
      : never
    : P extends keyof T
      ? T[P]
      : never;