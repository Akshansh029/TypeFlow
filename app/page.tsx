import Head from "next/head";
import { MenuBar } from "./components/Menu";
import TypingTest from "./components/TypingTest";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen py-8 flex flex-col items-center gap-4 bg-[#131615]">
        <header className="text-center mb-4">
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-4xl font-bold mb-2 text-green-400">TypeFlow</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test your typing speed and improve your skills
          </p>
        </header>

        <MenuBar />

        <TypingTest />

        <footer className="text-center mt-12 text-sm text-gray-600 dark:text-gray-400">
          <p>Sign in to track your progress and see detailed statistics</p>
        </footer>
      </main>
    </>
  );
}
