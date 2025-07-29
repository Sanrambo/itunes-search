import { supabase } from "@/utils/supabase";
import axios from "axios";
import { NextResponse } from "next/server";

interface ITunesItem {
  trackId: number;
  collectionId: number;
  trackName: string;
  collectionName: string;
  kind: string;
  wrapperType: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
}

interface NormalizedItem {
  media_id: number;
  media_name: string;
  media_type: string;
  artist_name: string;
  artwork_url: string;
  preview_url?: string;
}

interface RequestBody {
  term: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { term } = body;


    if (!term) {
      return NextResponse.json(
        { error: "Keyword search is required" },
        { status: 400 }
      );
    }

    const response = await axios.get<{ results: ITunesItem[] }>(
      `https://itunes.apple.com/search?term=${term}&limit=20`
    );
    const search_result = response.data.results;

    const normalized: NormalizedItem[] = search_result
      .filter((item) => item.trackId || item.collectionId)
      .map((item) => {
        if (item.wrapperType === "track") {
          return {
            // track type
            media_id: item.trackId,
            media_name: item.trackName,
            media_type: item.kind,
            artist_name: item.artistName,
            artwork_url: item.artworkUrl100.replace(/\/\d+x\d+bb\.jpg$/, '/600x600bb.jpg'),
            preview_url: item.previewUrl,
          };
        } else {
          // audiobook type
          return {
            media_id: item.collectionId,
            media_name: item.collectionName,
            media_type: item.wrapperType,
            artist_name: item.artistName,
            artwork_url: item.artworkUrl100.replace(/\/\d+x\d+bb\.jpg$/, '/600x600bb.jpg'),
            preview_url: item.previewUrl,
          };
        }
      });

    if (normalized.length === 0) {
      return NextResponse.json(
        { error: "No valid items found in search results" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("itunes_data")
      .upsert(normalized, {
        onConflict: "media_id",
        ignoreDuplicates: true,
      });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
