#
# A Deno project makefile
#
PROJECT = cold_ui

GIT_GROUP = rsdoiel

VERSION = $(shell grep '"version":' codemeta.json | cut -d\"  -f 4)

BRANCH = $(shell git branch | grep '* ' | cut -d\  -f 2)

PACKAGE = $(shell ls -1 *.ts | grep -v 'version.ts')

RELEASE_DATE=$(shell date +'%Y-%m-%d')

RELEASE_HASH=$(shell git log --pretty=format:'%h' -n 1)

MAN_PAGES = $(shell ls -1 *.1.md | sed -E 's/\.1.md/.1/g')

HTML_PAGES = $(shell ls -1 *.html)

OS = $(shell uname)

EXT =
ifeq ($(OS), Windows)
        EXT = .exe
endif

TS_MODS = $(shell ls -1 *.ts | grep -v _test.ts | grep -v deps.ts | grep -v version.ts)

build: version.ts CITATION.cff about.md $(TS_MODS) docs bin compile htdocs

bin: .FORCE
	mkdir -p bin

compile: $(TS_MODS)
	deno check --all cold_ui.ts
	deno check --all ds_importer.ts
	deno task build

version.ts: codemeta.json .FORCE
	echo '' | pandoc --from t2t --to plain \
                --metadata-file codemeta.json \
                --metadata package=$(PROJECT) \
                --metadata version=$(VERSION) \
                --metadata release_date=$(RELEASE_DATE) \
                --metadata release_hash=$(RELEASE_HASH) \
                --template codemeta-version-ts.tmpl \
                LICENSE >version.ts
	

CITATION.cff: codemeta.json .FORCE
	cat codemeta.json | sed -E   's/"@context"/"at__context"/g;s/"@type"/"at__type"/g;s/"@id"/"at__id"/g' >_codemeta.json
	echo "" | pandoc --metadata title="Cite $(PROJECT)" --metadata-file=_codemeta.json --template=codemeta-cff.tmpl >CITATION.cff

about.md: codemeta.json .FORCE
	cat codemeta.json | sed -E 's/"@context"/"at__context"/g;s/"@type"/"at__type"/g;s/"@id"/"at__id"/g' >_codemeta.json
	echo "" | pandoc --metadata-file=_codemeta.json --template codemeta-about.tmpl >about.md 2>/dev/null
	if [ -f _codemeta.json ]; then rm _codemeta.json; fi

man: $(MAN_PAGES)

$(MAN_PAGES): .FORCE
	mkdir -p man/man1
	pandoc $@.md --from markdown --to man -s >man/man1/$@

website: .FORCE
	make -f website.mak

format: $(shell ls -1 *.ts | grep -v version.ts)

$(shell ls -1 *.ts | grep -v version.ts): .FORCE
	deno fmt $@

setup_dataset: test.ds/collection.json people.ds/collection.json groups.ds/collection.json import_people_csv import_groups_csv

people.ds/collection.json:
	if [ ! -d people.ds ]; then dataset init people.ds 'sqlite://collection.db'; fi

groups.ds/collection.json:
	if [ ! -d groups.ds ]; then dataset init groups.ds 'sqlite://collection.db'; fi

test.ds/collection.json:
	if [ ! -d test.ds ]; then dataset init test.ds 'sqlite://collection.db'; fi

import_people_csv: .FORCE
	deno task import_people_csv

import_groups_csv: .FORCE
	deno task import_groups_csv

reload_dataset:
	deno task reload_data

htdocs: .FORCE
	make -f htdocs.mak

test: .FORCE
	deno task test

docs: .FORCE
	deno doc --html --name="COLD UI"  --output=./docs $(TS_MODS)

clean: .FORCE
	rm -fR docs/*
	rm -fR bin/$(PROGRAM)$(EXT)
	rm -fR dist/
	-make -f website.mak clean
	-make -f htdocs.mak clean


status:
	git status

save:
	if [ "$(msg)" != "" ]; then git commit -am "$(msg)"; else git commit -am "Quick Save"; fi
	git push origin $(BRANCH)

publish:
	make -f website.mak
	bash publish.bash

.FORCE:
