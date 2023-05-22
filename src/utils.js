export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function removeElementFromArray(arr, elementToRemove) {
  return arr.filter((element) => element !== elementToRemove);
}
