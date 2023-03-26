// Gets the query string params
// E.g. query.queryparam
// From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export const query = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop)
})
