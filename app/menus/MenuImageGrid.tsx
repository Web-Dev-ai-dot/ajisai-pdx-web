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
            {images.map((image) => {
                const imageElement = (
                    <div className="relative aspect-[3/4] min-w-0 overflow-hidden rounded-sm bg-primary/5">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 767px) 30vw, (max-width: 1023px) 29vw, 270px"
                            className="object-contain"
                        />
                    </div>
                );

                if (!image.caption) {
                    return <div key={image.src}>{imageElement}</div>;
                }

                return (
                    <figure key={image.src} className="min-w-0">
                        {imageElement}
                        <figcaption className="mt-2 text-center font-serif text-[0.65rem] leading-tight text-primary sm:mt-3 sm:text-xs md:text-sm">
                            {image.caption}
                        </figcaption>
                    </figure>
                );
            })}
        </div>
    );
}
