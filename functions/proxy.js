export async function onRequest(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get('url');

  if (!target) {
    return new Response('Missing url parameter', { status: 400 });
  }

  const response = await fetch(target);
  const body = await response.text();

  return new Response(body, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  });
}