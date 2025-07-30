
import Image from "next/image";

export default function NoResult() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <Image src="/empty.png" alt="empty" width={300} height={300} />
            <p className="text-2xl font-semibold mb-2">No results found</p>
            <p className="text-muted-foreground">
                Try searching for something else
            </p>
        </div>
    );
}