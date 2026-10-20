import Image from "next/image";

export interface MenuGalleryImage {
    src: string;
    alt: string;
    caption?: string;
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
                    {image.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/65 to-transparent px-2 pb-2 pt-8 text-center sm:px-3 sm:pb-3">
                            <p className="font-serif text-[0.65rem] leading-tight text-secondary sm:text-xs md:text-sm">
                                {image.caption}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
