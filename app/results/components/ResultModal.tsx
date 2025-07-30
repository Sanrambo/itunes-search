import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type MediaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  media: {
    media_id: number;
    media_name: string;
    media_type: string;
    artist_name: string;
    artwork_url: string;
    preview_url?: string;
  };
};

export default function ResultModal({ isOpen, onClose, media }: MediaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[25vw]">
        <DialogHeader className="bg-white text-black border-2 border-black px-6 py-2 shadow-[6px_6px_0_0_black] font-bold mt-3">
          <DialogTitle className="text-3xl font-bold text-main">
            {media.media_name}
          </DialogTitle>
          <DialogDescription className="text-md">
            {media.artist_name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Badge className="w-fit text-sm text-muted-foreground capitalize">
            {media.media_type}
          </Badge>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={media.artwork_url}
              alt={media.media_name}
              className="w-full h-full object-cover"
            />
          </div>

          {media.preview_url && (
            <div className="w-full gap-2 flex flex-col">
              <p className="text-md">Preview</p>
              <audio controls className="w-full">
                <source src={media.preview_url} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
