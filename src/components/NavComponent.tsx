export default function NavComponent() {
    return (
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-stretch justify-start">
                        <div class="flex shrink-0 items-center">
                            <img class="h-8 w-auto"
                                 src="https://api.schulwegwarnung.de/api/files/pbc_3607937828/j0k18bec15hj2ii/logo_z1c3ovw7id.svg"
                                 alt="Logo"/>
                            <span class={"text-white pl-2 font-bold"}>SchulwegWarnung</span>
                        </div>
                        <div class="sm:ml-6 sm:block">
                            <div class="flex space-x-4 pl-4">
                                <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                   aria-current="page">Karte</a>
                                <a href="https://api.schulwegwarnung.de/_/"
                                   class="hidden md:block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                   target={"_blank"}>Admin</a>
                                <a href="https://github.com/amraleth/sww"
                                   class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                   target={"_blank"}>GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}