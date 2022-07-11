import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddIcons from "../../components/icons/AddIcons";
import {
  closeIcon,
  iconOnInputMessage,
  optionsCall,
} from "../../components/icons/Icons";
import messageAction from "../../redux/action/message/messageAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { authSelector, messageSelector } from "../../redux/selector/selectors";
import { getApi, postApi } from "../../utils/FetchData";
import {
  FormSubmit,
  IMessage,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";
import ShowMessages from "./ShowMessages";

const ContentChat = () => {
  const { authUser } = useSelector(authSelector);
  const { conversation } = useSelector(messageSelector);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File[]>([]);

  useEffect(() => {
    const solution = async () => {
      const res = await getApi(`users/${id}`, authUser.access_token);
      setUser(res.data.user);
    };

    solution();
  }, [authUser.access_token, id]);

  useEffect(() => {
    if (!id || !authUser.access_token) return;

    messageAction.getMessages(id, authUser, dispatch);
  }, [authUser, dispatch, id]);

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

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token || !authUser.user || !id) return;

    let imgArr = [];
    if (media.length > 0) {
      for (const item of media) {
        let formData = new FormData();
        if ((item as any).camera) {
          formData.append("file", (item as any).camera);
        } else {
          formData.append("file", item);
        }

        const res = await postApi(
          "upload_imgVideo",
          formData,
          authUser.access_token
        );

        console.log("Res Upload: ", res);
        const data = await res.data;
        imgArr.push({
          mimetype: data.format,
          public_id: data.public_id,
          url: data.secure_url,
        });
      }
    }
    const msg = {
      sender: authUser.user,
      recipient: id,
      text,
      media: imgArr,
    };
    messageAction.createMessage(msg, authUser.access_token, dispatch);
    setText("");
    setMedia([]);
  };

  return (
    <div className="relative">
      <div className="sticky top-[60px] flex justify-between p-2 shadow-md bg-white">
        {/* Info User */}
        <div className="">
          <div className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={`${user?.avatar}`}
              alt="man"
            />
            <div className="ml-3 overflow-hidden w-full">
              <Link to="" className="text-sm font-medium text-slate-900">
                {user?.name}
              </Link>
              <p className="text-sm text-slate-500 truncate">Time</p>
            </div>
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

      <div className="flex h-[100vh] flex-col justify-end  ">
        {/* Contents */}
        <div className="h-[100vh] flex flex-col justify-end ">
          {(conversation?.data as any).messages?.map(
            (msg: IMessage, index: React.Key | null | undefined) => {
              return (
                <div key={index} className="mt-2">
                  <ShowMessages msg={msg} />
                </div>
              );
            }
          )}
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
                      <img
                        src={URL.createObjectURL(m)}
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

export default ContentChat;
