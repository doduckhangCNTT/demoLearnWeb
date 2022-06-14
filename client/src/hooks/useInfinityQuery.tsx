import React, { useCallback, useEffect, useRef, useState } from "react";
import { getApi } from "../utils/FetchData";
import { IBlog } from "../utils/Typescript";

interface IProps {
  // url: string;
  // listBlogs: IBlog[];
  // setListBlogs: (value: any) => void;

  // quality: number;
  // setQualities: (quality: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  qualityStart: number;
  setQualityStart: (quality: number) => void;
  blogs: IBlog[];
}

const useInfinityQuery = ({
  limit,
  setLimit,
  qualityStart,
  setQualityStart,
  blogs,
}: IProps) => {
  // console.log({ url, option });

  const btnRef = useRef<HTMLButtonElement>(null);

  // const [limit, setLimit] = useState(3);
  const [firstLoad, setFirstLoad] = useState(false);
  const [stop, setStop] = useState(false);
  const [disable, setDisable] = useState(false);

  // const [listBlogs, setListBlogs] = useState<IBlog[]>([]);
  // console.log("ListBlog: ", listBlogs);

  // useEffect(() => {
  //   const solution = async () => {
  //     // const res = await getApi(`${url}&page=${page}`);

  //     // console.log("Res: ", res);
  //     // if (res.data) {
  //     //   res.data?.forEach((blog: IBlog) => {
  //     //     const res = listBlogs.find((item) => item._id === blog._id);
  //     //     if (!res) {
  //     //       setListBlogs((prev: IBlog[]) => [...prev, blog]);
  //     //     }
  //     //   });
  //     // }
  //     // if (firstLoad) setListBlogs((prev: IBlog[]) => [...prev, ...res.data]);

  //     // if (res.data.length < limit) setStop(true);
  //     // setQualities(quality + 3);
  //     setFirstLoad(true);
  //   };
  //   console.log("Call api");
  //   solution();
  // }, []);

  const handleLoadMore = useCallback(() => {
    if (limit >= blogs.length - 2) {
      setDisable(true);
      return;
    }
    console.log("LoadMore");

    setQualityStart(limit);
    setLimit(limit + 3);
  }, [limit, setLimit, setQualityStart, blogs.length]);

  useEffect(() => {
    const btn = btnRef.current;
    const observer = new IntersectionObserver((entries) => {
      console.log("Intersecting: ", entries[0].isIntersecting);
      if (entries[0].isIntersecting) {
        handleLoadMore();
      }
    });

    if (btn) observer.observe(btn);
    return () => {
      if (btn) return observer.unobserve(btn);
    };
  }, [handleLoadMore]);

  const BtnRender = () => {
    return (
      <div>
        <button
          className=" text-white bg-cyan-600 p-2 rounded hover:opacity-80"
          onClick={handleLoadMore}
          ref={btnRef}
        >
          Load More
        </button>
      </div>
    );
  };

  return { BtnRender };
};

export default useInfinityQuery;
