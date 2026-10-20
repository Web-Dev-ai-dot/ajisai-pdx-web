import Image from "next/image";

export interface MenuGalleryImage {
    src: string;
    alt: string;
    caption?: string;
    objectPosition?: string;
}

interface MenuImageGridProps {
    images: MenuGalleryImage[];
    centered?: boolean;
    featured?: boolean;
}

export default function MenuImageGrid({ images, centered = false, featured = false }: MenuImageGridProps) {
    const containerClassName = featured
        ? "w-full"
        : centered
        ? "flex w-full justify-center gap-2 sm:gap-4 md:gap-6"
        : "grid w-full grid-cols-3 gap-2 sm:gap-4 md:gap-6";
    const itemClassName = featured
        ? "w-full min-w-0"
        : centered
        ? "w-[calc((100%_-_1rem)/3)] min-w-0 sm:w-[calc((100%_-_2rem)/3)] md:w-[calc((100%_-_3rem)/3)]"
        : "";

    return (
        <div className={containerClassName}>
            {images.map((image) => {
                const imageElement = (
                    <div className={`relative min-w-0 overflow-hidden rounded-sm bg-primary/5 ${featured ? "aspect-[16/7]" : "aspect-[3/4]"}`}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={featured ? "(max-width: 1023px) 100vw, 960px" : "(max-width: 767px) 30vw, (max-width: 1023px) 29vw, 270px"}
                            className={featured ? "object-cover" : "object-contain"}
                            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                        />
                    </div>
                );

                if (!image.caption) {
                    return <div key={image.src} className={itemClassName}>{imageElement}</div>;
                }

                return (
                    <figure key={image.src} className={featured || centered ? itemClassName : "min-w-0"}>
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
