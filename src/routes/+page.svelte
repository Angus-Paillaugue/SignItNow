<script>
    import { formatDate } from '$lib/utils'
	import { Button } from "$lib/components"

    export let data;

    const { polls } = data;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="relative isolate px-6 flex flex-col justify-center items-center lg:px-8 h-screen">
	<div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
		<div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
	</div>
	<div class="mx-auto max-w-screen-xl py-32 sm:py-48 lg:py-56 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:grid-rows-1 grid-rows-2">
		<!-- <div class="hidden sm:mb-8 sm:flex sm:justify-center">
			<div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
			Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
			</div>
		</div> -->
		<div class="text-center col-span-1 lg:col-span-2">
			<h1 class="text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl">SignItNow</h1>
			<h3 class="mt-6">A tool to change the world</h3>
			<p class="mt-6 text-lg leading-8">Here, you can create and sign petition to hopefully change aspects of the world.</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<Button href="/sign-in" >Get started <i class="bi bi-arrow-right"></i></Button>
			</div>
		</div>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img class="col-span-1 max-lg:row-start-1 max-h-full" src="/sign-up.svg"/>
	</div>
</div>
  

{#if polls.length > 0}	
	<section class="max-w-screen-xl mx-auto w-full p-4">
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