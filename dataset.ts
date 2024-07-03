/**
 * dataset.ts is a thin TypeScript wrapper of the datasetd JSON API
 */

/**
 * DatasetApiClient class implements a thin wrapper around a dataset collection mapping most of the
 * command line verbs to methods.
 */
export class DatasetApiClient {
  port = 8485;
  c_name = "";
  dataset_api = "";

  /**
   * constructor for object
   * @param {number} port is the port number to use when request data from datasetd service
   * @param {sting} c_name is the collection name used to form API requests.
   */
  constructor(port: number, c_name: string) {
    this.port = port;
    this.c_name = c_name;
    this.dataset_api = `http://localhost:${port}/api/${c_name}`;
  }

  /**
   * keys retrieves a list of keys expressed as JSON from the datasetd JSON API
   */
  async keys(): Promise<Response> {
    return await fetch(`${this.dataset_api}/keys`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
  }

  /**
   * create retrieves creates a new object in the collection from a key and JSON encoded object.
   * It does this through the datasetd JSON API.
   */
  async create(key: string, body: string): Promise<Response> {
    return fetch(`${this.dataset_api}/object/${key}`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: body,
    });
  }

  /**
   * read retrieves a single object expressed as JSON from the datasetd JSON API
   */
  async read(key: string): Promise<Response> {
    return fetch(`${this.dataset_api}/object/${key}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
  }

  /**
   * update replaces an new object in the collection from a key and JSON encoded object.
   * It does this through the datasetd JSON API.
   */
  async update(key: string, body: string): Promise<Response> {
    return fetch(`${this.dataset_api}/object/${key}`, {
      headers: { "content-type": "application/json" },
      method: "PUT",
      body: body,
    });
  }

  /**
   * delete removes an new object from the collection from given key.
   * It does this through the datasetd JSON API.
   */
  async delete(key: string): Promise<Response> {
    return fetch(`${this.dataset_api}/object/${key}`, {
      headers: { "content-type": "application/json" },
      method: "DELETE",
    });
  }

  /**
   * query performns a named query based on the YAML file running the datasetd API.
   * If they query has parameters then the field order needs to be supplied in the fields
   * and the key/value pairs in the body which will be transmitted as a POST body encoded
   * as application/json.
   *
   * @param {string} query_name
   * @param {string[]} fields, an ordered array of fields defined in the query
   * @param {string} body holds the JSON encoded key/value pairs for the query
   * @returns {Promise<Repsonse>}
   */
  async query(
    query_name: string,
    fields: string[],
    body: string,
  ): Promise<Response> {
    if (fields.length === 0) {
      return fetch(`${this.dataset_api}/query/${query_name}`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: body,
      });
    } else {
      return fetch(
        `${this.dataset_api}/query/${query_name}/${fields.join("/")}`,
        {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: body,
        },
      );
    }
  }
}

/**
 * Dataset implements the high level functions associated with the dataset cli via the datasetd service.
 * It relies on DatasetClient to perform the http request and return response while dataset wraps the
 * conversion request and responses to and from lists and objects.
 */
export class Dataset {
  _ds: DatasetApiClient;

  /**
   * constructor for object
   * @param {number} port is the port number to use when request data from datasetd service
   * @param {sting} c_name is the collection name used to form API requests.
   */
  constructor(port: number, c_name: string) {
    this._ds = new DatasetApiClient(port, c_name);
  }

  /**
   * keys returns a list of all keys from a dataset collection
   */
  async keys(): Promise<string[]> {
    const resp = await this._ds.keys();
    if (resp.ok && resp.body) {
      const key_list = await resp.json();
      if (key_list !== null) {
        return key_list;
      }
    }
    return [];
  }

  /**
   * create takes an key and object creating them via the datasetd JSON API.
   *
   * @param {string} key
   * @param {object} obj is the thing you want to create in the collection.
   * @returns {boolean} true if successful, false otherwise
   */
  async create(key: string, obj: object): Promise<boolean> {
    const text = JSON.stringify(obj);
    const resp = await this._ds.create(key, text);
    if (resp.ok) {
      if (resp.body !== null) {
        resp.body.cancel();
      }
      return true;
    }
    return false;
  }

  /**
   * read retrieves an object from a dataset collection using the datasetd JSON API.
   *
   * @param {string} key, the key to the object you want to retrieve.
   * @returns {object} returns the object or undefined if it fails.
   */
  async read(key: string): Promise<object | undefined> {
    const resp = await this._ds.read(key);
    if (resp.ok && resp.body) {
      return await resp.json();
    }
    return undefined;
  }

  /**
   * update takes an key and object updating the collection via the datasetd JSON API.
   *
   * @param {string} key
   * @param {object} obj is the replacement object for the key in the collection.
   * @returns {boolean} true if successful, false otherwise
   */
  async update(key: string, obj: object): Promise<boolean> {
    const text = JSON.stringify(obj);
    const resp = await this._ds.update(key, text);
    if (resp.ok) {
      if (resp.body !== null) {
        resp.body.cancel();
      }
      return true;
    }
    return false;
  }

  /**
   * delete removes object from a dataset collection using the datasetd JSON API.
   *
   * @param {string} key, the key to the object you want to remove.
   * @returns {boolean} true if successful, false otherwise
   */
  async delete(key: string): Promise<boolean> {
    const resp = await this._ds.delete(key);
    if (resp.ok) {
      if (resp.body !== null) {
        resp.body.cancel();
      }
      return true;
    }
    return false;
  }

  /**
   * query executes a query defined in the YAML file of your datasetd API.
   * If the query takes parameters they field ordering (matching the SQL query)
   * needs to be provided in the fields array. Any data that is needed to execute
   * the query is provided in the kv object.  fields maybe an empty list and
   * kv maybe an empty object for queries that don't need any parameters.
   *
   * @param {string} query_name, the attribute name in the query property of your
   * datasetd YAML configuration.
   * @param {string[]} fields, an ordered list of field names matching the sequence
   * to the query defined in the YAML file. The fields need to match those in kv.
   * @param {object} kv is the map of key and values to POST to the JSON API if
   * the query requires parameters.
   * @returns {object}, usually a list or an empty list or object is returned if
   * there were no results or an error. Errors will be reported in the datasetd
   * log.
   */
  async query(
    query_name: string,
    fields: string[],
    kv: object,
  ): Promise<object | undefined> {
    if (fields.length > 0) {
      const body = JSON.stringify(kv);
      const resp = await this._ds.query(query_name, fields, body);
      if (resp.ok) {
        let results = await resp.json();
        console.log("DEBUG query results", results);
        return results;
      }
    } else {
      const resp = await this._ds.query(query_name, [], "");
      if (resp.ok) {
        let results = await resp.json();
        console.log("DEBUG query results (no fields or kv)", results);
        return results;
      }
    }
    return undefined;
  }
}
