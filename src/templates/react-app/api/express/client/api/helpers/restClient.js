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

async function processResponse(responsePromise) {
  const response = await responsePromise;
  const text = await response.text();
  const body = parseResponseBody(text);

  if (!response.ok) {
    throw new Error(body);
  }

  return body;
}

function getHeaders(inMemory) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (inMemory) {
    return { ...headers, 'In-Memory': 'true' };
  }

  return headers;
}

function getInMemorySetting(method) {
  const sessionStorageInMemory = sessionStorage.getItem('inMemory');
  const inMemory = JSON.parse(sessionStorageInMemory ?? '{}');
  const { all: inMemoryAll, [method]: inMemoryMethod } = inMemory;

  return inMemoryAll || inMemoryMethod;
}

export async function post(path, body) {
  const url = new URL(path, baseUrl);
  const inMemory = getInMemorySetting('post');

  const response = await fetch(url, {
    method: HttpMethod.Post,
    headers: getHeaders(inMemory),
    body: JSON.stringify(body)
  });

  return await processResponse(response);
}

export async function get(path, id, params) {
  const urlPath = id !== undefined ? `${path}/${id}` : path;
  const url = new URL(urlPath, baseUrl);
  const inMemory = getInMemorySetting('get');

  const response = await fetch(url, {
    method: HttpMethod.Get,
    headers: getHeaders(inMemory)
  });

  return await processResponse(response);
}

export async function put(path, body) {
  const url = new URL(path, baseUrl);
  const inMemory = getInMemorySetting('put');

  const response = fetch(url, {
    method: HttpMethod.Put,
    headers: getHeaders(inMemory),
    body: JSON.stringify(body)
  });

  return await processResponse(response);
}

export async function remove(path, id) {
  const url = new URL(`${path}/${id}`, baseUrl);
  const inMemory = getInMemorySetting('remove');

  const response = fetch(url, {
    method: HttpMethod.Delete,
    headers: getHeaders(inMemory)
  });

  return await processResponse(response);
}
