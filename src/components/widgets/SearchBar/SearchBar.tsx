import { Search, Clear } from "@mui/icons-material";
import { IconButton, InputBase, Stack } from "@mui/material";
import { useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search..." }: SearchBarProps) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [searchQuery, setSearchQuery] = useState("");


  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch("");
  }, [onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        backgroundColor: colors.background.secondary,
        borderRadius: "8px",
        px: 1.5,
        py: 0.5,
        gap: 1,
        width: "100%",
        border: `1px solid ${colors.border.divider}`,
        "&:hover": {
          backgroundColor: colors.background.input,
        },
      }}
    >
      <Search sx={{ color: colors.text.secondary, fontSize: 20 }} />
      <InputBase
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        sx={{
          color: colors.text.primary,
          "& ::placeholder": {
            color: colors.text.secondary,
            opacity: 1,
          },
        }}
      />
      {searchQuery && (
        <IconButton 
          size="small" 
          onClick={handleClear}
          sx={{ color: colors.text.secondary }}
        >
          <Clear sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Stack>
  );
}; 