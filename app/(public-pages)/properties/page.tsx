
import React, { Suspense } from 'react';
import Inspection from '../_components/properties-page/inspection';
import { getAllProperties } from '@/_lib/prisma-data-service';
import { SegregatedProperties } from '@/constants/types';
import PropertiesSkeleton from './properties-skeleton-page';
import dynamic from 'next/dynamic';

const PropertiesSection = dynamic(() => import('@/app/(public-pages)/_components/properties-page/properties-section'))

const page = async () => {
    const allActiveProperties: SegregatedProperties[] = await getAllProperties()
    return (
        <div className='pt-12 mb-20'>
            <Suspense fallback={<PropertiesSkeleton />}>
            <PropertiesSection allActiveProperties={allActiveProperties} />
            </Suspense>
            <Inspection />
        </div>
    );
};

export default page