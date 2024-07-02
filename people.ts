/**
 * people.ts implements the people object handler for listing, creating, retrieving, updating and delete group objects.
 */
import { matchType } from "./options.ts";

/**
 * People implements a Caltech People object
 */
export class People {
  clpid: string = "";
  include_in_feeds: boolean = false;
  family_name: string = "";
  given_name: string = "";
  email: string = "";
  archivesspace_id: string = "";
  directory_user_id: string = "";
  directory_person_type: string = "";
  title: string = "";
  bio: string = "";
  division: string = "";
  status: string = "";
  viaf: string = "";
  lcnaf: string = "";
  isni: string = "";
  wikidata: string = "";
  snac: string = "";
  orcid: string = "";
  image_url: string = "";
  education: string = "";
  caltech: boolean = false;
  jpl: boolean = false;
  faculty: boolean = false;
  alumn: boolean = false;
  updated: string = "";

  migrateCsv(row: any): boolean {
    // NOTE: Skipping the follow legacy columns: thesis_id,advisor_id,authors_id
    // authors_count,thesis_count,data_count,advisor_count,editor_count
    if (row.hasOwnProperty("cl_people_id")) {
      this.clpid = row.cl_people_id;
    } else {
      return false;
    }
    if (row.hasOwnProperty("family_name")) {
      this.family_name = row.family_name;
    }
    if (row.hasOwnProperty("given_name")) {
      this.given_name = row.given_name;
    }
    if (row.hasOwnProperty("archivesspace_id")) {
      this.archivesspace_id = row.archivesspace_id;
    }
    if (row.hasOwnProperty("directory_id")) {
      this.directory_user_id = row.directory_id;
    }
    if (row.hasOwnProperty("viaf_id")) {
      this.viaf = row.viaf_id;
    }
    if (row.hasOwnProperty("lcnaf")) {
      this.lcnaf = row.lacnaf;
    }
    if (row.hasOwnProperty("isni")) {
      this.isni = row.isni;
    }
    if (row.hasOwnProperty("wikidata")) {
      this.wikidata = row.wikidata;
    }
    if (row.hasOwnProperty("snac")) {
      this.snac = row.snac;
    }
    if (row.hasOwnProperty("orcid")) {
      this.orcid = row.orcid;
    }
    if (row.hasOwnProperty("image")) {
      this.image_url = row.image;
    }
    if (row.hasOwnProperty("educated_at")) {
      this.education = row.educated_at;
    }
    if (row.hasOwnProperty("caltech")) {
      this.caltech = matchType(this.caltech, row.caltech);
    }
    if (row.hasOwnProperty("jpl")) {
      this.jpl = matchType(this.jpl, row.jpl);
    }
    if (row.hasOwnProperty("faculty")) {
      this.faculty = matchType(this.faculty, row.faculty);
    }
    if (row.hasOwnProperty("alumn")) {
      this.alumn = matchType(this.alumn, row.alumn);
    }
    if (row.hasOwnProperty("status")) {
      this.status = matchType(this.status, row.status);
    }
    if (row.hasOwnProperty("directory_person_type")) {
      this.directory_person_type = row.directory_person_type;
    }
    if (row.hasOwnProperty("title")) {
      this.title = row.title;
    }
    if (row.hasOwnProperty("bio")) {
      this.bio = row.bio;
    }
    if (row.hasOwnProperty("division")) {
      this.division = row.division;
    }
    if (row.hasOwnProperty("updated")) {
      this.updated = row.updated;
    } else {
      this.updated = (new Date()).toLocaleDateString("en-US");
    }
    return true;
  }

  toJSON(): string {
    return JSON.stringify({
      clpid: this.clpid,
      include_in_feeds: this.include_in_feeds,
      family_name: this.family_name,
      given_name: this.given_name,
      email: this.email,
      archivesspace_id: this.archivesspace_id,
      directory_user_id: this.directory_user_id,
      directory_person_type: this.directory_person_type,
      title: this.title,
      bio: this.bio,
      division: this.division,
      status: this.status,
      viaf: this.viaf,
      lcnaf: this.lcnaf,
      isni: this.isni,
      wikidata: this.wikidata,
      snac: this.snac,
      orcid: this.orcid,
      image_url: this.image_url,
      education: this.education,
      caltech: this.caltech,
      jpl: this.jpl,
      faculty: this.faculty,
      alumn: this.alumn,
      updated: this.updated,
    });
  }
}

/**
 * handlePeople implements a middleware that supports several path end points.
 *
 * - list or search people objects
 * - create a person object
 * - view a person object
 * - update a person object
 * - remove a person object
 *
 * http methods and their role
 *
 * - `GET /` list objects, use `?q=...` for search
 * - `POST /` create an object
 * - `GET /{clpid}` retrieve an object
 * - `PUT /{clpid}` update an object
 * - `DELETE /{clpid}` delete and object
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
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
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
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
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
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
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
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
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
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}
