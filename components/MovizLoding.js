import React from "react";

const MovizLoding = ({ backdrop }) => {
  const backdropStyle = `bg-` + `[` + "url(" + backdrop + `)]`;

  console.log(backdropStyle);
  return (
    <div
      className={
        "flex justify-center items-center h-[100vh] relative w-[100vw] overflow-hidden "
        // backdropStyle
      }
      // style={{
      //   background: "black",
      // }}
    >
      <img
        src={backdrop || "/defaultBackdrop.jpg"}
        className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
      />
      <style>{`
          .loadinglogoaniminit:after {
            content: "";
            animation: paddinganim 1.3s linear infinite;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            position: absolute;
            border: 2px solid white;
            background: rgba(0, 0, 225, 0.2);
          }
          .loadinglogomainimganiminit {
            animation: scalepulseanim 1.3s linear infinite;
          }
        `}</style>
      <div className="1p-3 1border-white 1border-2 rounded-full loadinglogoaniminit ">
        <img
          className="w-[10rem] loadinglogomainimganiminit "
          src="https://res.cloudinary.com/dk3vn0s8q/image/upload/v1670283581/Mtransparent_sfuk3e_jczlrs.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default MovizLoding;
