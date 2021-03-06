import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcons from "../../components/icons/AddIcons";
import {
  closeIcon,
  iconOnInputMessage,
  optionsCall,
} from "../../components/icons/Icons";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { messageSelector } from "../../redux/selector/selectors";
import {
  FormSubmit,
  InputChangedEvent,
  IRoomChatList,
  IUser,
} from "../../utils/Typescript";
import TabOption from "./tab/TabOption";

interface IProps {
  value?: IUser | IRoomChatList;
  text: string;
  setText: (text: string) => void;

  media: File[];
  setMedia: (media: File[]) => void;
  handleSubmit: (e: FormSubmit) => void;
  children?: JSX.Element;

  room?: IRoomChatList;
}

const ShowContentChat: React.FC<IProps> = ({
  value,
  text,
  setText,
  media,
  setMedia,
  handleSubmit,
  children,
  room,
}) => {
  const { conversation } = useSelector(messageSelector);
  const dispatch = useDispatch();
  const refDisplay = useRef<HTMLDivElement>(null);
  const refPageEnd = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(1);
  const [toggleTab, setToggleTab] = useState(false);

  useEffect(() => {
    // if(page > conversation.)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if ((conversation.data as any).result >= (page - 1) * 9) {
            setPage((p) => p + 1);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(refPageEnd.current as HTMLButtonElement);
  }, [conversation.data, page]);

  const handleChangeMedia = (e: InputChangedEvent) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files ? target.files : []);

    let err: string[] = [];
    let newArr: any[] = [];

    files.forEach((file) => {
      if (!files) return err.push("File no longer exists: " + file);
      if (file.size > 1024 * 1024 * 1024) err.push("File too large: " + file);
      if (err.length > 0)
        return dispatch(alertSlice.actions.alertAdd({ error: err.toString() }));

      return newArr.push(file);
    });
    setMedia([...media, ...newArr]);
  };

  const handleDelete = (index: number) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleChangeInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setText(value);
  };

  return (
    <div className="relative">
      <div className="sticky top-[60px] z-10 flex justify-between p-2 shadow-md bg-white">
        {/* Info User / Room */}
        <div className="">
          <div className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md">
            {/* Check Room  */}
            {(value as IRoomChatList)?.users?.length > 0 ? (
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setToggleTab(!toggleTab)}
              >
                {/* Image Users in Room  */}
                <div className="mt-3 grid grid-cols-2 grid-rows-2 overflow-hidden">
                  {(value as IRoomChatList)?.users
                    .slice(0, 4)
                    .map((user, index) => {
                      return (
                        <div key={index}>
                          <img
                            className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                            src={user.avatar}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>

                <div className="text-[20px] font-bold">
                  {(value as IRoomChatList)?.name}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={`${(value as IUser)?.avatar}`}
                  alt="man"
                />
                <div className="ml-3 overflow-hidden w-full">
                  <Link to="" className="text-sm font-medium text-slate-900">
                    {value?.name}
                  </Link>
                  <p className="text-sm text-slate-500 truncate">Time</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-2 items-center">
          {optionsCall.map((option, index) => {
            return (
              <div className="flex gap-2 hover:opacity-[0.8]" key={index}>
                {option.icon}
              </div>
            );
          })}
        </div>
      </div>
      {/* Tab Options  */}
      {toggleTab ? (
        <div className="absolute h-full w-full z-10 bg-white opacity-[0.8]">
          <TabOption room={room} />
        </div>
      ) : (
        ""
      )}

      <div className="flex h-[100vh] flex-col justify-end  ">
        {/* Contents */}
        <div ref={refDisplay} className="h-[100vh] overflow-auto touch-auto">
          <div className="bottom-0 ">
            <button className="w-full p-2 border-2" ref={refPageEnd}>
              LoadMore
            </button>

            {children}
          </div>
        </div>

        <div className="mt-2">
          {/* Show image video */}
          <div
            className={`flex gap-2 p-2 ${media.length > 0 ? "border-2" : ""}`}
          >
            {media.map((m, index) => {
              return (
                <div key={index} className="relative group">
                  <div className="inline-block h-[100px]">
                    {(m as File).type === "video/mp4" ? (
                      <video controls className="h-full">
                        <source
                          type="video/mp4"
                          src={URL.createObjectURL(m)}
                        ></source>
                      </video>
                    ) : (
                      // <img
                      //   src={URL.createObjectURL(m)}
                      //   alt="images"
                      //   className="h-full"
                      // />

                      <LazyLoadingImg
                        url={URL.createObjectURL(m)}
                        alt="images"
                        className="h-full"
                      />
                    )}
                  </div>

                  {/* Delete Image Video */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-0 right-0 hidden group-hover:block transition hover:bg-sky-300 hover:text-white rounded-full"
                  >
                    {closeIcon.icon}
                  </button>
                </div>
              );
            })}
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full my-3 flex gap-3 items-center"
          >
            <input
              type="text"
              value={text}
              placeholder="Message your ..."
              className="bg-slate-200 w-full rounded-full p-3 outline-none"
              onChange={handleChangeInput}
            />
            {/* Icon, Image */}
            <div className="flex gap-2 items-center">
              <AddIcons text={text} setText={setText} />
              <div>
                <div className="flex justify-center items-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full  cursor-pointer "
                  >
                    <div className="flex flex-col justify-center items-center">
                      {iconOnInputMessage.image.icon}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      name="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleChangeMedia}
                    />
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="opacity-0"></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowContentChat;
