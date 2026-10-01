import assert from 'node:assert/strict';
import test from 'node:test';
import app from '../src/app.js';

test('GET /api/health returns a successful health response', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
});
