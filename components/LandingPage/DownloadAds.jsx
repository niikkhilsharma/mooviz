import React from "react";

function DownloadAds() {
  const downloadImgStyle =
    "border-[2px] border-[#232A4E] rounded-[13px] h-[3rem] w-[10rem] translate-x-[-1rem]";
  return (
    <div className="download mt-[0.5rem] w-[110%] flex justify-center ">
      <div className="download_images flex">
        <img
          src={
            "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334317/App_Store_jkyf0y.png"
          }
          alt=""
          className={"cursor-pointer " + downloadImgStyle + ` mr-[2rem]`}
          onClick={() => {
            document.location.href =
              "https://drive.google.com/uc?export=download&id=1MrrBVrWaW0pDNr2xE1m9iEgcXBchdJ1f&confirm=t";
          }}
        />
        <img
          src={
            "https://res.cloudinary.com/dk3vn0s8q/image/upload/v1671334318/Google_Play_ej4nlp.png"
          }
          alt=""
          className={"cursor-pointer " + downloadImgStyle}
          onClick={() => {
            document.location.href =
              "https://drive.google.com/uc?export=download&id=1MrrBVrWaW0pDNr2xE1m9iEgcXBchdJ1f&confirm=t";
          }}
        />
      </div>
    </div>
  );
}

export default DownloadAds;
