
# COLD UI

This is a test of implementing the UI layer of COLD dataset collections as JSON data source. It uses Deno to present the UI layer talking to datasetd webservice for actual data management. The cold_ui service should be run behind a front end web server setup to provide access control (e.g. single sign-on via Shibboleth). The UI code is written in Typescript which is also use to generate the HTML, CSS and JavaScript needed for dynamic content while static assets are also hosted via Deno.





