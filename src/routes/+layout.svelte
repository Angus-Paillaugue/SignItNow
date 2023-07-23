<script>
    import { NavBar } from "$lib/components";
    import "../app.css";

    export let data;
    let user;
    let pathname;
    $: user = data.user;
    $: pathname = data.pathname;
</script>

<NavBar user={user} pathname={pathname} />
<main class="min-h-screen flex flex-col">
    <slot />
</main>