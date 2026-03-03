import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});
