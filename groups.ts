/**
 * groups.ts implements the groups object handler for listing, creating, retrieving, updating and delete group objects.
 */

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
  if (req.method === "GET") {
    return handleGetGroups(req, options);
  }
  if (req.method === "POST") {
    return handlePostGroups(req, options);
  }
  if (req.method === "PUT") {
    return handlePutGroups(req, options);
  }
  if (req.method === "DELETE") {
    return handleDeleteGroups(req, options);
  }
  console.log("FIXME: handleGroups() not implemented");
  const body = "<html>handleGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handleGetGroups handle GET actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
function handleGetGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: handleGetGroups() not implemented");
  const body = "<html>handleGetGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handlePostGroups handle POST actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
function handlePostGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: handlePostGroups() not implemented");
  const body = "<html>handlePostGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handlePutGroups handle PUT actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
function handlePutGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: handlePutGroups() not implemented");
  const body = "<html>handlePutGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handleDeleteGroups handle DELETE actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
function handleDeleteGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response {
  console.log("FIXME: handleDeleteGroups() not implemented");
  const body = "<html>handleDeleteGroups Not implemented</html>";
  return new Response(body, { status: 501 });
}
