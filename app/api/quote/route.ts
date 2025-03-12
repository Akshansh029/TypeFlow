import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
