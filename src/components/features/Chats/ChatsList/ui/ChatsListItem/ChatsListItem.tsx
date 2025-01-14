import { IChat } from "@/api/v1";
import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { lightTheme } from "@/theme/colors";

interface IChatsListItemProps {
  chat: IChat;
  active?: boolean;
  onDelete: (chat: IChat) => void;
  onClick: (chat: IChat) => void;
}

export const ChatsListItem = (props: IChatsListItemProps) => {
  const { chat, active, onDelete, onClick } = props;
  const { colors } = lightTheme;

  const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>, chat: IChat) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(chat);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={() => onClick(chat)}
      sx={{
        px: 1,
        py: 1,
        cursor: "pointer",
        backgroundColor: active ? colors.background.secondary : "transparent",
        "&:hover": {
          backgroundColor: !active ? colors.background.secondary : undefined,
          "& .delete-button": {
            opacity: 1
          }
        },
        transition: "background-color 0.2s ease",
        borderRadius: "4px",
        margin: "0 1px",
        borderBottom: "1px solid #a0a0a0",
      }}
    >
    

      {/* Chat Name */}
      <Stack 
        direction="column" 
        spacing={0.1} 
        sx={{ 
          flex: 1,
          minWidth: 0 // Enable text truncation
        }}
      >
        <Typography 
          sx={{
            color: active ? colors.text.primary : colors.text.secondary,
            fontSize: "14px",
            fontWeight: active ? 500 : 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {chat.name}
        </Typography>
      </Stack>

      {/* Delete Button */}
      <IconButton
        className="delete-button"
        size="small"
        onClick={(e) => onDeleteHandler(e, chat)}
        sx={{
          opacity: 0,
          transition: "opacity 0.2s ease",
          color: colors.text.secondary,
          "&:hover": {
            backgroundColor: "transparent",
            color: colors.error
          },
          padding: 0
        }}
      >
        <Delete sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  );
};
