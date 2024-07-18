import { matchType } from "./deps.ts";

export const jsonApiPort: number = 8185;
export const httpPort: number = 8100;

export interface ConfigInterface {
  debug: boolean;
  htdocs: string;
  httpPort: number;
  jsonApiPort: number;
  jsonApiUrl: string;
}

/**
 * ConfigureHandler is a configuration builder for Cold UI.
 */
export class ConfigureHandler {
  debug: boolean = false;
  htdocs: string = "htdocs";
  httpPort: number = httpPort;
  jsonApiPort: number = jsonApiPort;
  jsonApiUrl: string = `http://localhost:${this.jsonApiPort}`;

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
      return this.debug !== undefined;
    }
    if (key === "htdocs") {
      this.htdocs = matchType(this.htdocs, value);
      return this.htdocs !== undefined;
    }
    if (key === "httpPort") {
      this.httpPort = matchType(this.httpPort, value);
      return this.httpPort !== undefined;
    }
    if (key === "apiUrl") {
      this.apiUrl = matchType(this.apiUrl, value);
      return this.apiUrl !== undefined;
    }
    if (key === "jsonApiPort") {
      this.jsonApiPort = matchType(this.jsonApiPort, value);
      this.apiUrl = `http://localhost:${this.jsonApiPort}`;
      return this.jsonApiPort !== undefined;
    }
    if (key === "jsonApiPort") {
      this.jsonApiPort = matchType(this.jsonApiPort, value);
      this.jsonApiUrl = `http://localhost:${this.jsonApiPort}`;
      return this.jsonApiPort !== undefined && this.jsonApiUrl !== undefined;
    }
    return false;
  }

  /**
   * cfg returns a configuration object suitable to pass to the handlers.
   * @returns {debug: boolean, htdocs: string, apiUrl: string}
   */
  cfg(): ConfigInterface {
    return {
      debug: this.debug,
      htdocs: this.htdocs,
      httpPort: this.httpPort,
      jsonApiUrl: this.jsonApiUrl,
      jsonApiPort: this.jsonApiPort,
    };
  }
}
