import React from "react";
import { IUser } from "../../utils/Typescript";

interface IProps {
  users: IUser[];
  listUserToJoinRoom: IUser[];
  setListUserToJoinRoom: (value: any) => void;
  setUserName: (value: any) => void;
}

const ShowUserSearch: React.FC<IProps> = ({
  users,
  listUserToJoinRoom,
  setListUserToJoinRoom,
  setUserName,
}) => {
  const handleAddUser = (user: IUser) => {
    if (listUserToJoinRoom.includes(user)) return;
    setListUserToJoinRoom([...listUserToJoinRoom, user]);
    setUserName("");
  };

  return (
    <div>
      <ul className="w-full">
        {users?.map((user, index) => {
          return (
            <li
              key={index}
              className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md cursor-pointer"
              onClick={() => handleAddUser(user)}
            >
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={`${user.avatar}`}
                  alt="man"
                />
                <span
                  className={`absolute bottom-0 right-0  w-[10px] h-[10px] bg-green-500 rounded-full `}
                ></span>
              </div>
              <div className="ml-3 overflow-hidden w-full">
                <div className="text-sm font-medium text-slate-900">
                  {user.name}
                </div>
                <p className="text-sm text-slate-500 truncate">
                  {user.account}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowUserSearch;
