import { HttpMethod } from './constants';
import { getBaseUrl } from './getBaseUrl';

const baseUrl = getBaseUrl();

function parseResponseBody(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

function getHeaders() {
  return {
    'Content-Type': 'application/json'
  };
}

export async function post(path, body) {
  const url = new URL(path, baseUrl);
  return await fetch(url, {
    method: HttpMethod.Post,
    headers: getHeaders(),
    body: JSON.stringify(body)
  }).json();
}

export async function get(path, id, params) {
  const url = id
    ? new URL(`${path}/${id}`, baseUrl)
    : new URL(`${path}`, baseUrl);

  const response = await fetch(url, {
    method: HttpMethod.Get,
    headers: getHeaders()
  }).json();

  const text = await response.text();
  return { response, body: parseResponseBody(text) };
}

export async function put(path, id, body) {
  const url = new URL(`${path}/${id}`, baseUrl);
  return await fetch(url, {
    method: HttpMethod.Put,
    headers: getHeaders(),
    body: JSON.stringify(body)
  }).json();
}

export async function remove(path, id) {
  const url = new URL(`${path}/${id}`, baseUrl);
  return await fetch(url, {
    method: HttpMethod.Delete,
    headers: getHeaders()
  }).json();
}
