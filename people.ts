export function handlePeople(
  req: Request,
  options: { debug: boolean; htdocs: string },
): Response {
  console.log("FIXME: handlePeople() not implemented");
  const body = "<html>handlePeople Not implemented</html>";
  return new Response(body, { status: 501 });
}
