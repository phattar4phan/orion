interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404) return response;

    return env.ASSETS.fetch(`${url.origin}/index.html`);
  },
};
