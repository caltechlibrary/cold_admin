#
# A Deno project makefile
#
PROJECT = cold_ui

PROGRAM = cold_ui

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

build: version.ts CITATION.cff about.md $(TS_MODS) docs bin compile

bin: .FORCE
	mkdir -p bin

compile: $(TS_MODS) $(PROGRAM).ts
	deno check --all $(PROGRAM).ts
	deno run --allow-read --allow-net $(PROGRAM).ts --help >$(PROGRAM).1.md
	deno compile --allow-read --allow-net --output bin/$(PROGRAM)$(EXT) $(PROGRAM).ts 

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

dataset_collections: people.ds/collection.json groups.ds/collection.json vocabularies.ds/collection.json

people.ds/collection.json:
	dataset init people.ds 'sqlite://collection.db'

groups.ds/collection.json:
	dataset init groups.ds 'sqlite://collection.db'

vocabularies.ds/collection.json:
	dataset init vocabularies.ds 'sqlite://collection.db'

test: .FORCE
	deno task test

docs: .FORCE
	deno doc --html --name="COLD UI"  --output=./docs $(TS_MODS)

clean: .FORCE
	rm -fR docs/*
	rm -fR bin/$(PROGRAM)$(EXT)
	rm -fR dist/

.FORCE:
