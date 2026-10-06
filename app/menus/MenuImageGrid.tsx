import Image from "next/image";

export interface MenuGalleryImage {
    src: string;
    alt: string;
}

interface MenuImageGridProps {
    images: MenuGalleryImage[];
}

export default function MenuImageGrid({ images }: MenuImageGridProps) {
    return (
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {images.map((image) => (
                <div
                    key={image.src}
                    className="relative aspect-[3/4] min-w-0 overflow-hidden rounded-sm bg-primary/5"
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 30vw, (max-width: 1023px) 29vw, 270px"
                        className="object-contain"
                    />
                </div>
            ))}
        </div>
    );
}
