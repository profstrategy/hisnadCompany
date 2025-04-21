import React from 'react';

interface AppTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          className={`block text-sm font-medium mb-1 ${error ? 'text-red-500' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full h-10 sm:h-12 md:h-14 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border rounded-lg
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-brand-color'}
            ${icon ? 'pr-12' : ''}
            ${className}`}
          {...props}
        />
        {icon && (
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-gray-500'}`}
          >
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default AppTextInput;
