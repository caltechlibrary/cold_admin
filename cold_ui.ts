import {
  appInfo,
  dotenv,
  existsSync,
  fmtHelp,
  handleGroups,
  handlePeople,
  handleVocabularies,
  http,
  markdown,
  mustache,
  OptionsProcessor,
  path,
  serveDir,
  yaml,
} from "./deps.ts";

/**
 * helpText assembles the help information for COLD UI.
 *
 * @param {[k: string]: string} helpOpt holds the help options defined for the app.
 */
function helpText(helpOpt: { [k: string]: string }): string {
  const txt: string[] = [
    `%{app_name}(1) user manual | {version} {release_date}
% R. S.Doiel
% {release_date} {release_hash}

# NAME

{app_name}

# SYNOPSIS

{app_name} [OPTIONS]

# DESCRIPTION

{app_name} provides the human user interface for cold. It uses
a set of dataset collections for persistence and relies on datasetd
for JSON API to each collection.

# OPTIONS

`,
  ];
  for (let attr in helpOpt) {
    const msg = helpOpt[attr];
    txt.push(`${attr}
: ${msg}
`);
  }
  txt.push(`
# EXAMPLE

{app_name} is setup to run at <http://localhost:8000>. The static content hosted in
the "/var/www/html/cold/app" directory.  The datasetd service is setup to run at
<http://localhost:8485> supporting the people, groups and vocabularies dataset
collections.

~~~shell
{app_name} -port=8000 -htdocs=/var/www/html/cold/app \
           -apiUrl=http://localhost:8485
~~~

`);
  return txt.join("\n");
}

/**
 * ColdUIHandler is a function for handling and dispatching http requests.
 *
 * @param {Request} req holds the http request recieved from the http server
 * @param {debug: boolean, htdocs: string, apiUrl: string} options holds program options that are made available
 * to additional COLD UI handlers.
 * @returns {Response}
 *
 * @example
 * ```
 *   const options = {
 *      debug: true,
 *      htdocs: "./htdocs"
 *   };
 *
 *   const server = Deno.serve({
 *     hostname: "localhost",
 *     port: options.port,
 *   }, (req: Request) => {
 *   	return ColdUIHandler(req, options);
 *   });
 * ```
 */
export function ColdUIHandler(
  req: Request,
  options: { debug: boolean; htdocs: string; apiUrl: string },
): Response | Promise<Response> {
  const pathname = new URL(req.url).pathname;
  const basePath: string = path.normalize(options.htdocs);

  if (options.debug) console.log("DEBUG request", req);

  // Handle the various dataset collections management pages.
  if (pathname.startsWith("/people")) {
    return handlePeople(req, options);
  }
  if (pathname.startsWith("/groups")) {
    return handleGroups(req, options);
  }
  if (pathname.startsWith("/vocabularies")) {
    return handleVocabularies(req, options);
  }
  if (options.debug) {
    console.log(
      "DEBUG: Handle the request for a static files or assets -> " + pathname,
    );
  }
  // NOTE: If there isn't a specific handler implemented then assume you're
  // requesting a static asset.
  return serveDir(req, {
    fsRoot: basePath,
  });
}

//
// Main function
//
const op: OptionsProcessor = new OptionsProcessor();
const defaultPort: number = 8180;
const defaultHtdocs: string = "./htdocs";
const defaultApiUrl: string = "http://localhost:8495";

op.booleanVar("help", false, "display help");
op.booleanVar("license", false, "display license");
op.booleanVar("version", false, "display version");
op.booleanVar("debug", false, "turn on debug logging");
op.numberVar(
  "port",
  defaultPort,
  `set the port number, default ${defaultPort}`,
);
op.stringVar(
  "htdocs",
  defaultHtdocs,
  `set the static content directory, default ${defaultHtdocs}`,
);
op.stringVar(
  "apiUrl",
  defaultApiUrl,
  `set the url to the datasetd API provided for cold`,
);

op.parse(Deno.args);

const options = op.options;
const args = op.args;

if (options.help) {
  console.log(fmtHelp(helpText(op.help), appInfo));
  Deno.exit(0);
}
if (options.license) {
  console.log(appInfo.licenseText);
  Deno.exit(0);
}
if (options.version) {
  console.log(`${appInfo.appName} ${appInfo.version} ${appInfo.releaseHash}`);
  Deno.exit(0);
}

// Make sure we have a valid static content directory set.
if (!existsSync(options.htdocs)) {
  console.log(`Cannot find htdocs ${options.htdocs}, aborting`);
  Deno.exit(1);
}

const basePath = path.normalize(options.htdocs);

console.log(`Starting COLD UI HTTP service at http://localhost:${options.port}
Static content directory is ${basePath}
`);
const server = Deno.serve({
  hostname: "localhost",
  port: options.port,
}, (req: Request): Response | Promise<Response> => {
  return ColdUIHandler(req, {
    debug: options.debug,
    htdocs: options.htdocs,
    apiUrl: options.apiUrl,
  });
});
