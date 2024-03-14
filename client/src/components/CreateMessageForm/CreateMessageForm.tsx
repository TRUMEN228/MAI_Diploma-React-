import { FC, useRef, useState } from "react";
import { User } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { createMessage, File } from "../../api/Message";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import "./CreateMessageForm.css";

interface ICreateMessageFormProps {
  user: User;
};

export const CreateMessageForm: FC<ICreateMessageFormProps> = ({
  user
}) => {
  const createMessageMutation = useMutation({
    mutationFn: () => createMessage(
      messageText,
      user.id,
      user.group,
      files
    ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    }
  }, queryClient);

  const [messageText, setMessageText] = useState<string>('');
  const [files, setFiles] = useState<File[] | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();

    const fileList = [];

    // if (!fileInputRef.current?.oncancel) {
    //   for (const file of fileInputRef.current?.files) {
    //     fileList.push({

    //     })
    //   }
    //   setFiles(fileInputRef.current?.files);
    // }

    console.log(files)
  }

  return (
    <form className="chat__form">
      <textarea
        className="chat__text"
        maxLength={100}
        placeholder="Введите сообщение"
        value={messageText}
        onChange={(event) => setMessageText(event.currentTarget.value)}
      />
      <div className="chat__file">
        <input type="file" ref={fileInputRef} multiple/>
        <Button
          kind="secondary"
          text="Выбрать файл"
          onClick={handleChooseFile}
        />
      </div>
      <Button
        kind="primary"
        text="Отправить"
        type="submit"
        isLoading={createMessageMutation.isPending}
      />
    </form>
  );
};