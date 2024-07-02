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

  /*
	async query(query_name: string, fields: string[], body: string): Promise<Response> {
		if (fields.length === 0) {
		  return fetch(`${this.dataset_api}/query/${query_name}`, {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: body
		  });
		} else {
		  return fetch(`${this.dataset_api}/query/${query_name}/${fields.join('/')}`, {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: body
		  });
		}
	}
	*/
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
      console.log("DEBUG key_list ->", key_list);
      return key_list;
    }
    return [];
  }

  /**
   * create takes an key and object creating them via the datasetd JSON API.
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
   * @param {string} key, the key to the object you want to retrieve.
   * @returns {object} returns the object or undefined if it fails.
   */
  async read(key: string): Promise<object | undefined> {
    const resp = await this._ds.read(key);
    if (resp.ok && resp.body) {
      return await resp.json();
	  /*
	  console.log("DEBUG text ->", text, typeof(text));
	  const obj = JSON.parse(text);
      console.log("DEBUG obj ->", obj, typeof(obj));
	  return obj;
	  */
	}
    return undefined;
  }

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
}
