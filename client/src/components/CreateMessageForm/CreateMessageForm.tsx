import { ChangeEventHandler, FC, FormEventHandler, useState, useRef } from "react";
import { User } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { createMessage, MessageFile } from "../../api/Message";
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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [messageText, setMessageText] = useState<string>('');

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [filesObj, setFilesObj] = useState<MessageFile[]>([]);

  const [uploadData, setUploadData] = useState<FormData>();

  const createMessageMutation = useMutation({
    mutationFn: () => createMessage(uploadData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
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
        const fileObj = {
          name: inputFileList.item(i)?.name,
          size: inputFileList.item(i)?.size,
          type: inputFileList.item(i)?.type,
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

    const mesageObj = {
      text: messageText,
      userId: user.id,
      groupId: user.groupId
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify(mesageObj));

    let sumFileSize = 0;

    if (!messageText) {
      setErrorMessage("Сообщение должно содержать хотя бы 1 символ");
      return;
    }

    if (selectedFiles?.length) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        sumFileSize += selectedFiles[i].size;
        formData.append('files', selectedFiles[i]);
      }

      if (sumFileSize > MAX_FILES_SIZE) {
        setErrorMessage("Размер файлов превышает 50 Мб");
        return;
      }
    }

    setUploadData(formData);

    console.log(formData);
    console.log(filesObj);

    createMessageMutation.mutate();
  }

  return (
    <>
      <form
        className="chat__form"
        name="files"
      >
        <textarea
          className="chat__text"
          maxLength={300}
          placeholder="Введите сообщение"
          ref={textarea}
          value={messageText}
          onChange={(event) => setMessageText(event.currentTarget.value)}
        />
        {/* <p>{createMessageMutation.error?.message}</p> */}
        <div className="chat__control">
          <div className="chat__file">
            <input
              name="messageFiles"
              type="file"
              multiple
              hidden
              ref={fileInput}
              onChange={(event) => handleChooseFile(event)}
            />
            <Button
              className="chat__file-select-button"
              kind="secondary"
              onClick={handleClick}
            >
              Выбрать файл
            </Button>
          </div>
          <Button
            className="chat__send-button"
            kind="primary"
            type="submit"
            isLoading={createMessageMutation.isPending}
            onClick={handleSubmit}
          >
            Отправить
          </Button>
        </div>
      </form>
      <p className="chat__error">{errorMessage}</p>
        {
          filesObj?.length ?
          <>
            <p className="chat__files-title">Выбранные файлы:</p>
            <div className="chat__file-container">
              {
                filesObj.map((item) => (
                  <div className="chat__selected-file" key={item?.name}>
                    <span className="file__name">{item?.name} </span>
                    <span className="file__size">{roundFileSize(item?.size)} МБ</span>
                  </div>
                ))
              }
            </div>
          </>
            : null
        }
    </>
  );
};