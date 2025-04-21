import { PackageIcon } from 'lucide-react';

export const PropertiesEmptyState = ({ searchTerm }: { searchTerm?: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <PackageIcon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-1">
      No Properties Found
    </h3>
    <p className="text-sm text-gray-500 text-center max-w-sm">
      {searchTerm
        ? 'No properties match your search criteria. Try different keywords.'
        : 'There are currently no properties available for this category.'}
    </p>
  </div>
);