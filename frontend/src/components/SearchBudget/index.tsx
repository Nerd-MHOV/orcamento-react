import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useRef, useState} from "react";
import { Box } from "@mui/system";
import useQuery from "../../hooks/urlQuery/query";

export const SearchInputBudget = ({
  setWord,
    word,
}: {
  setWord: React.Dispatch<React.SetStateAction<string>>;
  word: string
}) => {
  const query = useQuery();
  const searchRef = useRef();
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    const searchQuery = searchRef.current?.firstChild?.value;
    setWord(encodeURI(searchQuery));
  };

  useEffect(() => {
    if(query.get("find")) {
      setWord(query.get("find")!)
    }
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <form onSubmit={onSearch}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          ref={searchRef}
          placeholder="Buscar..."
          inputProps={{ "aria-label": "search" }}
          defaultValue={decodeURI(word)}
        />
      </Search>
    </form>
  );
};
