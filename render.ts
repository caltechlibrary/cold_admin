/**
 * render.ts holds the page rendering functions for cold_ui.
 */
import { renderFile } from "https://deno.land/x/mustache/mod.ts";
import * as path from "@std/path";

/**
 * renderPage takes a template path and a page object and returns a Response object.
 *
 * @param {string} template: this name of the template in the views folder
 * @param {object} page_object: the page object to apply to template
 * @returns {Promise<Response>} returns a response once everything is ready.
 */
export async function renderPage(
  template: string,
  page_object: object,
): Promise<Response> {
  const t_name = path.join(Deno.cwd(), "views", template);
  let body = await renderFile(t_name, page_object);
  if (body !== undefined) {
    return new Response(body, {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  }
  body =
    `<doctype html>\n<html lang="en">something went wrong, failed to render ${t_name}.</html>`;
  return new Response(body, {
    status: 501,
    headers: { "content-type": "text/html" },
  });
}
