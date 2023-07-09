<script>
    import Button from "$lib/components/Button.svelte";
    import { enhance } from '$app/forms'

    export let data;
    export let form;

    const { poll, creator, user, pathname } = data;

    $: hasSignedPetition = form?.isNowSigned ??  user ? user?.signatures.includes(poll.id) : false;

    $: signatures = form?.signatures ?? poll.signatures;
</script>

<div class="w-full relative bg-no-repeat bg-center bg-cover max-h-64 lg:max-h-80" style="height: 25vw; background-image: url('{poll.imageUrl}');">
</div>
<div class="p-4 grid lg:grid-cols-12 grid-cols-1">
    <div class="lg:col-span-8 col-span-1 pr-4">
        <h1>{poll.name}</h1>

        <p class="mt-4 flex flex-row items-center">Started by <a href="/u/{creator.username}" class="inline-flex flex-row items-center"><img src="{creator.profilePicture}" class="h-5 w-5 inline-block mx-2" alt=""><b>{creator.username}</b></a></p>
        
<pre class="mt-4">
{poll.description}
</pre>
    </div>
    <div class="lg:col-span-4 col-span-1 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1>Sign this petition</h1>
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-6 transition-all">
            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all {signatures == 0 ? "opacity-0" : "opacity-100"}" style="width: {signatures/poll.objective*100}%"> {signatures/poll.objective*100}%</div>
        </div>
        <p>{signatures} signatures</p>
        <form method="POST" use:enhance class="mt-6">
            {#if user}
                <Button class="w-full" type="submit" >{hasSignedPetition ? "Cancel signature" : "Sign"}</Button>
            {:else}
                <p>You need to be logged-in to be able to sign this petition</p>
                <Button class="w-full" href="/log-in?redirect={pathname}" >Log-in</Button>
            {/if}
            {#if form?.success == false}
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-medium">Error!</span> {form.message}
                </div>
            {/if}
        </form>
    </div>
</div>