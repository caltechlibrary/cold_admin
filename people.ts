/**
 * people.ts provides the handler for managing People objects.
 */

/**
 * handlePeople implements a middleware that supports several path end points.
 *
 * - `GET /` returns a list of people
 * - `POST /object` creates a new people record
 * - `GET /object/{clpid}` returns a complete people record
 * - `PUT /object/{clpid}` updates a complete people record
 * - `DELETE /person/{clpid}` deletes a compete people record
 *
 * @param {Request} req holds the request to the people handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * ColdUIHandler.
 * @returns {Response}
 */
export function handlePeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  if (req.method === "GET") {
    return handleGetPeople(req, options);
  }
  if (req.method === "POST") {
    return handlePostPeople(req, options);
  }
  if (req.method == "PUT") {
    return handlePutPeople(req, options);
  }
  if (req.method == "DELETE") {
    return handleDeletePeople(req, options);
  }
  console.log("FIXME: handlePeople() not fully implemented");
  const body = "<html>handlePeople Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handleGetPeople hands two end points that returns either a list of people records
 * or a specific people record.
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handlePeople.
 * @returns {Response}
 */
function handleGetPeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  console.log("FIXME: handleGetPeople() not fully implemented");
  const body = "<html>handleGetPeople Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handlePostPeople implements the bare object end point used to create
 * a new people record.
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handlePeople.
 * @returns {Response}
 */
function handlePostPeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  console.log("FIXME: handlePostPeople() not fully implemented");
  const body = "<html>handlePostPeople Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handlePutPeople implements an object update for a specific person record.
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handlePeople.
 * @returns {Response}
 */
function handlePutPeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  console.log("FIXME: handlePutPeople() not fully implemented");
  const body = "<html>handlePutPeople Not implemented</html>";
  return new Response(body, { status: 501 });
}

/**
 * handleDeletePeople hanldes the removal of a people record.
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handlePeople.
 * @returns {Response}
 */
function handleDeletePeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  console.log("FIXME: handleDeletePeople() not fully implemented");
  const body = "<html>handleDeletePeople Not implemented</html>";
  return new Response(body, { status: 501 });
}
