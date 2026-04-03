import { NextResponse } from "next/server";
import { demoEvents } from "../../../../data/demoEvents";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(demoEvents);
}
