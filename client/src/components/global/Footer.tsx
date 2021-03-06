import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const listInfoInFooter = [
    {
      title: "Học Lập Trình Để Đi Làm",
      info: [
        {
          path: "",
          name: "Điện thoại: 0246.329.1102",
        },
        {
          path: "",
          name: "Email: contact@fullstack.edu.vn",
        },
        {
          path: "",
          name: "Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà Nội",
        },
      ],
    },

    {
      title: "VỀ F8",
      info: [
        {
          path: "",
          name: "Giới thiệu",
        },
        {
          path: "",
          name: "Cơ hội việc làm",
        },
        {
          path: "",
          name: "Đối tác",
        },
      ],
    },
    {
      title: "HỖ TRỢ",
      info: [
        {
          path: "",
          name: "Liên hệ",
        },
        {
          path: "",
          name: "Bảo mật",
        },
        {
          path: "",
          name: "Điều khoản",
        },
      ],
    },
    {
      title: "CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8",

      info: [
        {
          path: "",
          name: "Mã số thuế: 0109922901",
        },
        {
          path: "",
          name: "Ngày thành lập: 04/03/2022",
        },
        {
          path: "",
          name: "Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những sản phẩm mạng lại giá trị cho cộng đồng.",
        },
      ],
    },
  ];

  return (
    <div className="container-style z-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3 content-end text-color-white">
      {listInfoInFooter.map((item, index) => {
        return (
          <div key={index} className="text-left">
            <ul>
              <li>
                <h1 className="uppercase text-[18px]">{item.title}</h1>
              </li>
              {item.info.map((value, index) => {
                return (
                  <li key={index}>
                    <Link to={`${value.path}`}>{value.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
