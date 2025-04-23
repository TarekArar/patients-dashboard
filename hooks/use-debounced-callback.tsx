import { useCallback, useRef, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebouncedCallback<F extends (...args: any[]) => any>(
  callback: F,
  delay: number,
  deps: React.DependencyList = []
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const memoizedCallback = useCallback(callback, deps);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        memoizedCallback(...args);
      }, delay);
    },
    [memoizedCallback, delay]
  );

  return debouncedCallback;
}

export default useDebouncedCallback;
