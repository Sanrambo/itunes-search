import { supabase } from "@/utils/supabase";
import Image from "next/image";

export default function Home() {
  // const itunesData = async () => {
  //   const { data, error } = await supabase.from("itunes_data").upsert(
  //     {
  //       track_id: 12345,
  //       type: "hihih",
  //       track_name: "hihih",
  //       artist_name: "hihih",
  //       artwork_url: "hihih",
  //       track_url: "hihih",
  //     },
  //     {
  //       onConflict: "track_id",
  //     }
  //   );
  //   if (data) console.log(data);
  //   if (error) console.log(error);
  // };

  // itunesData();

  return <div>Home</div>;
}
