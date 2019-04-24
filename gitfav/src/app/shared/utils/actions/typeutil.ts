/**
 * Every action label must pass through this function and therefore it
 * is a good place to ensure all of our action labels are unique.
 */
const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type '${label}' is not unique`);
    }

    typeCache[<string>label] = true;
    return <T>label;
}
