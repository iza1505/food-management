import { RequestActionCreator } from "./RequestActionCreator";
import { API_URL } from "../configuration/index";

class RequestServiceCreator {
  baseURL = null;

  constructor() {
    this.baseURL = API_URL;
  }

  makeCall(type, { url, method, needAuth, data, headers = {}, ...rest }, meta) {
    return RequestActionCreator(
      type,
      {
        url: url,
        method,
        needAuth,
        data,
        headers,
        baseURL: this.baseURL,
        ...rest
      },
      meta
    );
  }

  get(type, { url, needAuth, headers, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "get",
        needAuth,
        headers,
        ...rest
      },
      meta
    );
  }

  post(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "post",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  put(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "put",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  delete(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "delete",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  static create(args) {
    return new RequestServiceCreator(args);
  }
}

export default RequestServiceCreator;
