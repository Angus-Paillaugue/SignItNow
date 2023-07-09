<script>
    import { formatDate } from '$lib/utils';

    export let data;

    const { query, results } = data;
</script>

<svelte:head>
	<title>{query}</title>
</svelte:head>

{#if results}
    <section class="max-w-7xl mx-auto w-full">
        <div class="w-full flex md:snap-none snap-x flex-row gap-6 mx-auto p-3 pb-4 overflow-x-auto">
            {#each results as poll}
                {#if poll.type == "user"}
                    <a href="/u/{poll.username}" class="h-fit flex-none flex justify-center items-center p-4 py-6 rounded-2xl bg-transparent border transition-all gap-4 duration-200 relative w-fit">
                        <div class="flex-shrink-0">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img class="w-10 h-10 rounded-full" src="{poll.profilePicture}" alt="Profile picture">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-gray-900 truncate dark:text-white">
                                {poll.username}
                            </h4>
                        </div>
                    </a>
                {/if}
            {/each}
        </div>
        <div class="flex flex-col gap-4 p-4 pb-6">
            {#each results as poll}
                {#if poll.type == "poll"}
                    <a href="/poll/{poll.id}" class="flex-none w-72 sm:w-96 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:scale-[102%] transition-all duration-300">
                        <img src="{poll.imageUrl}" class="w-auto blogCoverImg" alt="Post banner">
                        <div class="p-4 flex flex-col gap-4 items-start">
                            <h3>{poll.name}</h3>
                            <p class="line-clamp-2 text-ellipsis">{poll.description}</p>
                            <div class="flex flex-row gap-2 items-center">
                                <img src="{poll.user.profilePicture || "../defaultProfilePicture.png"}" class="h-12 w-12 rounded-full" alt="{poll.user.username}'s' profile picture">
                                <div class="flex flex-col justify-center items-start">
                                    <p class="text-lg font-bold">{poll?.user?.username || "No username"}</p>
                                    <small>Posted {formatDate(poll.createdAt)}</small>
                                </div>
                            </div>
                        </div>
                    </a>
                {/if}
            {/each}
        </div>
    </section>
{:else}
    <h2>No results for "{query}"</h2>
{/if}