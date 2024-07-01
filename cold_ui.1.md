%cold_ui(1) user manual | 0.0.1 2024-07-01
% R. S.Doiel
% 2024-07-01 d75c67a

# NAME

cold_ui

# SYNOPSIS

cold_ui [OPTIONS]

# DESCRIPTION

cold_ui provides the human user interface for cold. It uses
a set of dataset collections for persistence and relies on datasetd
for JSON API to each collection.

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

cold_ui is setup to run at <http://localhost:8000>. The static content hosted in
the "/var/www/html/cold/app" directory.  The datasetd service is setup to run at
<http://localhost:8485> supporting the people, groups and vocabularies dataset
collections.

~~~shell
cold_ui -port=8000 -htdocs=/var/www/html/cold/app            -apiUrl=http://localhost:8485
~~~


