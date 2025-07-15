import { toast } from "sonner";


interface AppToast {
  message: string; 
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Default configuration
const DEFAULT_DURATION = 4000;
const DEFAULT_STYLES = {
  fontSize: "14px",
  fontWeight: "500",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

export const AppSuccessToast = ({ 
  message, 
  duration = DEFAULT_DURATION, 
  description,
  action 
}: AppToast) => {
  // Input validation
  if (!message?.trim()) {
    console.warn("AppSuccessToast: message is required");
    return;
  }

  return toast.success(message, {
    duration,
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    style: {
      ...DEFAULT_STYLES,
      backgroundColor: "#f0fdf4",
      color: "#166534", 
      border: "1px solid #bbf7d0",
    },
  });
};

export const AppErrorToast = ({ 
  message, 
  duration = DEFAULT_DURATION, 
  description,
  action 
}: AppToast) => {
  // Input validation
  if (!message?.trim()) {
    console.warn("AppErrorToast: message is required");
    return;
  }

  return toast.error(message, {
    duration,
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    style: {
      ...DEFAULT_STYLES,
      backgroundColor: "#fef2f2", 
      color: "#dc2626", 
      border: "1px solid #fecaca", 
    },
  });
};

export const AppInfoToast = ({ 
  message, 
  duration = DEFAULT_DURATION, 
  description,
  action 
}: AppToast) => {
  if (!message?.trim()) {
    console.warn("AppInfoToast: message is required");
    return;
  }

  return toast.info(message, {
    duration,
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    style: {
      ...DEFAULT_STYLES,
      backgroundColor: "#eff6ff",
      color: "#1d4ed8",
      border: "1px solid #bfdbfe",
    },
  });
};

export const AppWarningToast = ({ 
  message, 
  duration = DEFAULT_DURATION, 
  description,
  action 
}: AppToast) => {
  if (!message?.trim()) {
    console.warn("AppWarningToast: message is required");
    return;
  }

  return toast.warning(message, {
    duration,
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    style: {
      ...DEFAULT_STYLES,
      backgroundColor: "#fffbeb",
      color: "#d97706",
      border: "1px solid #fed7aa",
    },
  });
};

// Utility for loading states
export const AppLoadingToast = (message: string = "Loading...") => {
  return toast.loading(message, {
    style: {
      ...DEFAULT_STYLES,
      backgroundColor: "#f9fafb",
      color: "#374151",
      border: "1px solid #e5e7eb",
    },
  });
};

// Utility for promise-based operations
export const AppPromiseToast = <T,>(
  promise: Promise<T>,
  {
    loading = "Loading...",
    success = "Success!",
    error = "Something went wrong",
  }: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: any) => string);
  } = {}
) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
    style: DEFAULT_STYLES,
  });
};