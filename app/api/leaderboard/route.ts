import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Each user’s highest netWPM
    const grouped = await db.testResult.groupBy({
      by: ["userId"],
      _max: { netWPM: true },
    });

    // Row of each user's highest netWPM test
    const bestTests = await Promise.all(
      grouped.map(async (entry) => {
        const bestWPM = entry._max.netWPM;
        if (bestWPM == null) return null;

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
            createdAt: "desc", // if multiple tests with same netWPM, select most recent one
          },
        });
      })
    );

    const validBestTests = bestTests.filter((test) => test !== null);

    validBestTests.sort((a, b) => {
      if (a && b) {
        return b.netWPM - a.netWPM;
      }
      return 0;
    });

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
