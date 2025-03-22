import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Group test results by user to get each user’s highest netWPM
    const grouped = await db.testResult.groupBy({
      by: ["userId"],
      _max: { netWPM: true },
    });

    // For each user find the actual test row that matches their highest netWPM
    const bestTests = await Promise.all(
      grouped.map(async (entry) => {
        const bestWPM = entry._max.netWPM;
        // For safety, check if bestWPM is null (e.g., no tests)
        if (bestWPM == null) return null;

        // Row for that user that has netWPM = bestWPM
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

    const validBestTests = bestTests.filter((test) => test !== null);

    // Sorting in descending order
    validBestTests.sort((a, b) => {
      if (a && b) {
        return b.netWPM - a.netWPM;
      }
      return 0;
    });

    // Top 10 results
    const topTen = validBestTests.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: topTen,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard stats" },
      { status: 500 }
    );
  }
}
