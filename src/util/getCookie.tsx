import { RequestContext } from 'next/dist/server/base-server';

export const getCookie = async (context: RequestContext) => {
	const cookie = context.req ? context.req.headers.cookie : '';

	return cookie;
};
