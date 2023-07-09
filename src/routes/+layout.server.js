export async function load({ locals, url }) {
    const { pathname } = url;
    return { user: locals.user, pathname }
};