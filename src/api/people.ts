import { httpClient } from '../config/axios';
import type { Person } from '../schemas/people.schema';
import { PeopleResponseSchema } from '../schemas/people.schema';

/* Query to search Star Wars characters by name.
cancels the in-flight HTTP request when a new keystroke fires or when the
component unmounts, preventing race conditions and wasting bandwidth. */
export const searchPeople = async (query: string, signal?: AbortSignal): Promise<Person[]> => {
  const response = await httpClient.get('/people/', {
    params: { search: query },
    signal,
  });

  const validated = PeopleResponseSchema.parse(response.data);
  return validated.results;
};
