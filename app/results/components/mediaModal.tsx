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
  item: {
    media_id: number;
    media_name: string;
    media_type: string;
    artist_name: string;
    artwork_url: string;
    preview_url?: string;
  };
};

export default function MediaModal({ isOpen, onClose, item }: MediaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader className="bg-white text-black border-2 border-black px-6 py-2 shadow-[6px_6px_0_0_black] font-bold mt-3">
          <DialogTitle className="text-3xl font-bold text-main   ">
            {item.media_name}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {item.artist_name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Badge className="w-fit text-sm text-muted-foreground capitalize">
            {item.media_type}
          </Badge>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={item.artwork_url}
              alt={item.media_name}
              className="w-full h-full object-cover"
            />
          </div>

          {item.preview_url && (
            <div className="w-full gap-2 flex flex-col">
              <p className="text-md">Preview</p>
              <audio controls className="w-full">
                <source src={item.preview_url} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
