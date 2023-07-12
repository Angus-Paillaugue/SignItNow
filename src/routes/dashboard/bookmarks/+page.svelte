<script>
    export let data;

    const { bookmarks } = data;
</script>

<svelte:head>
	<title>Bookmarks</title>
</svelte:head>

<div class="max-w-screen-xl mt-10 mx-auto w-full flex flex-col gap-4 p-4">
    {#if bookmarks.length == 0}
        <h1 class="text-5xl font-semibold">You haven't bookmarked anything yet!</h1>
    {:else}
        <h1 class="text-5xl font-semibold">My bookmarks</h1>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
            {#each bookmarks as bookmark}
                {#if bookmark.type == "user"}
                    <a href="/u/{bookmark.data}" class="h-fit flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border hover:shadow-xl transition-all gap-4 hover:-translate-y-1 duration-200 relative">
                        <div class="flex-shrink-0">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img class="w-10 h-10 rounded-full" src="{bookmark.user.profilePicture}" alt="Profile picture">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-gray-900 truncate dark:text-white">
                                {bookmark.user.username}
                            </h4>
                        </div>
                    </a>
                {:else}
                    <a href="/poll/{bookmark.data}" class="h-fit  flex flex-col justify-center w-full rounded-2xl bg-transparent border hover:shadow-xl transition-all hover:-translate-y-1 duration-200 relative">
                        <img class="rounded-t-lg" src="{bookmark.poll.imageUrl}" alt="" />
                        <div class="p-4 py-6">
                            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 transition-all">
                                <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all {bookmark.poll.signatures == 0 ? "opacity-0" : "opacity-100"}" style="width: {bookmark.poll.signatures/bookmark.poll.objective*100}%"> {bookmark.poll.signatures/bookmark.poll.objective*100}%</div>
                            </div>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bookmark.poll.name}</h5>
                            <p class="line-clamp-3 text-ellipsis">{bookmark.poll.description}</p>
                        </div>
                    </a>
                {/if}
            {/each}
        </div>
    {/if}
</div>