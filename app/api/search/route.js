import { supabase } from "@/utils/supabase";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { term } = body;

        console.log('Search term:', term);
    
        if (!term) {
            return NextResponse.json({ error: "Keyword search is required" }, { status: 400 });
        }

        const response = await axios.get(
            `https://itunes.apple.com/search?term=${term}&limit=20`,
        );
        const search_result = response.data.results;
                
        const normalized = search_result.map(item => {
                      
            return {
              media_id: item.trackId || item.collectionId,
              media_name: item.trackName || item.collectionName,
              media_type: item.kind || item.wrapperType,
              artist_name: item.artistName,
              artwork_url: item.artworkUrl100,
              preview_url: item.previewUrl,
            }
          })

    if (normalized.length === 0) {
        return NextResponse.json({ error: "No valid items found in search results" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("itunes_data")
        .upsert(normalized, {
            onConflict: "media_id",
            returning: true
        });

    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
            { error: "Database error", details: error.message },
            { status: 500 }
        );
    }

    console.log("Data inserted:", data);
    return NextResponse.json({ data: data });

    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}