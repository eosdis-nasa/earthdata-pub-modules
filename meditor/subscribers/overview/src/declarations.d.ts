//* Non-module declarations belong in this file.
//* See https://github.com/microsoft/TypeScript/issues/9748
declare namespace globalThis {
    var fetch: typeof FetchType
}
