import { IMessage } from "@/api/v1";
import { classNames } from "@/components/shared";
import { Stack } from "@mui/material";

import cls from './MessageBlock.module.scss';

interface IMessageBlockProps {
  message: IMessage;
}

export const MessageBlock = (props: IMessageBlockProps) => {
  const { message } = props;

  return (
    <Stack className={classNames(cls.MessageWrapper, { [cls.MessageWrapperActive]: message.role === 'user' })}>
      <Stack className={cls.MessageBlock}>
        {message.content}
      </Stack>
    </Stack>
  );
};
