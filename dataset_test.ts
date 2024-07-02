import { assertStrictEquals, assertEquals } from "@std/assert";
import { Dataset, DatasetApiClient } from "./dataset.ts";

const c_name = "test.ds";
const port = 8485;

Deno.test("testObjects", async () => {
  const ds = new Dataset(port, c_name);
  let sObj: object | undefined;
  let nObj = {
    "one": "once upon a time",
    "two": 2,
    "three": false,
  };
  console.log("DEBUG nObj ->", nObj);
  let key = "once";
  let ok = await ds.create(key, nObj);
  assertStrictEquals( ok, true, `expected ${key} -> ${nObj} to be created, failed`,);
  if (ok) {
    sObj = await ds.read(key);
    console.log("DEBUG sObj ->", sObj);
    assertEquals(
      sObj,
      nObj,
      `expected to read ${key} -> ${nObj}, got ${nObj}`,
    );
  }
});
