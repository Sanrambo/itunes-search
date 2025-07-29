import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (term) {
    const { data, error } = await supabase
      .from("itunes_data")
      .select("*")
      .or(`media_name.ilike.%${term}%,artist_name.ilike.%${term}%`);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] }, { status: 200 });
  }

  return NextResponse.json(
    { error: "No search term provided" },
    { status: 400 }
  );
}
