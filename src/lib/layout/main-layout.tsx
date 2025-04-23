import NavBar from "../ui/nav";
import { ReactNode } from "@tanstack/react-router";

export type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-grow py-8 px-6">
          <div className="container mx-auto">{props.children}</div>
        </main>

        <footer className="bg-gray-800 text-white py-4 px-6">
          <div className="container mx-auto text-center">
            <p>&copy; Make great UIs</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
