import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowUserSearch from "../../components/chats/ShowUserSearch";
import { closeIcon } from "../../components/icons/Icons";
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
                {closeIcon.icon}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomChat;
