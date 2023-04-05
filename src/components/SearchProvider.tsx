import { createSearchStore, StoreContext } from "../store";
import React from 'react'
const SearchProvider = (props: any) => {
  const store = createSearchStore();
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default SearchProvider;
