import { assertEquals, assertStrictEquals } from "@std/assert";
import { Dataset, DatasetApiClient } from "./dataset.ts";

const c_name = "test.ds";
const port = 8485;

Deno.test("testObjects", async () => {
  const ds = new Dataset(port, c_name);
  let sObj: object | undefined;
  let nObj: object = {};
  nObj = {
    "one": "once upon a time",
    "two": 2,
    "three": false,
  };
  let key = "once";
  let ok = await ds.create(key, nObj);
  assertStrictEquals(
    ok,
    true,
    `expected ${key} -> ${nObj} to be created, failed`,
  );
  if (ok) {
    sObj = await ds.read(key);
    assertEquals(
      sObj,
      nObj,
      `expected to read ${key} -> ${nObj}, got ${nObj}`,
    );
    nObj = {
      "one": "once upon a time",
      "two": 2,
      "three": false,
      "four": 4,
    };
    ok = await ds.update(key, nObj);
    if (ok) {
      assertStrictEquals(
        ok,
        true,
        `expected ${key} -> ${sObj} to be updated, failed`,
      );
      sObj = await ds.read(key);
      assertEquals(
        sObj,
        nObj,
        `expected to read ${key} -> ${nObj} (after update), got ${nObj}`,
      );
    }
    let results = await ds.query("list_item", [], {});
    /*
	let hasResults = (results !== undefined);
	console.log("DEBUG hasResults, ", hasResults, " results", results);
	assertStrictEquals(hasResults, true, `expected results for the list query test -> ${results}`);
	*/
    let keys = await ds.keys();
    assertStrictEquals(
      1,
      keys.length,
      `expected keys.length === 1, got keys.length === ${keys.length}, failed`,
    );
    assertStrictEquals(
      keys[0],
      key,
      `expected single key === "${key}", got ${keys[0]}`,
    );
    ok = await ds.delete(key);
    assertStrictEquals(
      ok,
      true,
      `expected delete to return true for key ${key}`,
    );
    keys = await ds.keys();
    assertStrictEquals(
      keys.length,
      0,
      `expected zero keys after delete, got ${keys.length}`,
    );
  }
});
