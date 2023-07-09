<script>
    import { NavBar } from "$lib/components";
    import "../app.css";

    export let data;
    const { user, pathname } = data
</script>

<NavBar user={user} pathname={pathname} />
<main class="min-h-screen flex flex-col">
    <slot />
</main>