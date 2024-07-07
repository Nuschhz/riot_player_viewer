import { createContext } from "react";

export const LoadingContext = createContext(null);

export default function LoadingContextProvider({ children, value }) {
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
