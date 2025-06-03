
import React, { Suspense } from 'react';
import PropertiesSection from '../_components/properties-page/properties-section';
import Inspection from '../_components/properties-page/inspection';
import { ActivePropertyPagePreview } from '@/constants/types';
import PropertiesSkeleton from './properties-skeleton-page';
import { getAllProperties } from '@/_lib/prisma-data-service';

const page = async () => {
    const allActiveProperties: ActivePropertyPagePreview[] = await getAllProperties()
    return (
        <div>
            <Suspense fallback={<PropertiesSkeleton />}>
            <PropertiesSection allActiveProperties={allActiveProperties} />
            </Suspense>
            <Inspection />
        </div>
    );
};

export default page