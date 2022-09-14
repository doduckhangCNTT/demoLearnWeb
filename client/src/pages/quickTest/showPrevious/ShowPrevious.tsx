import React from "react";

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

  return (
    <div className="flex gap-2 w-2/3 mx-auto">
      <div className="flex flex-col gap-2 w-2/3 shadow-md p-3">
        {/* Title of quickTest  */}
        <div className="">
          <h1 className="font-bold text-[30px]">Tieu de bai test</h1>
        </div>

        {/* Show all questions of quickTest */}
        <div className="w-full">
          <form action="">
            {questions.map((q, index) => {
              return (
                <div key={index} className="mt-2">
                  <h1 className="text-[20px]">
                    Cau {index + 1}: {q.title}
                  </h1>
                  <div className="ml-[20px]">
                    {q.answers.map((a, i) => {
                      return (
                        <div key={i} className="flex gap-2">
                          <input
                            type="radio"
                            id={`${a.content}`}
                            name={`${q.title}`}
                          />
                          <label
                            htmlFor={`${a.content}`}
                            className="text-[16px]"
                          >
                            {a.content}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
        <h1 className="font-bold text-[20px]">Time: 00.00</h1>
        <div>
          <h2>Tat ca cac cau da lam</h2>
          <div className="grid gap-2 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5">
            {numberQuestions.map((n, index) => {
              return (
                <div
                  key={index}
                  className="
                    w-[20px] h-[20px] 
                    p-3 border-2 rounded-full
                    flex items-center justify-center
                  hover:bg-green-500 hover:text-white cursor-pointer"
                >
                  {n.name}
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
