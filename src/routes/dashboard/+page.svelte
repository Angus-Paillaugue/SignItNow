<script>
    export let data;

    const { user, pollsLength } = data;
</script> 

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="max-w-screen-xl mx-auto w-full flex flex-col mt-10 gap-4 p-4">
    <h1 class="text-5xl font-semibold">{user.username}</h1>
    <hr>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-4">

        
        <a href="/dashboard/my-polls" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200 relative">
            <i class="bi bi-clipboard-data"></i>
            My polls
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{pollsLength}</div>
        </a>

        <a href="/dashboard/bookmarks" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200 relative">
            <i class="bi bi-bookmark"></i>
            Bookmarks
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{user.bookmarks.length}</div>
        </a>

        <a href="/dashboard/settings" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200">
            <i class="bi bi-gear text-2xl"></i>
            Settings
        </a>

        <a href="/log-out" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200">
            <i class="bi bi-door-open text-2xl"></i>
            Log-out
        </a>


    </div>
</div>