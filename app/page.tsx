import { MenuBar } from "../components/Menu";
import TypingTest from "../components/TypingTest";

export default function Home() {
  return (
    <>
      <main className="min-h-[calc(100vh-84px)] py-8 flex flex-col items-center gap-4 bg-primary">
        <MenuBar />
        <TypingTest />
        <footer className="text-center mt-12 text-sm text-gray-600 dark:text-gray-400">
          <p>Sign in to track your progress and see detailed statistics</p>
        </footer>
      </main>
    </>
  );
}
