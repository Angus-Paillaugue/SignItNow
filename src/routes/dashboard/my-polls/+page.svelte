<script>
    import { Button } from '$lib/components'
    import { Modal, Spinner } from 'flowbite-svelte'
    import { goto } from '$app/navigation';

    export let data;

    const { user, polls } = data;

    let newPollModal = false;
    let newPollName = "";
    let newPollDescription = "";
    let newPollImageUrl = "";
    let newPollObjective = 0;
    let creatingNewPoll = false;

    $: newPollFormValid = () => {
        return newPollName.length > 0 && newPollDescription.length > 0 && newPollImageUrl.length > 0 && newPollObjective > 0;
    }

    async function createNewPoll(){
        if(newPollFormValid()){
            creatingNewPoll = true;
            const response = await fetch("/api/createNewPoll/", { method:"POST", body:JSON.stringify({ newPollName, newPollDescription, newPollImageUrl, newPollObjective }) });
            const data = await response.json();
            creatingNewPoll = false;
            const { success, uuid } = data;
            if(success){
                goto(`/poll/${uuid}`);
            }
        }
    }
</script>

<svelte:head>
	<title>My polls</title>
</svelte:head>

<div class="max-w-screen-xl mt-10 mx-auto w-full flex flex-col gap-4 p-4">
    <Button class="w-full max-w-lg mx-auto py-4" on:click={() => {newPollModal = !newPollModal}}>Create a new poll</Button>
    {#if polls.length == 0}
        <h1 class="text-5xl font-semibold">You haven't created a poll yet!</h1>
    {:else}
        <h1 class="text-5xl font-semibold">My polls</h1>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
            {#each polls as poll}
                <a href="/poll/{poll.id}" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200 relative">{poll.name}</a>
            {/each}
        </div>
    {/if}
</div>

<Modal title="Create a poll" bind:open={newPollModal}>
    <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" placeholder="The poll name" name="name" bind:value={newPollName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div>
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <textarea name="description" rows="4" bind:value={newPollDescription} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is this poll"></textarea>
    </div>
    <div>
        <label for="imageUrl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" placeholder="The poll main image url" name="imageUrl" bind:value={newPollImageUrl} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div>
        <label for="objective" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Objective</label>
        <input type="number" placeholder="The number of signatures" name="objective" bind:value={newPollObjective} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <svelte:fragment slot='footer'>
        <div class="w-full flex flex-row justify-between">
            <Button colorType="gray" on:click={() => {newPollModal = !newPollModal}}>Cancel</Button>
            <Button disabled={!newPollFormValid()} on:click={createNewPoll}>
                {#if creatingNewPoll}
                    <Spinner size={4} color="white" /> Creating
                {:else}
                    Create
                {/if}
            </Button>
        </div>
    </svelte:fragment>
</Modal>