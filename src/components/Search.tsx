import React, { useEffect, useState } from "react";
import "./App.css";
import { useSearchStore } from "../store";
import { addTag, removeTag } from "../hooks/tags";
const Searchbar: React.FC<SearchbarProps> = ({
  defaultTags,
  tagTypes,
  defaultFetcher,
  defaultValue,
  onTagRemove,
  onSuggestionClick,
  onValueChange,
  onChange,
  onSearch,
}) => {
  const [suggestionState, setSuggestionState] = useState<SuggestionStateType>({
    suggestionHover: false,
    suggestionVisible: false,
    inputFocused: false,
    activeTagType: "",
    tagTypePrefixes: tagTypes ? tagTypes.map((tagType) => tagType.prefix) : [],
  });
  const { tags, suggestions, value, setTags, setValue, setSuggestions } =
    useSearchStore((state) => state);
  const getTagComponent = () => {
    const tempTags = tags.map((tag) => {
      const tagType = tagTypes.find((tagType) => tagType.kind === tag.kind);
      if (tagType && tagType.tagComponent) {
        return (
          <>
            <tagType.tagComponent key={tag.value} children={tag.display} />{" "}
            <button
              onClick={() => {
                if (onTagRemove) {
                  onTagRemove(tag, tags);
                } else {
                  setTags(removeTag(tag, tags));
                }
              }}
            >
              x
            </button>
          </>
        );
      } else {
        return <>test</>;
      }
    });
    return <div style={{ display: "flex" }}>{tempTags}</div>;
  };

  useEffect(() => {
    if (
      suggestionState.tagTypePrefixes.indexOf(value[value.length - 1]) !== -1 &&
      suggestionState.activeTagType === ""
    ) {
      let temp = tagTypes.find((tag) => tag.prefix === value[value.length - 1]);
      if (temp) {
        setSuggestionState({
          ...suggestionState,
          activeTagType: temp.prefix,
        });
      }
    }
    if (
      suggestionState.activeTagType !== "" &&
      !value.split("").some((ele) => {
        return suggestionState.tagTypePrefixes.includes(ele);
      })
    ) {
      setSuggestionState({
        ...suggestionState,
        activeTagType: "",
      });
    }
  }, [value, suggestionState]);

  useEffect(() => {
    if (value !== "" && tagTypes && suggestionState.activeTagType !== "") {
      let temp = tagTypes.find((tag) => tag.prefix === value[value.length - 1]);
      if (temp) {
        temp.fetcher(value).then((res: SuggestionInterface[]) => {
          setSuggestions(res);
        });
      }
    } else {
      defaultFetcher(value).then((res: SuggestionInterface[]) => {
        setSuggestions(res);
      });
    }
  }, [value, suggestionState.activeTagType]);

  useEffect(() => {
    if (defaultTags) {
      setTags(defaultTags);
    }
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);
  useEffect(() => {
    if (onChange) {
      onChange(value, tags);
    }
  }, [value, tags]);

  return (
    <div>
      <div
        className="wrapper "
        onFocus={() =>
          setSuggestionState({ ...suggestionState, suggestionVisible: true })
        }
        onBlur={() =>
          setSuggestionState({ ...suggestionState, suggestionVisible: false })
        }
      >
        <div className="tag">{getTagComponent()}</div>
        <input
          value={value}
          onChange={(e) => {
            if (onValueChange) {
              onValueChange(e);
            } else {
              setValue(e.target.value);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (onSearch) {
                onSearch(value, tags);
              }
            }
          }}
          className="searchInput"
        />
      </div>
      {suggestionState.suggestionVisible && (
        <div style={{ borderStyle: "solid" }}>
          {suggestions.map((suggestion) => {
            return (
              <button
                key={suggestion.value}
                onMouseDown={() => {
                  if (onSuggestionClick) {
                    onSuggestionClick(suggestion);
                  } else {
                    if (suggestionState.activeTagType !== "") {
                      setTags(addTag(suggestion, tags));
                      setValue("");
                    } else {
                      setValue(suggestion.value);
                    }
                  }
                }}
              >
                {suggestion.value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
