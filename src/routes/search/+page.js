import { redirect } from "@sveltejs/kit";

export const load = async ({ url }) => {
    const searchQuery = url.searchParams.get("searchQuery");
    if(searchQuery) throw redirect(301, `/search/${searchQuery}`); else throw redirect(301, `/`);
};