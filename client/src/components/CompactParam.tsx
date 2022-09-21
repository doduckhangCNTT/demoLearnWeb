import React, { useState } from "react";

interface IProps {
  param: string;
  quantitySlice: number;
}

const CompactParam: React.FC<IProps> = ({ param, quantitySlice }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      {toggle && param.length > 100 ? (
        <div>
          {param.slice(0, quantitySlice)} . . .
          <small
            onClick={() => setToggle(false)}
            className="hover:text-sky-500 cursor-pointer mx-3"
          >
            Show detail
          </small>
        </div>
      ) : (
        <div className="">
          {param.length < 50 ? (
            <div className="">{param}</div>
          ) : (
            <div>
              {param}
              <small
                onClick={() => setToggle(true)}
                className="hover:text-sky-500 cursor-pointer mx-3"
              >
                Disable
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompactParam;
