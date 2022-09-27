import { createSearchStore, StoreContext } from "../store";

const SearchProvider = (props: any) => {
  const store = createSearchStore();
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default SearchProvider;
