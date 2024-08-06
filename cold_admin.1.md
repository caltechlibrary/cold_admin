%cold_admin(1) user manual | 0.0.1 2024-08-06
% R. S.Doiel
% 2024-08-06 bdaf1f9

# NAME

cold_admin

# SYNOPSIS

cold_admin [OPTIONS]

# DESCRIPTION

cold_admin provides the admin interface for cold. Cold is implemented using dataset collections
for object persistence and relies on datasetd for JSON API to each collection.

# OPTIONS


help
: display help

license
: display license

version
: display version

debug
: turn on debug logging

port
: set the port number, default 8180

htdocs
: set the static content directory, default ./htdocs

apiUrl
: set the url to the datasetd API provided for cold


# EXAMPLE

cold_admin is setup to run at <http://localhost:8180>. The static content hosted in
the "/var/www/html/cold/app" directory.  The datasetd service is setup to run at
<http://localhost:8485> supporting the people, groups and vocabularies dataset
collections.

~~~shell
cold_admin -port=8100 -htdocs=/var/www/html/cold/app            -apiUrl=http://localhost:8185
~~~

