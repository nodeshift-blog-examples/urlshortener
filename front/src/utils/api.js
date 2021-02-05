const Config = require("../config.json");

class API {
  url = Config.BASE_URL;

  async getServerStatus() {
    const status = await fetch(`${this.url}/health`)
      .then(resp => resp.json());
    return status;
  }

  async getUrls() {
    const urls = await fetch(`${this.url}/urls`)
      .then(resp => resp.json());

    return urls;
  }

  async addUrl(data) {
    if (data.url.substr(0, 4) !== "http") data.url = "http://" + data.url;
    if (data.route.substr(0, 1) !== "/") data.route = "/" + data.route;

    const result = await fetch(`${this.url}/urls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(resp=>resp.json());

    return result;
  }
}

export default new API();