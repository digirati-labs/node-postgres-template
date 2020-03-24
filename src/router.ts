import { TypedRouter } from './utility/typed-router';
import {ping, pingPost} from './routes/ping';

export const router = new TypedRouter({
  // Normal route
  'ping': [TypedRouter.GET, '/ping', ping],
  // Example with post body matching JSON Schema (will be validated)
  'ping-post': [TypedRouter.POST, '/ping', pingPost, 'example'],
});
