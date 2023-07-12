<script>
    import { Dropdown, DropdownItem } from 'flowbite-svelte'

    export let user;
    export let pathname;

    let showSearchModal = false;
    let placement='right'
</script>


<nav class="sm:flex-col p-2 flex-row items-center justify-between sm:w-16 w-screen sm:h-screen h-16 text-gray-700 bg-gray-100 dark:bg-gray-800 lg:w-40 flex fixed bottom-0 left-0 z-40">
    <div class="w-full flex flex-row sm:flex-col">
        <div class="w-full">
            <a href="/" class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100"><i class="bi bi-house text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Home</span></a>
        </div>
        <div class="w-full">
            <button class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100" on:click={() => {showSearchModal = !showSearchModal}} name="revealSearchBar"><i class="bi bi-search text-2xl" ></i><span class="ml-2 text-sm font-medium lg:block hidden">Search</span></button>
        </div>
    </div>
    <div class="relative sm:w-full">
        {#if user}

            <button data-placement="right-end" class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100" type="button"><i class="bi bi-person-circle text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Account</span></button>
            <Dropdown {placement} triggeredBy="[data-placement]" >
                <DropdownItem href="/log-out{pathname.startsWith("/log-out") ? "" : `?redirect=${pathname}`}" class="flex flex-row gap-2 items-center"><i class="bi bi-door-closed text-lg"></i>Sign out</DropdownItem>
                <DropdownItem href="/dashboard/settings" class="flex flex-row gap-2 items-center"><i class="bi bi-sliders text-lg"></i>Settings</DropdownItem>
                <DropdownItem href="/dashboard/bookmarks" class="flex flex-row gap-2 items-center"><i class="bi bi-bookmark text-lg"></i>Bookmarks</DropdownItem>
                <DropdownItem href="/dashboard" class="flex flex-row gap-2 items-center" slot="footer"><i class="bi bi-person-circle text-lg"></i>Dashboard</DropdownItem>
            </Dropdown>
        {:else}
            <a href="/log-in{pathname.startsWith("/log-in") ? "" : `?redirect=${pathname}`}" class="flex items-center justify-center lg:justify-start w-12 h-12 rounded hover:bg-gray-300 dark:hover:bg-gray-600 lg:w-full lg:px-3 text-neutral-700 dark:text-gray-100"><i class="bi bi-person-circle text-2xl"></i><span class="ml-2 text-sm font-medium lg:block hidden">Log-in</span></a>
        {/if}
    </div>
</nav>

<form class="flex items-center fixed top-0 sm:left-16 lg:left-40 left-0 right-0 p-4 bg-gray-100 dark:bg-gray-800 {showSearchModal ? "translate-y-0" : "-translate-y-full"} transition-transform shadow-md z-40"  method="GET" action="/search">   
    <label for="searchQuery" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-700 dark:text-gray-100">
            <i class="bi bi-search text-md"></i>
        </div>
        <input type="text" id="searchQuery" name="searchQuery" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users or posts" required autocomplete="off">
        <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-700 dark:text-gray-100" id="navVoiceSearchButton" name="Voice search"><i class="bi bi-mic"></i></button>
    </div>
    <button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-gray-100" on:click={() => {showSearchModal = !showSearchModal}}><i class="bi bi-search text-md"></i></button>
</form>