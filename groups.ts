/**
 * groups.ts implements the groups object handler for listing, creating, retrieving, updating and delete group objects.
 */

import { matchType } from "./options.ts";
import { Dataset } from "./dataset.ts";

const ds = new Dataset(8485, "groups.ds");

/**
 * Group class defines the data shape of the group object managed by cold.
 */
export class Group {
  clgid: string = "";
  include_in_feeds: boolean = false;
  name: string = "";
  alternative: string[] = [];
  email: string = "";
  date: string = "";
  description: string = "";
  start_date: string = "";
  is_approx_start: boolean = false;
  end_date: string = "";
  is_approx_end: boolean = false;
  //FIXME: should activity be called status?  In the people record status seems similar.
  activity: string = "";
  website: string = "";
  pi: string = "";
  parent: string = "";
  /* prefix refers to the DOI prefix that some groups on campus have. */
  prefix: string = "";
  grid: string = "";
  isni: string = "";
  ringold: string = "";
  viaf: string = "";
  ror: string = "";
  updated: string = "";
  Scope: string = "";

  migrateCsv(row: any): boolean {
    if (row.hasOwnProperty("key")) {
      this.clgid = row.key;
      this.include_in_feeds = true;
    } else {
      this.include_in_feeds = false;
      return false;
    }
    if (row.hasOwnProperty("name")) {
      this.name = row.name;
    }
    if (row.hasOwnProperty("alternative") && (row.alternative !== "")) {
      this.alternative = row.alternative.trim().split(/;/g);
    }
    if (row.hasOwnProperty("email")) {
      this.email = row.email;
    }
    if (row.hasOwnProperty("date")) {
      this.date = row.date;
    }
    if (row.hasOwnProperty("description")) {
      this.description = row.description;
    }
    if (row.hasOwnProperty("start")) {
      this.start_date = row.start;
    }
    if (row.hasOwnProperty("approx_start")) {
      this.is_approx_start = matchType(this.is_approx_start, row.approx_start);
    } else {
      this.is_approx_start = false;
    }
    if (row.hasOwnProperty("end")) {
      this.end_date = row.end;
    }
    if (row.hasOwnProperty("approx_end")) {
      this.is_approx_end = matchType(this.is_approx_end, row.approx_end);
    } else {
      this.is_approx_end = false;
    }
    if (row.hasOwnProperty("activity")) {
      this.activity = matchType(this.activity, row.activity);
    }
    if (row.hasOwnProperty("website")) {
      this.website = row.website;
    }
    if (row.hasOwnProperty("pi")) {
      this.pi = row.pi;
    }
    if (row.hasOwnProperty("parent")) {
      this.parent = row.parent;
    }
    if (row.hasOwnProperty("prefix")) {
      this.prefix = row.prefix;
    }
    if (row.hasOwnProperty("grid")) {
      this.grid = row.grid;
    }
    if (row.hasOwnProperty("isni")) {
      this.isni = row.isni;
    }
    if (row.hasOwnProperty("ringold")) {
      this.ringold = row.ringold;
    }
    if (row.hasOwnProperty("viaf")) {
      this.viaf = row.viaf;
    }
    if (row.hasOwnProperty("ror")) {
      this.ror = row.ror;
    }
    if (row.hasOwnProperty("updated")) {
      this.updated = row.updated;
    } else {
      this.updated = (new Date()).toLocaleDateString("en-US");
    }
    if (row.hasOwnProperty("Scope")) {
      this.Scope = row.Scope;
    }
    return true;
  }

  toJSON(): string {
    return JSON.stringify({
      clgid: this.clgid,
      name: this.name,
      alternative: this.alternative,
      email: this.email,
      date: this.date,
      description: this.description,
      start_date: this.start_date,
      is_approx_start: this.is_approx_start,
      end_date: this.end_date,
      is_approx_end: this.is_approx_end,
      activity: this.activity,
      website: this.website,
      pi: this.pi,
      parent: this.parent,
      prefix: this.prefix,
      grid: this.grid,
      isni: this.isni,
      ringold: this.ringold,
      viaf: this.viaf,
      ror: this.ror,
      updated: this.updated,
      Scope: this.Scope,
    });
  }
}

/**
 * handleGroups provides the dataset collection UI for managing Groups.
 * It is response for the following actions
 *
 * - list or search for groups
 * - create a group
 * - view a group
 * - update a group
 * - remove a group
 *
 * http methods and their interpretation
 *
 * - `GET /` list objects, use `?q=...` for search
 * - `POST /` creates an object
 * - `GET /{id}` retrieve an object
 * - `PUT /{id}` update an object
 * - `DELETE /{id}` delete an object
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * ColdUIHandler.
 * @returns {Response}
 */
export async function handleGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Promise<Response> {
  if (req.method === "GET") {
    return await handleGetGroups(req, options);
  }
  if (req.method === "POST") {
    return await handlePostGroups(req, options);
  }
  if (req.method === "PUT") {
    return await handlePutGroups(req, options);
  }
  if (req.method === "DELETE") {
    return await handleDeleteGroups(req, options);
  }
  console.log("FIXME: handleGroups() not implemented");
  const body = "<html>handleGroups Not implemented</html>";
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}

/**
 * handleGetGroups handle GET actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 *
 * The expected paths are in the form
 *
 * - `/` list the groups by group name (`?q=...` would perform a search by group name)
 * - `/{clgid}` indicates retrieving a single object by the Caltech Library group id
 */
async function handleGetGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Promise<Response> {
  /* parse the URL */
  const url = new URL(req.url);
  const pathname: string = url.pathname;
  console.log("DEBUG req", req, typeof req);
  console.log("DEBUG url", url, typeof url);
  console.log("DEBUG pathname", pathname, typeof pathname);
  console.log("FIXME: handleGetGroups() not implemented");
  if (pathname.endsWith("/groups") || pathname.endsWith("/groups/")) {
    /* display a list of groups */
    console.log("We have a request for group list");
    const keys: string[] = await ds.keys();
    const body =
      `<doctype html>\n<html lang="en">handleGetGroups listing not implemented: ${req}<p><code><pre>${keys}</pre></code></html>`;
    return new Response(body, {
      status: 501,
      headers: { "content-type": "text/html" },
    });
  } else {
    /* retrieve a specific record */
    const cut_pos = pathname.lastIndexOf("/");
    const clgid = pathname.slice(cut_pos + 1);
    const obj = ds.read(clgid);
    console.log("We have a request for group object", clgid);
    const body =
      `<doctype html>\n<html lang="en">handleGetGroups show group id ${clgid} Not implemented: ${req}<p><code><pre>${obj}</pre></code></html>`;
    return new Response(body, {
      status: 501,
      headers: { "content-type": "text/html" },
    });
  }
}

/**
 * handlePostGroups handle POST actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
async function handlePostGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Promise<Response> {
  console.log("FIXME: handlePostGroups() not implemented");
  const body = "<html>handlePostGroups Not implemented</html>";
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}

/**
 * handlePutGroups handle PUT actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
async function handlePutGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Promise<Response> {
  console.log("FIXME: handlePutGroups() not implemented");
  const body = "<html>handlePutGroups Not implemented</html>";
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}

/**
 * handleDeleteGroups handle DELETE actions on group object(s).
 *
 * @param {Request} req holds the request to the group handler
 * @param {debug: boolean, htdocs: string} options holds options passed from
 * handleGroups.
 * @returns {Response}
 */
async function handleDeleteGroups(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Promise<Response> {
  console.log("FIXME: handleDeleteGroups() not implemented");
  const body = "<html>handleDeleteGroups Not implemented</html>";
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}
