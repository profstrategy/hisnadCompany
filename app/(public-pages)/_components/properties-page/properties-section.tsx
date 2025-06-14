'use client';
import React from 'react';
import { AppHeading } from '@/components/reusables/app-heading';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { addSearchParamsToUrl } from '@/_lib/utils';
import { PROPERTY_TYPES } from '@/constants/generic';
import { PropertiesEmptyState } from '@/components/reusables/empty-states';
import { Properties } from './properties';
import { motion } from 'framer-motion';
import { SegregatedProperties } from '@/constants/types';

interface PropertySectionProps {
    allActiveProperties: SegregatedProperties[]
}

const PropertiesSection = ({ allActiveProperties }:PropertySectionProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentTab = searchParams
        ?.get('type')
        ?.toUpperCase() as (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];
    const currentSearch = searchParams?.get('search') || '';

    const [activeTab, setActiveTab] = React.useState<
        (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES]
    >(currentTab || PROPERTY_TYPES.HISNAD);
    const [searchTerm, setSearchTerm] = React.useState(currentSearch);

    // Update URL with search params
    const updateSearchParams = React.useCallback(
        (type: string, search?: string) => {
            const newUrl = addSearchParamsToUrl(pathname ?? '/', {
                type: type.toLowerCase(),
                search: search || '',
            });
            router.push(newUrl);
        },
        [pathname, router]
    );

    // Debounced search handler
    const handleSearch = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const term = e.target.value;
            setSearchTerm(term);
            const timeoutId = setTimeout(() => {
                updateSearchParams(activeTab, term.trim() || undefined);
            }, 300);
            return () => clearTimeout(timeoutId);
        },
        [activeTab, updateSearchParams]
    );

    const handleTabChange = React.useCallback(
        (tab: (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES]) => {
            setActiveTab(tab);
            setSearchTerm('');
            updateSearchParams(tab);
        },
        [updateSearchParams]
    );

    // Memoize segregated packages
    const filteredProperties = React.useMemo(() => {
        return allActiveProperties.filter(
            (property) =>
                property?.type?.toUpperCase() === activeTab &&
                (!searchTerm ||
                    property?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [activeTab, searchTerm]);

    return (
        <section className="w-full py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-12">
                    <AppHeading
                        variant="h2"
                        className="text-3xl md:text-4xl lg:text-5xl text-center mb-6 font-bold text-gray-900"
                    >
                        Our Properties
                    </AppHeading>
                    <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
                        Discover our premium selection of properties tailored to your needs
                    </p>

                    {/* Enhanced Tabs */}
                    <div className="relative mb-10 w-full max-w-2xl">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <nav className="flex bg-white px-2 rounded-lg shadow-sm" aria-label="Tabs">
                                {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                                    <motion.button
                                        key={value}
                                        onClick={() => handleTabChange(value)}
                                        className={`px-6 py-3 md:text-sm text-[.8rem]  font-medium rounded-md relative transition-colors duration-200 ${activeTab === value
                                            ? 'text-primary-600 bg-accent-primary text-white'
                                            : 'text-gray-500 hover:text-gray-700 '
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {value === PROPERTY_TYPES.HISNAD ? 'Hisnad Estate' : 'Featured Farmland'}
                                        {activeTab === value && (
                                            <motion.span
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                                                layoutId="activeTab"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Enhanced Search Input */}
                    <div className="w-full max-w-xl mb-12">
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search properties by name..."
                                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder-gray-400 transition duration-200"
                                aria-label="Search properties"
                            />
                            {searchTerm && (
                                <motion.button
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => {
                                        setSearchTerm('');
                                        updateSearchParams(activeTab, '');
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="w-full">
                    {filteredProperties.length > 0 ? (
                        <div className={`grid grid-cols-1 gap-8 ${filteredProperties.length === 1 ? 'sm:grid-cols-1 max-w-md mx-auto' : filteredProperties.length === 2 ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                            {filteredProperties.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="px-2"
                                >
                                    <Properties pkg={pkg} theme="light" key={`${index}-${pkg.id}--`} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <PropertiesEmptyState searchTerm={searchTerm} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default PropertiesSection;