'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AppDialogBoxProps {
  trigger?: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  description?: string | React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean
}

const AppDialogBox = ({
  trigger = '',
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  cancelText = 'Cancel',
  confirmText = 'Continue',
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  children,
  isLoading
}: AppDialogBoxProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {typeof trigger === 'string' ? <button>{trigger}</button> : trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="bg-white border border-gray-200 rounded-lg shadow-lg"
        style={{ backgroundColor: 'white' }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 text-xl font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {description}
          </AlertDialogDescription>
          {children}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:ring-0 focus:ring-offset-0"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: 'white',
              borderColor: 'white',
              color: 'black',
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gray-900 text-white hover:bg-gray-800 transition-colors focus:ring-0 focus:ring-offset-0"
            style={{ backgroundColor: 'var(--global-color-primary)', color: 'white' }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDialogBox;
