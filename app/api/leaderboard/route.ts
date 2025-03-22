// /app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adjust to your Prisma client path

export async function GET() {
  try {
    // 1) Group test results by user to get each user’s highest netWPM
    const grouped = await db.testResult.groupBy({
      by: ["userId"],
      _max: { netWPM: true },
    });

    // 2) For each user, find the actual test row that matches their highest netWPM
    //    and include the user details (name, image, etc.).
    const bestTests = await Promise.all(
      grouped.map(async (entry) => {
        const bestWPM = entry._max.netWPM;
        // For safety, check if bestWPM is null (e.g., no tests)
        if (bestWPM == null) return null;

        // Find the test row for that user that has netWPM = bestWPM
        // If the user has multiple tests with the same bestWPM, you could pick the latest:
        return db.testResult.findFirst({
          where: {
            userId: entry.userId,
            netWPM: bestWPM,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc", // if multiple with same netWPM, pick the most recent
          },
        });
      })
    );

    // Filter out any nulls (in case bestWPM was null for some user)
    const validBestTests = bestTests.filter((test) => test !== null);

    // 3) Sort them by netWPM descending
    validBestTests.sort((a, b) => {
      if (a && b) {
        return b.netWPM - a.netWPM;
      }
      return 0;
    });

    // 4) Take the top 10
    const topTen = validBestTests.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: topTen, // Each entry has { netWPM, rawWPM, accuracy, createdAt, user: { name, image }, ... }
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard stats" },
      { status: 500 }
    );
  }
}
