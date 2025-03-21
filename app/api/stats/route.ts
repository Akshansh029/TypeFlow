import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { netWPM, rawWPM, accuracy, mode, duration } = await request.json();

  if (
    netWPM === undefined ||
    rawWPM === undefined ||
    accuracy === undefined ||
    mode === undefined ||
    duration === undefined
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const userId = session.user.id;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  try {
    const newTest = await db.testResult.create({
      data: {
        userId,
        netWPM,
        rawWPM,
        accuracy,
        mode,
        duration,
      },
    });

    return NextResponse.json(newTest, { status: 201 });
  } catch (error) {
    console.error("Error creating test result:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}

const modeGroups = {
  standard: ["normal", "medium", "hard"],
  numbers: ["numbers"],
  punctuation: ["punctuation"],
  quote: ["quote"],
};

const durationList = [10, 20, 30, 50, 100];

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 1) Fetch full test history
    const testResults = await db.testResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // 2) Basic aggregated stats
    const stats = await db.testResult.aggregate({
      where: { userId },
      _max: {
        netWPM: true,
        rawWPM: true,
        accuracy: true,
      },
      _avg: {
        netWPM: true,
        rawWPM: true,
        accuracy: true,
        duration: true,
      },
      _count: {
        id: true,
      },
      _sum: {
        duration: true,
      },
    });

    // 3) Aggregation by Mode Groups
    const modeStats: Record<
      string,
      { netWPM: number | null; rawWPM: number | null; accuracy: number | null }
    > = {};

    for (const [groupName, modeArray] of Object.entries(modeGroups)) {
      const agg = await db.testResult.aggregate({
        where: {
          userId,
          mode: { in: modeArray },
        },
        _max: {
          netWPM: true,
          rawWPM: true,
          accuracy: true,
        },
      });

      modeStats[groupName] = {
        netWPM: agg._max.netWPM,
        rawWPM: agg._max.rawWPM,
        accuracy: agg._max.accuracy,
      };
    }

    // 4) Aggregation by Duration
    const durationStats: Record<
      number,
      { netWPM: number | null; rawWPM: number | null; accuracy: number | null }
    > = {};

    for (const dur of durationList) {
      const agg = await db.testResult.aggregate({
        where: {
          userId,
          duration: dur,
        },
        _max: {
          netWPM: true,
          rawWPM: true,
          accuracy: true,
        },
      });

      durationStats[dur] = {
        netWPM: agg._max.netWPM,
        rawWPM: agg._max.rawWPM,
        accuracy: agg._max.accuracy,
      };
    }

    // 5) Return everything
    return NextResponse.json(
      {
        testResults,
        stats,
        modeStats,
        durationStats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching test results and stats:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
