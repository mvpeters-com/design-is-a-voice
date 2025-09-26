import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    if (tag) {
      // Revalidate by cache tag
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      });
    }

    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    }

    // Default: revalidate home page
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      path: "/",
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err,
      },
      { status: 500 }
    );
  }
}
