interface SimulateApiOptions<T> {
  data?: T;
  error?: string | Error;
  delay?: number;
  shouldSucceed?: boolean;
}

export function simulateApi<T = { message: string }>(
  options: SimulateApiOptions<T> = {}
): Promise<T> {
  const {
    data = { message: "Success" } as unknown as T,
    error = new Error("API call failed"),
    delay = 1000,
    shouldSucceed = true,
  } = options;

  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(typeof error === "string" ? new Error(error) : error);
      }
    }, delay);
  });
}
