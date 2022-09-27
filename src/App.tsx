import Boom from "./test";
import Boom1 from "./test copy";
import SearchProvider from "./components/SearchProvider";
import Searchbar from "./components/Search";
const App = () => {
  const fetchingFunction = async () => {
    return [
      {
        value: "rushil",
        display: "rushil",
        kind: "test",
      },
      {
        value: "rushil1",
        display: "rushil1",
        kind: "test",
      },
    ];
  };
  const fetching2Function = async () => {
    return [
      {
        value: "asd",
        display: "asd",
        kind: "not",
      },
      {
        value: "q1we",
        display: "q1we",
        kind: "not",
      },
    ];
  };
  const defaultFetcher = async () => {
    return [
      {
        value: "dfe",
        display: "dfe",
        kind: "def",
      },
      {
        value: "123",
        display: "123",
        kind: "def",
      },
    ];
  };

  const tagTypes: TagTypeInterface[] = [
    {
      tagComponent: Boom,
      kind: "test",
      fetcher: fetchingFunction,
      prefix: "#",
    },
    {
      tagComponent: Boom1,
      kind: "not",
      fetcher: fetching2Function,
      prefix: "@",
    },
  ];
  const defaultTags = [
    {
      display: "Dankest",
      value: "123",
      kind: "test",
    },
    {
      display: "Tes123t",
      value: "test",
      kind: "test",
    },
    {
      display: "Tes123t",
      value: "tesasdft",
      kind: "not",
    },
  ];
  return (
    <SearchProvider>
      <Searchbar
        defaultFetcher={defaultFetcher}
        defaultTags={defaultTags}
        tagTypes={tagTypes}
        tagDisplayType="children"
        onSearch={(value: any, tags: any) => {
          console.log(tags);
        }}
      />
    </SearchProvider>
  );
};

export default App;
