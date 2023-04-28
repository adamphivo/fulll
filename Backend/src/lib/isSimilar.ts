export function isSimilar(obj1: any, obj2: any): boolean {
  // If both objects are null or undefined, they are similar
  if (obj1 === null || obj1 === undefined) {
    return obj2 === null || obj2 === undefined;
  }

  // If both objects are primitives, compare them directly
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  // If both objects have a different number of keys, they are not similar
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // Recursively compare each key-value pair in the objects
  for (const key in obj1) {
    if (!isSimilar(obj1[key], obj2[key])) {
      return false;
    }
  }

  // If all key-value pairs are similar, the objects are similar
  return true;
}
