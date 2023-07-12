<script>
    import Button from '$lib/components/Button.svelte';
    import { Tabs, TabItem, Tooltip, Modal  } from 'flowbite-svelte';
    import { enhance } from '$app/forms'

    export let data;

    const { user } = data;

    let username = user.username;
    let email = user.email
    let receiveMails = user.receiveMails;
    let deleteAccountModal = false;
    let TabItemClasses = "flex flex-col gap-6";
</script>

<div class="max-w-md mx-auto w-full mt-10">
    <h1 class="text-5xl font-semibold">Settings</h1>
    <div class="w-full mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6">
        <Tabs style="full" defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700 w-full">
            <TabItem class="w-full" open>
                <span slot="title">Profile</span>
                <form use:enhance method="POST" action="?/save" class={TabItemClasses}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input type="email" placeholder="E-mail" name="email" bind:value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username
                            <i class="bi bi-info-circle ml-1"></i>
                            <Tooltip class="text-center">You can <b>not</b> change your username<br>You should have thought twice</Tooltip>
                        </label>
                        <input type="text" placeholder="Username" name="username" readonly bind:value={username} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <Button class="w-full" type="submit">Save</Button>
                </form>
            </TabItem>
            <TabItem class="w-full">
                <span slot="title">Password</span>
                <p class={TabItemClasses}>You can not change your password for now</p>
            </TabItem>
            <TabItem class="w-full">
                <span slot="title">E-mails</span>
                <form class={TabItemClasses} >
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receive e-mail notifications</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="receiveMails" class="sr-only peer" bind:checked={receiveMails} on:change={async() => {await fetch("?/receiveMails", { method: 'POST', body: JSON.stringify({receiveMails}) });}}>
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </form>
            </TabItem>
            <TabItem class="w-full p-0">
                <span slot="title">Danger</span>
                <div class={TabItemClasses}>
                    <Button colorType="red" class="w-full" type="button" on:click={() => {deleteAccountModal = !deleteAccountModal}}>Delete account <i class="bi bi-exclamation-triangle"></i></Button>
                </div>
            </TabItem>
        </Tabs>
    </div>
</div>

<Modal title="Delete account" bind:open={deleteAccountModal}>
    <p>Are you sure you want to delete your account</p>
    <svelte:fragment slot='footer'>
        <form use:enhance action="?/deleteAccount" method="POST" class="w-full flex flex-row justify-between">
            <Button colorType="gray" type="button" on:click={() => {deleteAccountModal = !deleteAccountModal}}>Cancel</Button>
            <Button colorType="red" type="submit">Delete</Button>
        </form>
    </svelte:fragment>
</Modal>