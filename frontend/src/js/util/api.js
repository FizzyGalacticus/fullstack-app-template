const protocol = process.env.API_PROTOCOL ?? 'http';
const host = process.env.API_HOST ?? 'localhost';
const port = process.env.API_PORT ?? 10001;

const getApiBase = () => `${protocol}://${host}:${port}`;

const normalizeQuery = query =>
    typeof query !== 'string'
        ? Object.entries(query)
              .reduce((acc, [key, value]) => [...acc, [key, value].join('=')], [])
              .join('&')
        : query;

const normalizePayload = payload => (typeof payload === 'object' ? JSON.stringify(payload) : payload);

export const request = async (path, { query = '', payload, body, ...options } = {}) => {
    body = normalizePayload(payload || body);

    const base = getApiBase();

    const route = [`${base}/${path}`, normalizeQuery(query)].filter(s => s).join('?');

    let response = await fetch(route, { ...options, body });

    response = await response.text();

    try {
        response = JSON.parse(response);
    } catch (e) {
        // Just eat it
    }

    if (Object.getOwnPropertyNames(response).includes('statusCode')) {
        const { statusCode, message } = response;

        if (!isNaN(statusCode) && (statusCode < 200 || statusCode > 299)) {
            throw new Error(message);
        }

        response = message;
    }

    return response;
};

export const post = (path, options = {}) => request(path, { ...options, method: 'POST' });

export default { request, post };
