import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  quickTestNowSelector,
  quickTestsSelector,
} from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import { FormSubmit, IQuickTest } from "../../../utils/Typescript";
import ShowAnswer from "./ShowAnswer";

const ShowPrevious = () => {
  const numberQuestions = [
    {
      name: 1,
      path: "",
    },
    {
      name: 2,
      path: "",
    },
    {
      name: 3,
      path: "",
    },
    {
      name: 4,
      path: "",
    },
    {
      name: 5,
      path: "",
    },
  ];

  const questions = [
    {
      title: "Mot nam co bao nhieu thang",
      answers: [
        {
          content: "12 thang",
        },
        {
          content: "10 thang",
        },
        {
          content: "11 thang",
        },
        {
          content: "9 thang",
        },
      ],
      answerCorrect: "1",
    },
    {
      title: "Ngon ngu lap trinh nao pho bien nhat hien nay?",
      answers: [
        {
          content: "Javascript",
        },
        {
          content: "Java",
        },
        {
          content: "Python",
        },
        {
          content: "Rust",
        },
      ],
      answerCorrect: "3",
    },
  ];

  const [quickTest, setQuickTest] = useState<IQuickTest>();

  const { quickTests } = useSelector(quickTestsSelector);
  const { quickTestNow } = useSelector(quickTestNowSelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const { idQuickTest } = useParams();

  const [test, setTest] = useState("");

  useEffect(() => {
    const handle = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }
      const res = await getApi(
        `quickTest/${idQuickTest}`,
        authUser.access_token
      );

      setQuickTest(res.data.quickTest);
    };

    handle();
  }, [authUser.access_token, dispatch, idQuickTest, quickTestNow.id]);

  let s = "";

  const state = {
    keyword: "test",
  };

  const [results, setResults] = useState<string[]>([]);

  const handleInitialValueOfResult = useCallback(() => {
    const emptyString = [] as string[];
    quickTest?.questions?.forEach((qt) => {
      emptyString.push("");
    });

    console.log(emptyString);
    setResults(emptyString);
  }, [quickTest]);

  useEffect(() => {
    handleInitialValueOfResult();
  }, [handleInitialValueOfResult]);

  const handleChangeInput = (props: any) => {
    const { e, quickTestOrder } = props as any;
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      // if (e.target.checked) {
      //   setTest(test.concat(value.toString()));
      //   console.log("Checked", { name, test });
      // }

      if (results[quickTestOrder]) {
        const newString = [];
        const positionChar = results[quickTestOrder].indexOf(value.toString());
        if (positionChar !== -1) {
          for (var i = 0; i < results[quickTestOrder].length; i++) {
            if (results[quickTestOrder][i] !== value.toString()) {
              newString.push(results[quickTestOrder][i]);
            }
          }

          results[quickTestOrder] = newString.join("");
        } else {
          const test = results[quickTestOrder].concat(value.toString());
          results[quickTestOrder] = test;
        }
      } else {
        results[quickTestOrder] = value.toString();
      }

      setResults(results);
      console.log("Result Checkbox: ", results);
    } else {
      s = value;
      console.log("Radio", { name, s, quickTestOrder });

      results[quickTestOrder] = s;
      setResults(results);
      console.log("Results: ", results);
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    quickTests.forEach((qt) => {
      if (qt._id === idQuickTest) {
        // for (var i = 0; i < qt?.questions?.length; i++) {
        //   qt.questions[i].correctly === results[quickTestOrder][i]
        // }
      }
    });
  };

  return (
    <div className="flex gap-2 w-2/3 mx-auto">
      <div className="flex flex-col gap-2 w-2/3 shadow-md p-3">
        {/* Title of quickTest  */}
        <div className="">
          <div
            // className="hidden"
            dangerouslySetInnerHTML={{
              __html: quickTest?.titleTest ? quickTest.titleTest : "",
            }}
          />

          {/* <h1 className="font-bold text-[30px]">
            {quickTest?.titleTest}
          </h1> */}
        </div>

        {/* Show all questions of quickTest */}
        <div className="w-full">
          <form action="" onSubmit={handleSubmit}>
            {quickTest?.questions?.map((q, index) => {
              return (
                <div key={index} className="mt-2">
                  <h1 className="text-[20px] flex gap-2">
                    <div className="">Cau {index + 1}:</div>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: q.titleQuestion,
                      }}
                    />
                  </h1>
                  <div className="ml-[20px]">
                    {q.answers.map((a, i) => {
                      return (
                        <div key={i} className="flex gap-2">
                          <input
                            type={q.typeQuestion}
                            id={`${a.content}`}
                            name={`${q.titleQuestion}`}
                            value={i}
                            onChange={(e) =>
                              handleChangeInput({ e, quickTestOrder: index })
                            }
                            ref={inputRef}
                          />
                          <label
                            htmlFor={`${a.content}`}
                            className="text-[16px]"
                          >
                            {a.content}
                          </label>
                        </div>
                        // <div className="" key={i}>
                        //   <ShowAnswer
                        //     typeQuestion={q.typeQuestion}
                        //     content={`${a.content}`}
                        //     titleQuestion={`${q.titleQuestion}`}
                        //     index={i}
                        //     // handleChangeInput={}
                        //   />
                        // </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button className="" type="submit"></button>
          </form>

          <div className="w-full flex justify-end mt-5">
            <button
              className="
              border-2 p-2
            hover:bg-sky-500 hover:text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/3 shadow-md p-2 sticky">
        <h1 className="font-bold text-[20px]">Time: {quickTest?.time}.00</h1>
        <div>
          <h2>Tat ca cac cau da lam</h2>
          <div className="grid gap-2 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5">
            {quickTest?.questions?.map((n, index) => {
              return (
                <div
                  key={index}
                  className="
                    w-[20px] h-[20px] 
                    p-3 border-2 rounded-full
                    flex items-center justify-center
                  hover:bg-green-500 hover:text-white cursor-pointer"
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPrevious;
