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

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Test history
    const testResults = await db.testResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Aggregated stats
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
        id: true, // Total tests completed
      },
      _sum: {
        duration: true, // Total time spent
      },
    });

    return NextResponse.json({ testResults, stats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching test results and stats:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
