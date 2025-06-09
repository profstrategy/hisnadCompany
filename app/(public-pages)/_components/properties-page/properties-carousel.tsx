'use client';
import React from 'react';
import { ActivePropertyPreview } from '@/constants/types';
import useSlider from '@/hooks/use-slider';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage-keys';

interface PropertiesCarouselProps {
    segregatedproperties: ActivePropertyPreview[]
}

const PropertiesCarousel = ({ segregatedproperties }:PropertiesCarouselProps) => {
    const { setApi, count, current } = useSlider();
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_ID);
    const [hovered, setHovered] = React.useState<number | null>(null);
    const [angleMap, setAngleMap] = React.useState<{ [key: number]: number }>({});
    const router = useRouter()

    const handleMouseMove = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        setAngleMap(prev => ({ ...prev, [id]: angle }));
    };

    const getButtonTransform = (angle: number) => {
        const radius = 60; 
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        return `translate(${x}px, ${y}px)`;
    };

    return (
        <div className="relative w-full flex overflow-hidden items-center justify-center">
            <Carousel className="w-full h-[20rem] sm:h-[22rem] md:h-[25rem] relative" setApi={setApi}>
                <CarouselContent>
                    {segregatedproperties.map((property) => (
                        <CarouselItem
                            key={property.id}
                            className="relative w-full h-[20rem] sm:h-[22rem] md:h-[25rem] 
                             basis-3/4 px-2 mx-2 sm:mx-4"
                        >
                            <div
                                onMouseEnter={() => setHovered(property.id as unknown as number)}
                                onMouseLeave={() => setHovered(null)}
                                onMouseMove={(e) => handleMouseMove(property.id as unknown as number, e)}
                                className="relative w-full h-full rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={property.mainImage?.[0] ?? ''}
                                    alt={`${property.id}-img`}
                                    fill
                                    className="object-cover rounded-2xl"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 75vw"
                                />
                                <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-between">
                                    <div className="relative flex-1 flex items-center justify-center">
                                        {hovered === property.id as unknown as number && (
                                            <button
                                                className="text-white px-6 py-3 rounded-lg font-medium border border-white transition-all duration-300 absolute md:flex hidden "
                                                style={{
                                                    transform: getButtonTransform(angleMap[property.id as unknown as number] || 0),
                                                    transition: 'transform 0.1s linear',
                                                }}
                                                onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.properties.onboarded(property.slug, userId)}`)}
                                            >
                                                View property details &gt;
                                            </button>
                                        )}

<button
                                                className="text-white px-6 py-3 rounded-lg font-medium border border-white transition-all duration-300 absolute md:hidden block"
                                                style={{
                                                    transition: 'transform 0.1s linear',
                                                }}

                                                onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.properties.onboarded(property.slug, userId)}`)}
                                            >
                                                View property details &gt;
                                            </button>
                                    </div>
                                    <div className="grid gap-1">
                                        <h2 className="text-base sm:text-lg font-bold text-white">
                                            {property.title}
                                        </h2>
                                        <p className="text-sm text-white/80">{property.location}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {current > 0 && (
  <CarouselPrevious className="bg-white border-[1px] border-[#333333] z-10 md:left-8/12 left-9/12 top-6 md:top-80 absolute" />
)}
{current < count - 1 && (
  <CarouselNext className="bg-white border-[1px] border-[#333333] z-10 absolute md:left-7/12 left-7/12 md:top-80 top-6" />
)}

            </Carousel>
        </div>
    );
};

export default PropertiesCarousel;
