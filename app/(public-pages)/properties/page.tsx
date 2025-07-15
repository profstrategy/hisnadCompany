
import React from 'react';
import PropertiesSection from '../_components/properties-page/properties-section';
import Inspection from '../_components/properties-page/inspection';
import { getAllProperties } from '@/_lib/prisma-data-service';
import { SegregatedProperties } from '@/constants/types';

const page = async () => {
    const allActiveProperties: SegregatedProperties[] = await getAllProperties()
    return (
        <div>
            {/* <Suspense fallback={<PropertiesSkeleton />}> */}
            <PropertiesSection allActiveProperties={allActiveProperties} />
            {/* </Suspense> */}
            <Inspection />
        </div>
    );
};

export default page