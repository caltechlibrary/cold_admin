/**
 * identifiers.ts modules holds the method related to handling identifiers. E.g. validatin
 * and extraction from the URL pathname.
 */

/**
 * pathIdentifier extracts the identifier from the last element of the URL pathname.
 * The application is expecting a multipart path and if the first "/" and "/" slash
 * it is presumed the identifier is not available.
 *
 * @param {string} uri holds the unparsed URL you want to pull the identifier from.
 * @returns {string} idenitifier as a string, empty string means it could not find the identifier.
 *
 * @example
 * ```
 *    const uri = new URL('https://localhost:8180/groups/LIGO');
 *    const clgid = pathIdentifier(uri);
 *    console.log("group identifier is", clgid);
 * ```
 */
export function pathIdentifier(u: string): string {
  const pathname: string = new URL(u).pathname;
  const cut_pos = pathname.lastIndexOf("/");
  if (cut_pos != pathname.indexOf("/")) {
    return pathname.slice(cut_pos + 1);
  }
  return "";
}

/**
 * formDataToObject turn the form data into a simple object.
 *
 * @param {FormData} formData the form object to process
 * @returns {Object}
 */
export function formDataToObject(form: FormData): Object {
  const obj: { [k: string]: string | boolean } = {};
  for (const v of form.entries()) {
    const key: string = v[0];
    if (key !== "submit") {
      const val: any = v[1];
      if (val === "true") {
        obj[key] = true;
      } else if (val === "false") {
        obj[key] = false;
      } else {
        obj[key] = val;
      }
    }
  }
  return obj;
}