export default function NavComponent() {
    return <nav class="bg-green-700">
        <ul class="container flex items-center p-3 text-gray-200">
            <li class={`border-b-2 mx-1.5 sm:mx-6`}>
                <a href="/">SchulwegWarnung</a>
            </li>
            <li class={`mx-1.5 sm:mx-6`}>
                <a href="https://github.com/amraleth/sww" target={"_blank"} rel={"noopener noreferrer"}>Github</a>
            </li>
        </ul>
    </nav>
}