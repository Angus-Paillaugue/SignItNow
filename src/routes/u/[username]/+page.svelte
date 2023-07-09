<script>
    import { Button, Link } from "$lib/components";

    export let data;

    const { currentUser, user, signatures } = data;
    $: isInBookmarks = user.bookmarks.filter(bookmark => bookmark.data == currentUser.username).length == 1
    let fullBio = false;
</script>

<div class="w-full relative bg-no-repeat bg-center bg-cover max-h-64 lg:max-h-80" style="height: 25vw; background-image: url('{currentUser.banner}');">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src="{currentUser.profilePicture}" data-user-username="{currentUser.username}" alt="Profile picture" class="rounded-full lg:h-36 lg:w-36 h-24 w-24 absolute bottom-0 left-5 translate-y-3/4">
</div>
<div class="lg:h-[108px] h-[70px] mb-2 flex justify-between items-center lg:p-4 p-2 dark:text-white text-neutral-900 lg:pl-44 pl-32">
    <div class="h-full flex items-start">
        <h1 class="lg:text-4xl text-2xl">{currentUser.username}</h1>
    </div>
    <Button colorType="gray" on:click={async() => {
        const response = await fetch("/api/toggleBookmark/", { method:"POST", body:JSON.stringify({ bookmarkData:currentUser.username, bookmarkType:"user"}) });
        const data = await response.json();
        const { success } = data;
        if(success) isInBookmarks = !isInBookmarks;
    }} >
        {#if isInBookmarks}
            <i class="bi bi-bookmark-check text-2xl"></i>
        {:else}
            <i class="bi bi-bookmark text-2xl"></i>
        {/if}
    </Button>
</div>
<div class="pl-5">
    <p class="text-lg">
        {#if fullBio}
            {@html currentUser.bio}
        {:else}
            {@html currentUser.bio.split("<br />")[0]}
        {/if}
    </p>
    <Link class="mb-2" on:click={() => {fullBio = !fullBio}}>
        {#if fullBio}
            Show less <i class="bi bi-chevron-compact-up"></i>
        {:else}
            Show More <i class="bi bi-chevron-compact-down"></i>
        {/if}
    </Link>

    <hr>
    {#if currentUser.signatures.length == 0}
        <h3>{currentUser.username} hasn't signed any petitions</h3>
    {:else}
        <h3>Should i show the petitions the user has signed ?</h3>
        <h6 class="font-normal">Anyways, I don't care. Here there are</h6>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-2 max-w-screen-xl">
            {#each signatures as signature}
                <a href="/poll/{signature.poll.id}" class="h-fit  flex flex-col justify-center w-full rounded-2xl bg-transparent border hover:shadow-xl transition-all hover:-translate-y-1 duration-200 relative">
                    <img class="rounded-t-lg" src="{signature.poll.imageUrl}" alt="" />
                    <div class="p-4 py-6">
                        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 transition-all">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all {signature.poll.signatures == 0 ? "opacity-0" : "opacity-100"}" style="width: {signature.poll.signatures/signature.poll.objective*100}%"> {signature.poll.signatures/signature.poll.objective*100}%</div>
                        </div>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{signature.poll.name}</h5>
                        <p class="line-clamp-3 text-ellipsis">{signature.poll.description}</p>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>