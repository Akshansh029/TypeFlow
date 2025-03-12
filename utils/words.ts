export const commonWords = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "I",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",

  // Hard mode words (Longer & Technical)
  "algorithm",
  "asynchronous",
  "authentication",
  "authorization",
  "configuration",
  "cryptographic",
  "debugging",
  "decomposition",
  "dependency",
  "development",
  "distribution",
  "encryption",
  "framework",
  "functionality",
  "implementation",
  "infrastructure",
  "initialization",
  "integration",
  "introspection",
  "iteration",
  "microservice",
  "multithreading",
  "optimization",
  "orchestration",
  "performance",
  "polyfill",
  "pseudocode",
  "recursion",
  "repository",
  "responsive",
  "scalability",
  "scheduling",
  "synchronization",
  "transpilation",
  "virtualization",
  "websocket",
  "deployment",
  "data structure",
  "distributed system",
  "machine learning",
  "artificial intelligence",
  "high availability",
  "error handling",
  "serverless",
  "computational",
  "concatenation",
  "inheritance",
  "abstraction",
  "polymorphism",
  "serialization",
  "parallel processing",
  "event-driven",
  "containerization",
  "functional programming",
  "object-oriented",
  "deep learning",
  "neural network",
  "predictive modeling",
  "cloud computing",
  "database indexing",
  "continuous integration",
  "continuous deployment",
  "load balancing",
  "cybersecurity",
  "penetration testing",
  "reverse engineering",
  "quantum computing",
];

export const difficultyLevels = {
  normal: commonWords.filter((word) => word.length <= 4),
  medium: commonWords.filter((word) => word.length > 3 && word.length <= 7),
  hard: commonWords.filter((word) => word.length > 7),
};

export async function generateWords(
  count: number,
  mode:
    | "normal"
    | "medium"
    | "hard"
    | "numbers"
    | "punctuation"
    | "quote" = "medium"
): Promise<string> {
  if (mode === "quote") {
    return await getRandomQuote(); // Fetch a random quote
  }

  const wordsSet = new Set<string>();
  let wordsList: string[];

  switch (mode) {
    case "numbers":
      wordsList = [];
      for (let i = 0; i < 100; i++) {
        if (Math.random() < 0.25) {
          wordsList.push(Math.floor(Math.random() * 1000).toString());
        } else {
          wordsList.push(
            commonWords[Math.floor(Math.random() * commonWords.length)]
          );
        }
      }
      break;

    case "punctuation":
      const punctuationMarks = [
        ".",
        ",",
        "!",
        "?",
        ":",
        ";",
        "-",
        "'",
        '"',
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
      ];
      wordsList = commonWords.map(
        (word) =>
          word +
          punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)]
      );
      break;
    default:
      wordsList = difficultyLevels[mode];
  }

  if (count > wordsList.length) {
    console.warn(
      `Requested word count (${count}) exceeds available words for mode '${mode}'. Returning max possible words.`
    );
    count = wordsList.length;
  }

  while (wordsSet.size < count) {
    wordsSet.add(wordsList[Math.floor(Math.random() * wordsList.length)]);
  }

  return Array.from(wordsSet).join(" ");
}

async function getRandomQuote(): Promise<string> {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) throw new Error("Failed to fetch quote");

    const data = await response.json();
    return `${data[0].q} - ${data[0].a}`;
  } catch (error) {
    console.error(error);
    return "Failed to load quote. Please try again.";
  }
}
