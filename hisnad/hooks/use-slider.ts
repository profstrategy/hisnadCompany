
import { CarouselApi } from '@/components/ui/carousel';
import React from 'react';

const useSlider = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 0);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 0);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return { count, setApi, setCount, current, setCurrent, api };
};

export default useSlider;
