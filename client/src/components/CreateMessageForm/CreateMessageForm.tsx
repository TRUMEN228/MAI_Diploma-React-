import { ChangeEventHandler, FC, FormEventHandler, useState, useRef } from "react";
import { User } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { createMessage, MessageFile, uploadFile } from "../../api/Message";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import "./CreateMessageForm.css";

interface ICreateMessageFormProps {
  user: User;
};

const roundFileSize = (fileSize: number | undefined) => {
  fileSize = fileSize ? fileSize / 1024 ** 2 : 0;
  return fileSize.toFixed(2);
}

const MAX_FILES_SIZE = 50 * 1024 * 1024;

export const CreateMessageForm: FC<ICreateMessageFormProps> = ({
  user
}) => {
  const [messageText, setMessageText] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [filesObj, setFilesObj] = useState<(MessageFile | null)[] | undefined>([]);
  const [files, setFiles] = useState<FormData>();

  const createMessageMutation = useMutation({
    mutationFn: () => createMessage(
      messageText,
      user.id,
      user.groupId,
      filesObj
    ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    }
  }, queryClient);

  const uploadFileMutation = useMutation({
    mutationFn: () => uploadFile(files),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["files"] })
    }
  }, queryClient);

  const fileInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChooseFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputFileList = event.currentTarget.files;
    const fileList = [];

    if (inputFileList) {
      setSelectedFiles(inputFileList);
    }

    if (inputFileList?.length) {
      for (let i = 0; i < inputFileList.length; i++) {
        const fileObj: MessageFile = {
          name: inputFileList.item(i)?.name,
          size: inputFileList.item(i)?.size,
          type: inputFileList.item(i)?.type,
          lastModified: inputFileList.item(i)?.lastModified
        };

        fileList.push(fileObj);
      }

      setFilesObj(fileList);
    } else {
      setFilesObj([]);
    }
  }

  const handleClick = () => {
    fileInput.current?.click();
  }

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const formData = new FormData();
    let sumSize = 0;

    if (selectedFiles?.length) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        sumSize += selectedFiles[i].size;
        formData.append('files', selectedFiles[i]);
      }

      if (sumSize > MAX_FILES_SIZE) {
        console.log("Размер файлов превышает 50 Мб");
        return;
      }
    }

    setFiles(formData);

    console.log(files);
    console.log(filesObj);

    if (messageText) {
      // createMessageMutation.mutate();
      uploadFileMutation.mutate();

      if (!uploadFileMutation.isSuccess) {
        console.log(uploadFileMutation.error?.message);
      }
    } else {
      console.log("Текст не введен");
    }
  }

  return (
    <form
      className="chat__form"
      name="files"
    >
      <textarea
        className="chat__text"
        maxLength={100}
        placeholder="Введите сообщение"
        ref={textarea}
        value={messageText}
        onChange={(event) => setMessageText(event.currentTarget.value)}
      />
      {/* <p>{createMessageMutation.error?.message}</p> */}
      <div className="chat__file">
        <input
          name="messageFiles"
          type="file"
          multiple
          hidden
          ref={fileInput}
          onChange={(event) => handleChooseFile(event)}
        />
        {filesObj?.length ? filesObj.map((item) => (
          <div key={item?.name}>
            <span>{item?.name} </span>
            <span>{roundFileSize(item?.size)} МБ</span>
          </div>
        )) : null}
        <Button
          kind="secondary"
          text="Выбрать файл"
          onClick={handleClick}
        />
      </div>
      <Button
        kind="primary"
        text="Отправить"
        type="submit"
        isLoading={createMessageMutation.isPending}
        onClick={handleSubmit}
      />
    </form>
  );
};