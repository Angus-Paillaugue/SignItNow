<script>
    import { enhance } from '$app/forms'
    import { Button, Link } from '$lib/components';

    export let form;
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="max-w-md m-auto w-full">
    <form class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6" use:enhance method="POST">
        <h3>Log-in</h3>
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" placeholder="Username" name="username" value="{form ? form.formData.username : ""}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" placeholder="Password" name="password" value="{form ? form.formData.password : ""}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <Button class="w-full">Log-in</Button>

        {#if form?.success == false}
            <div class="alert alert-error">
                <i class="bi bi-x-circle shrink-0 h-6 w-6"></i>
                <span>{form.message}</span>
            </div>
        {/if}
        
        <Link href="/sign-in">Don't have an account ?</Link>
    </form>
</div>