/**
 * listGroups lists the groups in the groups dataset collection.
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
function listGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: listGroups() not implemented");
  const body = "<html>listGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handleGroups provides the dataset collection UI for managing Groups.
 * It is response for the following actions
 *
 * - list groups
 * - create a group
 * - view a group
 * - update a group
 * - remove a group
 * - search for a group
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * ColdUIHandler.
 * @returns {Response}
 */
export function handleGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: handleGroups() not implemented");
  const body = "<html>handleGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}
