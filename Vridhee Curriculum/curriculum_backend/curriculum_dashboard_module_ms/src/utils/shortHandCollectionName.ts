export const shortHandCollectionName = (inputString: string) => {
    const arr = inputString.split("_")
    const withoutLast = arr.slice(0, arr.length - 2).join('_');
    return withoutLast;
}