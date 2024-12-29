import { IChat } from "@/api/v1";
import { Delete } from "@mui/icons-material";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import { MouseEvent } from "react";

import cls from './ChatsListItem.module.scss';
import { classNames } from "@/components/shared";

interface IChatsListItemProps {
  chat: IChat;
  active?: boolean;
  onDelete: (chat: IChat) => void;
  onClick: (chat: IChat) => void;
}

export const ChatsListItem = (props: IChatsListItemProps) => {
  const { chat, active, onDelete, onClick } = props;

  const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>, chat: IChat) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(chat);
  }

  return (
    <Card className={classNames(cls.Card, { [cls.CardActive]: active })} onClick={() => onClick(chat)}>
      <Typography className="relative truncate w-full">{chat.name}</Typography>
      <Typography variant="subtitle2" className="text-gray-500">{chat.id}</Typography>
      <Typography variant="subtitle2" className="text-gray-500">{chat.model}</Typography>

      {!active && <Stack className={cls.Actions}>
        <IconButton color='error' size="small" onClick={(e) => onDeleteHandler(e, chat)}>
          <Delete />
        </IconButton>
      </Stack>}
    </Card>
  );
}
