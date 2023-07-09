<script>
    export let user;
    export let pathname;

    let showSeachModal = false;
    let accountDropDown = false;
</script>


<nav class="sm:flex-col p-2 flex-row items-center justify-between sm:w-16 w-screen sm:h-screen h-16 text-gray-700 bg-gray-100 dark:bg-gray-800 lg:w-40 flex fixed bottom-0 left-0 z-40">
    <div class="w-full flex flex-row sm:flex-col">
        <div class="w-full">
            <a href="/" class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100"><i class="bi bi-house text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Home</span></a>
        </div>
        <div class="w-full">
            <button class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100" on:click={() => {showSeachModal = !showSeachModal}} name="revealSearchBar"><i class="bi bi-search text-2xl" ></i><span class="ml-2 text-sm font-medium lg:block hidden">Search</span></button>
        </div>
    </div>
    <div class="relative w-full">
        {#if user}
            <button on:click={() => {accountDropDown = !accountDropDown}} class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100" type="button" name="openUserMenu"><i class="bi bi-person-circle text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Account</span></button>
        
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div  class="absolute bottom-0 right-0 translate-x-full z-10 {accountDropDown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" on:click={() => {accountDropDown = !accountDropDown}}>
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="navbarUserDropdownButton">
                    <li>
                        <a href="/log-out{pathname.startsWith("/log-out") ? "" : `?redirect=${pathname}`}" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex flex-row gap-2 items-center w-full"><i class="bi bi-door-closed text-lg"></i>Sign out</a>
                    </li>
                    <li>
                        <a href="/settings" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex flex-row gap-2 items-center w-full"><i class="bi bi-sliders text-lg"></i>Settings</a>
                    </li>
                    <li>
                        <a href="/bookmarks" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex flex-row gap-2 items-center w-full"><i class="bi bi-bookmark text-lg"></i>Bookmarks</a>
                    </li>
                    <li>
                        <a href="/dashboard" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex flex-row gap-2 items-center w-full"><i class="bi bi-person-circle text-lg"></i>Dashboard</a>
                    </li>
                </ul>
            </div>
        {:else}
            <a href="/log-in{pathname.startsWith("/log-in") ? "" : `?redirect=${pathname}`}" on:click={() => {accountDropDown = !accountDropDown}} class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100"><i class="bi bi-person-circle text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Log-in</span></a>
        {/if}
    </div>
</nav>

<form class="flex items-center fixed top-0 sm:left-16 lg:left-40 left-0 right-0 p-4 bg-gray-100 dark:bg-gray-800 {showSeachModal ? "translate-y-0" : "-translate-y-full"} transition-transform shadow-md" action="/search">   
    <label for="navSearchInput" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-700 dark:text-gray-100">
            <i class="bi bi-search text-md"></i>
        </div>
        <input type="text" id="navSearchInput" name="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users or posts" required autocomplete="off">
        <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-700 dark:text-gray-100" id="navVoiceSearchButton" name="Voice search"><i class="bi bi-mic"></i></button>
    </div>
    <button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-gray-100" on:click={() => {showSeachModal = !showSeachModal}}><i class="bi bi-search text-md"></i></button>
</form>