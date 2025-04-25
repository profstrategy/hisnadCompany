'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const EarthCanvas = dynamic(() => import('@/components/earth-canvas'), { ssr: false })

const GlobalSearch = () => {
    return (
        <section className="bg-[#007aff] min-h-screen grid items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto">
                <div className="py-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-8 w-full">
                    {/* Text content */}
                    <div className="space-y-6 text-white">
                        <p className="text-lg sm:text-xl font-light">Our Global Portfolio</p>
                        <div className="border-y border-[#8facf7] py-6">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                                1500+
                                <span className="italic font-normal"> Happy and satisfied customers</span><br />
                                across 5 continents.
                                <br />
                                14+ Projects
                                <span className="font-normal italic"> completed</span>
                            </h3>
                        </div>
                    </div>

                    {/* Earth Canvas */}
                    <div className="flex justify-center items-center">
                        <div className="border border-[#8facf7] rounded-full overflow-hidden p-3 sm:p-6 md:p-8">
                            <div className="border border-[#8facf7] rounded-full overflow-hidden p-2 sm:p-4 md:p-6">
                                <div className="relative bg-[#02468f] rounded-full h-52 w-52 sm:h-64 sm:w-64 md:h-80 md:w-80">
                                    <div className="absolute inset-0 rounded-full overflow-hidden">
                                        <EarthCanvas />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GlobalSearch
