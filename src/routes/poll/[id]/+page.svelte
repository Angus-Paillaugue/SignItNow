<script>
    import Button from "$lib/components/Button.svelte";
    import { enhance } from '$app/forms'
    import { Modal } from 'flowbite-svelte'

    export let data;
    export let form;

    const { poll, creator, user, pathname, isCreator } = data;
    $: hasSignedPetition = form?.isNowSigned ??  user ? user?.signatures.includes(poll.id) : false;
    $: signatures = form?.signatures ?? poll.signatures;
    $: isInBookmarks = user?.bookmarks?.filter(bookmark => bookmark.data == poll.id).length == 1
    let editPollModal = false;
    let editName = poll.name;
    let editDescription = poll.description;
    let editImageUrl = poll.imageUrl;
    let editObjective = poll.objective;

    $: editPollFormValid = () => {
        return editName.length > 0 && editDescription.length > 0 && editImageUrl.length > 0 && editObjective > 0;
    }

    async function editPoll(){
        if(editPollFormValid()){
            const response = await fetch("/api/editPoll/", { method:"POST", body:JSON.stringify({ editName, editDescription, editObjective, editImageUrl, id:poll.id }) });
            const data = await response.json();
            const { success } = data;
            if(success){
                poll.name = editName;
                poll.description = editDescription;
                poll.imageUrl = editImageUrl;
                editPollModal = !editPollModal
            }
        }
    }
</script>

{#if isCreator}
    <Button class="absolute top-4 right-4 z-30" colorType="gray" on:click={() => {editPollModal = !editPollModal}}><i class="bi bi-pencil-square text-2xl"></i></Button>
{/if}

<div class="w-full relative bg-no-repeat bg-center bg-cover max-h-64 lg:max-h-80 h-[50vw] md:h-[25vw]" style=" background-image: url('{poll.imageUrl}');">
</div>
<div class="p-4 grid lg:grid-cols-12 grid-cols-1">
    <div class="lg:col-span-8 col-span-1 pr-4">
        <div class="flex flex-row justify-between">
            <h1>{poll.name}</h1>

            <Button colorType="gray" on:click={async() => {
                const response = await fetch("/api/toggleBookmark/", { method:"POST", body:JSON.stringify({ bookmarkData:poll.id, bookmarkType:"petition"}) });
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

<Modal title="Edit " bind:open={editPollModal}>
    <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" placeholder="The poll name" name="name" bind:value={editName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div>
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <textarea name="description" rows="4" bind:value={editDescription} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is this poll"></textarea>
    </div>
    <div>
        <label for="imageUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" placeholder="The poll main image url" name="imageUrl" bind:value={editImageUrl} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div>
        <label for="objective" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objective</label>
        <input type="number" placeholder="The number of signatures" name="objective" bind:value={editObjective} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <svelte:fragment slot='footer'>
        <div class="w-full flex flex-row justify-between">
            <Button colorType="gray" on:click={() => {editPollModal = !editPollModal}}>Cancel</Button>
            <Button on:click={editPoll}>Update</Button>
        </div>
    </svelte:fragment>
</Modal>