/**
 * Vercel serverless entry point.
 *
 * Catches every `/api/*` request and hands it to the shared Express app,
 * which defines `/api/health`, `/api/story/expand`, and
 * `/api/story/character-qa`. The local server in `server.ts` is not started
 * because it is imported, not executed directly.
 */

import app from '../server';

export default app;
