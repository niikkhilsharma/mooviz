import React, { useState, useEffect, useContext } from "react";

const ProfilePage = () => {
  return (
    <div className="bg-[rgb(17,24,39)] rounded-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[11] border-2 border-[rgba(255,255,255,0.2)]">
      <div>
        <div className="flex justify-center items-center flex-col">
          <img
            className="rounded-full p-[1rem] w-[10rem]"
            src="/user_image.png"
            alt=""
          />
          <h3 className="text-xl">Aditya</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
