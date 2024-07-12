const debounce = (func: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
    let timeoutId: NodeJS.Timeout | undefined;
    return (...args: any[]): void => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
};

export default debounce;