import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import initialState from "./initialState";

export const createSearchStore = () => {
  return createStore((set, get) => ({
    ...initialState,
    setTags: (tags: TagInterface[]) => set({ tags }),
    setSuggestions: (suggestions: SuggestionInterface[]) =>
      set({ suggestions }),
    setValue: (value: string) => set({ value }),
  }));
};
export const StoreContext = createContext<ReturnType<
  typeof createSearchStore
> | null>(null);

export function useSearchStore<T>(
  selector: (state: SearchStateInterface) => T,
  equalityFn?: (a: T, b: T) => boolean
) {
  const store = useContext(StoreContext);
  if (store) {
    const slice = useStore(store, selector as any, equalityFn);
    return slice;
  } else {
    throw Error("Store not found");
  }
}
