import { HttpResponse, http } from 'msw';
import type { Person } from '../../schemas/people.schema';

export const MOCK_PEOPLE: Person[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
    homeworld: 'https://swapi.dev/api/planets/2/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:20:09.791000Z',
    edited: '2014-12-20T21:17:50.311000Z',
    url: 'https://swapi.dev/api/people/5/',
  },
];

export const handlers = [
  http.get('https://swapi.dev/api/people/', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';

    const results = MOCK_PEOPLE.filter((p) => p.name.toLowerCase().includes(search));

    return HttpResponse.json({
      count: results.length,
      next: null,
      previous: null,
      results,
    });
  }),
];
