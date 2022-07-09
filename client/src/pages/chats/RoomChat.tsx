import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowUserSearch from "../../components/chats/ShowUserSearch";
import useDebounce from "../../hooks/useDebounce";
import { authSelector } from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import { InputChangedEvent, IUser } from "../../utils/Typescript";

const RoomChat = () => {
  const { authUser } = useSelector(authSelector);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userName, setUserName] = useState("");
  const [listUserToJoinRoom, setListUserToJoinRoom] = useState<IUser[]>([]);
  const debounced = useDebounce(userName, 800);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setUserName(value);
  };

  useEffect(() => {
    const solution = async () => {
      const res = await getApi(
        `search_user?username=${debounced}`,
        authUser.access_token
      );
      setUsers(res.data.users);
    };
    if (debounced.trim()) solution();
  }, [authUser.access_token, debounced]);

  return (
    <div className="mt-[20px]">
      <form action="flex gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={userName}
              className="p-3 shadow-md w-full outline-none"
              placeholder="Search user you want to join"
              onChange={handleChangeInput}
            />
            {/* Show User search  */}
            <div className="relative">
              {userName ? (
                <div className="absolute bg-white w-full shadow-md z-10 ">
                  <ShowUserSearch
                    users={users}
                    listUserToJoinRoom={listUserToJoinRoom}
                    setListUserToJoinRoom={setListUserToJoinRoom}
                    setUserName={setUserName}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-end bg-sky-500 text-white items-center hover:opacity-[0.8]"
          >
            Create Room
          </button>
        </div>
      </form>

      {/* List user JoinRoom  */}
      <div className="flex gap-2 flex-wrap">
        {listUserToJoinRoom?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-2 p-2 bg-sky-500 rounded-full mt-[10px] relative peer"
            >
              <span className="">{item.name}</span>
              <button className="transition absolute -top-[10px] -right-[10px] hover:bg-red-200 rounded-full cursor-pointer p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomChat;
