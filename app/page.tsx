import TypingTest from "./components/TypingTest";

export default function Home() {
  return (
    <div className="min-h-screen py-8 bg-[#131615]">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-green-400">TypeFlow</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test your typing speed and improve your skills
        </p>
      </header>

      <TypingTest />

      <footer className="text-center mt-12 text-sm text-gray-600 dark:text-gray-400">
        <p>Sign in to track your progress and see detailed statistics</p>
      </footer>
    </div>
  );
}
