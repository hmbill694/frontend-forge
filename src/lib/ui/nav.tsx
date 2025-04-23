import { Html } from "@elysiajs/html";

export default function NavBar() {
  return (
    <nav class="bg-blue-500 text-white py-4 px-6 sticky top-0 z-10">
      <div class="container mx-auto flex items-center justify-between">
        <a href="#" class="text-xl font-semibold">
          T0
        </a>
        <div class="space-x-4">
          <a href="/" class="hover:text-gray-200">
            Home
          </a>
          <a href="/generated-docs" class="hover:text-gray-200">
            My Documents
          </a>
        </div>
      </div>
    </nav>
  );
}
