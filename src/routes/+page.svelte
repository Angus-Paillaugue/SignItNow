<script>
    import { formatDate } from '$lib/utils'

    export let data;

    const { polls } = data;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="grid">

</div>

{#if polls.length > 0}	
	<section class="max-w-7xl mx-auto w-full p-4">
		<h2 class="ml-4 mt-10">Our latest petitions</h2>
		<div class="flex flex-no-wrap overflow-x-auto scrolling-touch items-start gap-4 p-4 pb-6 ">
			{#each polls as poll}
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
			{/each}
		</div>
	</section>
{/if}