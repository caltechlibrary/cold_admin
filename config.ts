import { matchType } from "./options.ts";

/**
 * ConfigureHandler is a configuration builder for Cold UI.
 */
export class ConfigureHandler {
  debug: boolean = false;
  htdocs: string = "htdocs";
  apiUrl: string = "http://localhost:8485";

  /**
   * set will set the configuration attributes suitable to pass around to
   * the variuos handlers.
   * @param {string} key can be either debug, htdocs or apiUrl
   * @param {any} is the value to set. NOTE: the value needs to match
   * the parameter you're setting.
   * @returns {boolean} true on success, false otherwise
   */
  set(key: string, value: any): boolean {
    if (key === "debug") {
      this.debug = matchType(this.debug, value);
      return (this.debug !== undefined);
    }
    if (key === "htdocs") {
      this.htdocs = matchType(this.htdocs, value);
      return (this.htdocs !== undefined);
    }
    if (key === "apiUrl") {
      this.apiUrl = matchType(this.apiUrl, value);
      return (this.apiUrl !== undefined);
    }
    return false;
  }

  /**
   * cfg returns a configuration object suitable to pass to the handlers.
   * @returns {debug: boolean, htdocs: string, apiUrl: string}
   */
  cfg(): { debug: boolean; htdocs: string; apiUrl: string } {
    return {
      debug: this.debug,
      htdocs: this.htdocs,
      apiUrl: this.apiUrl,
    };
  }
}
