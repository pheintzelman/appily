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

async function getResponse(response) {
  const text = await response.text();
  const body = parseResponseBody(text);

  if (!response.ok) {
    throw new Error(body);
  }

  return { response, body };
}

function getHeaders() {
  return {
    'Content-Type': 'application/json'
  };
}

export async function post(path, body) {
  const url = new URL(path, baseUrl);

  const response = await fetch(url, {
    method: HttpMethod.Post,
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  return await getResponse(response);
}

export async function get(path, id, params) {
  const urlPath = id ? `${path}/${id}` : path;
  const url = new URL(urlPath, baseUrl);

  const response = await fetch(url, {
    method: HttpMethod.Get,
    headers: getHeaders()
  });

  return await getResponse(response);
}

export async function put(path, id, body) {
  const url = new URL(`${path}/${id}`, baseUrl);
  const response = fetch(url, {
    method: HttpMethod.Put,
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  return await getResponse(response);
}

export async function remove(path, id) {
  const url = new URL(`${path}/${id}`, baseUrl);
  const response = fetch(url, {
    method: HttpMethod.Delete,
    headers: getHeaders()
  });

  return await getResponse(response);
}
