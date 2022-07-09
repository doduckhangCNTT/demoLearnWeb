import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { authSelector, messageSelector } from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import { InputChangedEvent, IUser } from "../../utils/Typescript";

const Conversations = () => {
  const options = [
    {
      name: "Options Other",
      path: "/options",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "crateRoom",
      path: "newRoom",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
  ];

  const { authUser } = useSelector(authSelector);
  const { conversation } = useSelector(messageSelector);

  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const debounced = useDebounce(searchUser, 800);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setSearchUser(value);
  };

  useEffect(() => {
    const solution = async () => {
      const listUserSearch = await getApi(
        `search_user?username=${debounced}`,
        authUser.access_token
      );
      console.log(listUserSearch);
      setUsers(listUserSearch?.data.users);
    };

    if (debounced.trim()) solution();
  }, [authUser.access_token, debounced]);

  return (
    <div className="sticky top-[60px]">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="text-[25px] font-bold">Conversation</h1>

            {/* Options */}
            <div className="flex gap-2">
              {options.map((option, index) => {
                return (
                  <Link
                    to={option.path}
                    key={index}
                    className="rounded-full p-2 bg-gray-300 hover:opacity-[0.8] cursor-pointer items-center justify-center "
                  >
                    {option.icon}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex border-2 rounded-full">
            {/* Search */}
            <form action="" className="flex items-center w-full ">
              <input
                type="text"
                placeholder="Search..."
                className="outline-0 rounded-full w-full px-5 py-2"
                onChange={handleChangeInput}
              />
              <button className="hover:bg-sky-600 hover:text-white rounded-r-full h-full transition px-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Lists of conversations */}
        <div className="flex flex-col  touch-pan-y">
          <ul className="w-full">
            {(searchUser ? users : conversation.usersChatted).map(
              (user, index) => {
                return (
                  <li
                    key={index}
                    className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md"
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
                    <div className="ml-3 overflow-hidden w-full flex flex-col">
                      <Link
                        to={`chat/${user._id}`}
                        className="text-sm font-medium text-slate-900"
                      >
                        {user.name}
                      </Link>
                      <small className="text-sm text-slate-500 truncate">
                        {user.text
                          ? user.text.length > 20
                            ? user.text.slice(0, 20) + "..."
                            : user.text
                          : user.account}
                      </small>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
