interface SuggestionStateType {
  suggestionVisible: boolean;
  suggestionHover: boolean;
  inputFocused: boolean;
  activeTagType: string;
  tagTypePrefixes: (string | undefined)[];
}

interface TagTypeBasic {
  tagComponent: React.FunctionComponent<any>;
  kind: string;
  prefix: string;
}

interface TagTypesWithFetcher extends TagTypeBasic {
  fetcher: (value: string) => Promise<SuggestionInterface[]>;
  options?: never;
}
interface TagTypesWithOptions extends TagTypeBasic {
  options: Array<TagInterface>;
  fetcher?: never;
}

type TagTypeInterface = TagTypesWithFetcher;

interface TagInterface {
  display: string;
  value: string;
  kind: string;
}

interface SuggestionInterface {
  value: string;
  kind: string;
  display: string;
}

interface SearchStoreInterface {
  tags: Array<TagInterface>;
  suggestions: Array<SuggestionInterface>;
  value: string;
}

interface SearchActionsInterface {
  setTags: (tags: Array<TagInterface>) => void;
  setSuggestions: (suggestions: Array<SuggestionInterface>) => void;
  setValue: (value: string) => void;
  setSuggestionState: (suggestionState: SuggestionStateType) => void;
}

type SearchStateInterface = SearchActionsInterface & SearchStoreInterface;
interface SearchbarProps {
  defaultTags?: Array<TagInterface>;
  tagTypes: Array<TagTypeInterface>;
  tagDisplayType?: "children" | "label";
  defaultValue?: string;
  defaultFetcher: Function;
  onTagRemove?: Function;
  onSearch: Function<string, TagInterface[]>;
  onChange?: Function;
  onSuggestionClick?: Function;
  onValueChange?: Function;
}
