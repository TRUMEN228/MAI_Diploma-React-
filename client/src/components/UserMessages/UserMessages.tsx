import { FC } from "react";
import "./UserMessages.css";
import { User } from "../../api/User";
import { Student } from "../../api/Student";
import { Teacher } from "../../api/Teacher";
import { TeacherMessages } from "../TeacherMessages";
import { StudentMessages } from "../StudentMessages";

interface IUserMessagesProps {
  customData: Student | Teacher | {};
  user: User;
};

export const UserMessages: FC<IUserMessagesProps> = ({
  customData,
  user
}) => {
  switch (user.accountStatus) {
    case "student":
      return (
        <div className="container messages__container">
          <StudentMessages
            student={customData as Student}
            user={user}
          />
        </div>
      );
    case "teacher":
      return (
        <div className="container messages__container">
          <TeacherMessages
            teacher={customData as Teacher}
            user={user}
          />
        </div>
      );
    case "admin":
      return (
        <></>
      );
  }
};