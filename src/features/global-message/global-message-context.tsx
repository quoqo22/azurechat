// global-message-context.tsx
import { createContext, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface GlobalMessageProps {
  showError: (error: string, reload?: () => void) => void;
  showSuccess: (message: MessageProp) => void;
}

interface MessageProp {
  title: string;
  description: string;
}

const GlobalMessageContext = createContext<GlobalMessageProps | null>(null);

export const GlobalMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showError = (error: string, reload?: () => void) => {
    toast({
      variant: "destructive",
      description: error,
      action: reload ? (
        <ToastAction
          altText="Try again"
          onClick={() => {
            reload();
          }}
        >
          Try again
        </ToastAction>
      ) : undefined,
    });
  };

  const showSuccess = (message: MessageProp) => {
    toast(message);
  };

  return (
    <GlobalMessageContext.Provider
      value={{
        showError,
        showSuccess,
      }}
    >
      {children}
    </GlobalMessageContext.Provider>
  );
};

export const useGlobalMessageContext = () => {
  const context = useContext(GlobalMessageContext);
  if (!context) {
    throw new Error("useGlobalMessageContext must be used within a GlobalMessageProvider");
  }

  return context;
};
