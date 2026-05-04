import {toast} from "sonner";
import {createElement, useCallback} from "react";
import {AlertCircle} from "lucide-react";

export function useToaster() {
  const errorToast = useCallback(function errorToast(message: string): void {
    toast.error(message, {
      style: {
        backgroundColor: '#ffdad6',
        border: '2px solid #ba1a1a',
        borderRadius: '12px',
        color: '#93000a',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        padding: '16px 20px',
        boxShadow: '0 8px 24px rgba(186,26,26,0.2)',
        fontWeight: '500',
      },
      duration: 5000,
      icon: createElement(AlertCircle, {size: 18, color: '#ba1a1a'}),
    })
  }, [])

  return {
    errorToast
  }
}