'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/constants/contents';
import useSlider from '@/hooks/use-slider';
import React from 'react';
import TestimonialCard from './testimonial-card';

const TestimonialCarousel = () => {
  const { setApi, current } = useSlider();

  return (
    <section className={` max-w-7xl m-auto`}>
      <Carousel setApi={setApi}>
        <CarouselContent className='min-h-[24rem] flex items-center'>
          {testimonials.map((testimony, i) => (
            <CarouselItem key={testimony.id} className="xmd:basis-full sm:basis-3/4">
              <TestimonialCard testimony={testimony}  theme="light" key={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-[1px] border-[#333333] z-10 ml-10" />
        <CarouselNext className="bg-white border-[1px] border-[#333333] z-10 mr-10" />
      </Carousel>
      <div className="flex justify-center items-center gap-4">
        {testimonials.map((testimony, idx) => (
          <li
            key={testimony.id}
            className={`${current === idx ? 'list-disc text-white text-2xl' : 'list-disc text-[#333333] text-2xl'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
