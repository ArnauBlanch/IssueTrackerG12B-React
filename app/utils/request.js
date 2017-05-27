import 'whatwg-fetch';
import ApiUsers from './ApiUsers';
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} endpoint       The endpoint we want to request
 * @param  {string} method         Method of the request
 * @param  {object} body           The body of the request
 * @param  {bool} withAuth         Indicates if authentication is mandatory in the request
 * @return {object}           The response data
 */
export default function request(endpoint, method, body, withAuth) {
  const headers = {
    Accept: 'application/json',
  };
  if (body) headers['Content-Type'] = 'application/json';
  if (localStorage.getItem('authUser') !== null) {
    headers['X-API-Key'] = ApiUsers[localStorage.getItem('authUser')].apiKey;
  } else if (withAuth) {
    throw new Error('Missing authentication');
  }

  const options = { method, headers, mode: 'cors' };
  if (body) options.body = JSON.stringify(body).toString();
  return fetch(`https://issue-tracker-g12b.herokuapp.com${endpoint}`, options);
}
