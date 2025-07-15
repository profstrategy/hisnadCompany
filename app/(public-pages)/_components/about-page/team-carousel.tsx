'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { teamContents } from '@/constants/contents';
import useSlider from '@/hooks/use-slider';
import React from 'react';
import TeamCard from './team-card';

const TeamCarousel = () => {
  const { setApi, current } = useSlider();

  return (
    <section className={` max-w-7xl m-auto`}>
      <Carousel setApi={setApi}>
        <CarouselContent className='min-h-[24rem] flex items-center'>
          {teamContents.map((team, i) => (
            <CarouselItem key={team.id} className="xmd:basis-full sm:basis-3/4">
              <TeamCard team={team}  theme="light" key={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-[1px] border-[#333333] z-10 ml-10" />
        <CarouselNext className="bg-white border-[1px] border-[#333333] z-10 mr-10" />
      </Carousel>
      <div className="flex justify-center items-center gap-4">
        {teamContents.map((testimony, idx) => (
          <li
            key={testimony.id}
            className={`${current === idx ? 'list-disc text-white text-2xl' : 'list-disc text-[#333333] text-2xl'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamCarousel;
