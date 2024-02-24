"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const UserDetails = ({ userId }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  /// go to top or scroll up smoothly function
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewedRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const displaynameRef = useRef();

  // this part used for getting one user details for using in default values
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user/${userId}`, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        setFullData(d.data);
        goToTop();
      })
      .catch((err) =>
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  }, [userId]);

  // here we update a user details
  const updater = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
    e.preventDefault();
    // CART, COMMENTS, PAYMENTS AND FILES SHOULD BE ADDED
    const formData = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      email: emailRef.current.value,
      viewed: viewedRef.current.value,
      username: usernameRef.current.value,
    };
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-user/${userId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        toast.success("کاربر با موفقیت آپدیت شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        let message = "خطایی در آپدیت و ذخیره کاربر رخ داد.";
        if (err.response.data.msg) {
          message = err.response.data.msg;
        }
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // this part is used to delete a user
  const remover = (e) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/remove-user/${userId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) =>
        toast.success("کاربر با موفقیت حذف شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) =>
        toast.error("حذف موفقیت آمیز نبود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <div className="flex flex-col gap-6">
      {fullData[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500 text-lg">جزئیات کاربر</h2>
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={() => remover()}
                className="bg-rose-500 text-white px-3 py-1 rounded text-xs transition-all duration-200 hover:bg-rose-600"
              >
                حذف
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div>تاریخ ایجاد :</div>
              <div>{fullData.createdAt ? fullData.createdAt : ""}</div>
            </div>
            <div className="bg-[#e5fcde] rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div> به روز رسانی :</div>
              <div>{fullData.updatedAt ? fullData.updatedAt : ""}</div>
            </div>
          </div>
          <form
            onKeyDown={formKeyNotSuber}
            onSubmit={updater}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>دیده شده</div>
              <select
                ref={viewedRef}
                className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              >
                {fullData.viewed && fullData.viewed == true ? (
                  <>
                    <option value="true">دیده شده</option>
                    <option value="false">دیده نشده</option>
                  </>
                ) : (
                  <>
                    <option value="false">دیده نشده</option>
                    <option value="true">دیده شده</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>ایمیل کاربر</div>
              <input
                defaultValue={fullData.email ? fullData.email : ""}
                required={true}
                type="text"
                ref={emailRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام کاربری (username)</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={usernameRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>نام نمایشی</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={displaynameRef}
                className="inputLtr p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#2357b1] p-2 w-full rounded text-white transition-all duration-200 hover:bg-[#b17d23]"
            >
              بروز رسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
