
Installation for development of **cold_ui**
===========================================

**cold_ui** is experimental software providing a human user interface for managing controlled object lists and datum (e.g. controlled vocabularies) hosted in a dataset collections. The application is split with two layers of responsibility. The UI is written in Typescript and run via [Deno](https://deno.land). A JSON API used by cold_ui is provided by datasetd for managing the people, groups and vocabularies collections.

**cold_ui** can be configured via the command, the environment or YAML configuration file.

**cold_ui** is intended to run behind a front facing web server (e.g. Apache 2 or NginX) that access control and authentication. This can be configured in Apache 2 or NginX by use of Shibboleth or BasicAuth.  An example apache2 configuration block is included in the source repository for **cold**. It will require adaptation to your specific web server configuration.

You will need to build **cold_ui** for your specific system configuration.  You need to rebuild the static web content (very likely) you'll need to have Git, GNU Make, Pandoc 3 and Deno >= 1.44 available and working on your system.

Required software
-----------------

Adjusting the web content to your host system requires the following

1. Git (to clone the cold repository on GitHub)
2. Deno >= 1.44
2. dataset >= 2.1
4. Pandoc > 3 (both cli and server)
5. GNU Make

Running cold_ui on Unix systems
-------------------------------

NOTE: Currently Pandoc 2 ships with many packaging systems (e.g. Ubuntu 22.04 LTS). **cold_ui** requires Pandoc 3. To get Pandoc v3 you can check the [Pandoc](https://pandoc.org) [Download Page](https://pandoc.org/downloads) for your platform. You can also compile Pandoc but you will need a modern Haskell installed (e.g. via [gchup](https://www.haskell.org/ghcup/)). 

Here's an example of the commands you could use for development.

~~~
make
make website
deno task dev
~~~

Building Pandoc on Linux/macOS
------------------------------

1. Install Haskell via [ghcup](https://www.haskell.org/ghcup/)
2. Make sure `$HOME/bin` exists and is in your path
    a. `mkdir -p $HOME/bin`
    b. Add it to your .bashrc, `echo 'export PATH="$HOME/bin:$PATH"' >>$HOME.bashrc`
    c. Source .bashrc if needed `source $HOME/.bashrc`
3. Build Pandoc 3 install as pandoc and pandoc-server
    a. `cd`
    b. `git clone https://github.com/jgm/pandoc src/github.com/jgm/pandoc`
    c. `cd src/github.com/jgm/pandoc`
    d. `make`
    e. `cp -vi $(find . -type f -name pandoc) $HOME/bin/pandoc-server`
    f. `cp -vi $(find . -type f -name pandoc) $HOME/bin/pandoc`

~~~
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
source $HOME/.ghcup/env
mkdir -p $HOME/bin
echo 'export PATH="$HOME/bin:$PATH"' >>"$HOME/.bashrc"
source $HOME/.bashrc
cd
git clone https://github.com/jgm/pandoc \
    src/github.com/jgm/pandoc
cd src/github.com/jgm/pandoc
make
cp -vi $(find . -type f -name pandoc) $HOME/bin/pandoc
cp -vi $(find . -type f -name pandoc) $HOME/bin/pandoc-server
cd
~~~

Building cold_ui on Linux/macOS
-------------------------------

1. Clone the Git repository for cold and run with Make
    a. `cd`
    b. `git clone https://github.com/caltechlibrary/cold_ui src/github.com/caltechlibrary/cold_ui`
    b. `cd src/github.com/caltechlibrary/cold_ui`
2. Run `make` to compile cold_ui
3. Run `make dataset_collections` to create SQLite3 based dataset collections for people, groups, vocabularies
4. Run tmux, launch datasetd then split the window and our deno task
    a. tmux
    c. launch JSON API with `datasetd cold_api.yaml`
    b. split the window, `Ctrl-b %`
    d. launch COLD UI with `deno task start` or `deno task dev` (for development)

Get datasetd going

Here's an example of the steps I'd take on my M1 Mac Mini. 

~~~
git clone git@github.com:caltechlibrary/cold_ui \
    src/github.com/caltechlibrary/cold_ui
cd src/github.com/caltechlibrary/cold_ui
make
make dataset_collections
tmux
dataset cold_api.yaml
# split the window then run start task
deno task start
~~~

The cold ui application is visible to your web browser at <http://localhost:8180>

The datasetd JSON API is visible at <http://localhost:8485>

To shutdown the running services I do the following

- Press ctl-c to quit in the datasetd window to stop the JSON API
- Press ctl-c to quit `deno task start` or run `deno task stop`


