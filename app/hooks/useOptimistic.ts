import { useState } from 'react';

type OptimisticAction<T> = {
  action: () => Promise<T>;
  optimisticData: T;
  rollbackOnError?: boolean;
};

export function useOptimistic<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const performOptimisticUpdate = async ({ action, optimisticData, rollbackOnError = true }: OptimisticAction<T>) => {
    const previousState = state;
    setIsLoading(true);
    setError(null);
    
    // Оптимистично обновляем состояние
    setState(optimisticData);
    
    try {
      // Выполняем реальное действие
      const result = await action();
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      // Откатываем изменения в случае ошибки, если это требуется
      if (rollbackOnError) {
        setState(previousState);
      }
      
      throw error;
    }
  };

  return {
    state,
    setState,
    isLoading,
    error,
    performOptimisticUpdate,
  };
} 