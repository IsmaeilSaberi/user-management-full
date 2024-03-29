"use client";
import { useState, useEffect } from "react";
import AllUsers from "./all-users";
import FindUser from "./find-user";
import UserDetails from "./user-details";

const UserMain = () => {
  const [userDetailCtrl, setUserDetailCtrl] = useState("");
  const [randNumForUserClick, setRandNumForUserClick] = useState(1);
  const [details, setDetails] = useState(
    <AllUsers
      setRandNumForUserClick={setRandNumForUserClick}
      setUserDetailCtrl={setUserDetailCtrl}
    />
  );

  useEffect(() => {
    if (userDetailCtrl != "") {
      setDetails(<UserDetails userId={userDetailCtrl} />);
    }
  }, [randNumForUserClick]);

  return (
    <div className="flex flex-col gap-10 relative pt-4 md:pt-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">کاربر ها</h1>
        <div className="flex justify-between md:justify-end items-center gap-10 md:gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllUsers
                  setRandNumForUserClick={setRandNumForUserClick}
                  setUserDetailCtrl={setUserDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded bg-[#2357b1] text-white transition-all duration-200 hover:bg-[#b17d23]"
          >
            همه
          </button>
          <button
            onClick={() =>
              setDetails(
                <FindUser
                  setRandNumForUserClick={setRandNumForUserClick}
                  setUserDetailCtrl={setUserDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded bg-[#2357b1] text-white transition-all duration-200 hover:bg-[#b17d23]"
          >
            پیدا کردن کاربر
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default UserMain;
