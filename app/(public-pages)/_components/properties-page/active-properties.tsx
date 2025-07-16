import PropertiesCarousel from "./properties-carousel";
import { Suspense } from "react";
import { getActiveProperties } from "@/_lib/prisma-data-service";
import { PropertySkeleton } from "./properties-skeleton";
import { GetActiveProperties } from "@/constants/types";



const ActiveProperties: React.FC = async () => {
    const activeProperties: GetActiveProperties[] = await getActiveProperties()
    return (
        <div className='bg-[#f6f6f6] md:min-h-screen md:py-5 flex flex-col gap-8 items-center justify-center max-w-[700px] px-2 xmd:px-4 md:px-6 lg:px-8 h-auto mx-auto sm:max-w-[50rem] md:max-w-[75rem] sm:w-11/12 xl:w-5/6 lg:w-11/12 rounded-2xl -mt-28 py-8'>
            <div className='space-y-4 md:space-y-6 text-center md:max-w-2xl'>
                <h1 className='text-center font-semibold md:text-4xl text-2xl text-global-text'>Explore our best in class properties</h1>
                <h3 className='text-[.8rem] md:text-[1.25rem] leading-5 md:leading-7 text-center font-normal'>We understand how hard it is to purchase a property, which is why we provide you with the best-in-class property deal.</h3>
            </div>

            <div className='max-w-4xl md:w-11/12 w-full mx-auto'>
            <Suspense fallback={<PropertySkeleton />}>
            <PropertiesCarousel segregatedproperties={activeProperties} />
            </Suspense>
            </div>
        </div>
    );
};

export default ActiveProperties;