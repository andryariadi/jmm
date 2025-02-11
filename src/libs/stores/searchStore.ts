import { create } from "zustand";

type SearchState = {
  query: string;
  setQuery: (newQuery: string) => void;
};

const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (newQuery) => set({ query: newQuery }),
}));

export default useSearchStore;
