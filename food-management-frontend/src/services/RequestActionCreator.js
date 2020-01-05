export const RequestActionCreator = (type, { url, method, needAuth, data, headers, baseURL, ...rest }, meta) => ({
  type,
  payload: {
    url,
    method,
    needAuth,
    data,
    headers,
    baseURL,
    ...rest
  },
  meta: { ...meta, apiRequest: true }
});
