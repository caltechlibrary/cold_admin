
# Action Items

## Bugs

## Next

- [ ] Figure out how switching from a read view to an edit view should work (e.g. URL parameter like `view=...` or do I expanded URL end points?). The problem is keeping the URL end points managable while still maintaining a simple implementation. I POST can be used to submit form to the same URL as the edit view is, edit view would use GET to retrieve the populated form. 
- [ ] Figure out if Mustache templates are enough to support UI. If not then find an alternative quickly
- [ ] refactor modules for people and groups so that the web configuration like base\_url can flow through the app. This could be done by making a app\_group and app\_people object that held the various handlers. It could also be done through the config module exposing global values. Not sure right approach.
- [ ] Figure out how to render TypeScript to JavaScript for browser side interactivity if there is time to implement that

