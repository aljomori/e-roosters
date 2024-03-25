import Log from '@/src/lib/logger';
import { API_URL, siteSessionTokenKeyName } from '../config/environment';
import { getCookie } from './cookies';

export interface APIResponse<R> {
  status: 'success' | 'failure';
  data: R;
  errorCode: string;
  errorMessage: string;
}

export class ApiError {
  public status: string;
  public errorCode: string;
  public errorMessage: string;

  constructor(args?: { status: string; errorCode: string; errorMessage: string }) {
    this.status = args?.status || 'unknown';
    this.errorCode = args?.errorCode || 'no_code';
    this.errorMessage = args?.errorMessage || 'No error message provided';
  }

  get(): string {
    return `Error [${this.errorCode}]: ${this.errorMessage} (Status: ${this.status})`;
  }
}

type THeaders = Record<string, string>;

const log = Log.getLogger('fetch');

function generateHeaders(isPublic = false, customHeaders?: THeaders): THeaders {
  const headers: THeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  };

  if (isPublic) {
    return headers;
  }
  const siteSessionToken = getCookie(siteSessionTokenKeyName);

  headers.Authorization = `Bearer ${siteSessionToken}`;

  return headers;
}

/**
 * Simple abstraction to make a GET request that expect to have a JSON response following a common convention.
 */
export function getJsonRequest<R>(path: string, isPublic = false, customAPIUrl?: string): Promise<R> {
  return window
    .fetch(`${customAPIUrl || API_URL}${path}`, { headers: generateHeaders(isPublic) })
    .then(response => processJsonResponse<R>(response));
}

export function postJsonRequest<R>(path: string, body: unknown, isPublic = false, customAPIUrl?: string): Promise<R> {
  return window
    .fetch(`${customAPIUrl || API_URL}${path}`, {
      method: 'post',
      headers: generateHeaders(isPublic),
      body: JSON.stringify(body),
    })
    .then(response => processJsonResponse<R>(response));
}

export function putJsonRequest<R>(path: string, body: unknown, isPublic = false, customAPIUrl?: string): Promise<R> {
  return window
    .fetch(`${customAPIUrl || API_URL}${path}`, {
      method: 'put',
      headers: generateHeaders(isPublic),
      body: JSON.stringify(body),
    })
    .then(response => processJsonResponse<R>(response));
}

export function deleteRequest<R>(path: string, isPublic = false, customAPIUrl?: string): Promise<R> {
  return window
    .fetch(`${customAPIUrl || API_URL}${path}`, {
      method: 'delete',
      headers: generateHeaders(isPublic),
    })
    .then(response => processJsonResponse<R>(response));
}

function processJsonResponse<R>(response: Response): Promise<R> {
  if (response.ok) {
    return response.json().then(json => {
      log.debug('processJsonResponse: got json for url:', response.url, json);
      return json;
    });
  }

  return processErrorResponse(response);
}

function processErrorResponse(response: Response): Promise<never> {
  if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
    return response.json().then(error => {
      log.error('processJsonResponse: got an error from:', response.url, ', error:', error);

      throw new ApiError({
        status: `${error.status}`,
        errorMessage: `${error.errorMessage}`,
        errorCode: `${error.errorCode}`,
      });
    });
  }

  // We could not parse the body, just trow with response status/text
  log.error('processJsonResponse: go2t an error from:', response.url, response.status, response.statusText);
  throw new ApiError({
    status: `${response.status}`,
    errorMessage: 'Error during the fetch.',
    errorCode: `${response.status}`,
  });
}
