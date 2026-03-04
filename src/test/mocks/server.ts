import { setupServer } from 'msw/node';
import { handlers } from './handlers';


/* This is the MSW Node server used in Vitest.
   Tests won't hit the real network. All requests are intercepted here.
  */
export const server = setupServer(...handlers);
