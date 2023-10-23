// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { allhomemovies } from "../context/allcontexts";

function Thumbnail({ movie }) {
  //   console.log(movie);
  //   const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  //   const [showModal, setShowModal] = useRecoilState(modalState)
  var router = useRouter();
  var { toploadingbarref } = useContext(allhomemovies);
  // const [allowloadingcomp, Setallowloadingcomp] = useState(<></>);
  // movie.Category = useMemo(() => {
  //   var nowmobv = movie.Category.includes("Bolywood")
  //     ? "Bolywood"
  //     : movie.Category.includes("Hollywood")
  //     ? "Hollywood"
  //     : "";
  //   return nowmobv ? nowmobv : movie.Category;
  // }, [movie]);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes != 0 && rhours != 0) {
      return rhours + " Hr " + rminutes + " Min";
    } else if (rhours == 0) {
      return rminutes + " Min";
    } else if (rminutes == 0) {
      return rhours + " Hr";
    }
  }

  return (
    <>
      <div
        // className={`relative min-h-28 cursor-pointer transition duration-200 ease-out h-auto md:min-h-36 md:min-w-[260px] md:hover:scale-105`}
        className={` relative h-fit 1min-h-[0rem]  min-w-[125px] hover:z-[1]  cursor-pointer transition  duration-1000 ease-out 1h-auto md:min-w-[160px]   md:hover:scale-[1.25]`}
        onMouseEnter={(e) => {
          e.currentTarget.lastElementChild.style.clip =
            "rect(0rem, auto, auto, auto)";
          // e.currentTarget.lastElementChild.classList.add("scale-1");
          // e.currentTarget.lastElementChild.classList.add("w-full");
          // e.currentTarget.lastElementChild.classList.add("md:min-h-[5.5rem]");
          // e.currentTarget.lastElementChild.classList.add("md:opacity-100");
          // e.currentTarget.lastElementChild.classList.add("md:opacity-100");
          // e.currentTarget.lastElementChild.classList.remove("md:opacity-0");
          // e.currentTarget.lastElementChild.classList.remove("scale-0");
          // e.currentTarget.lastElementChild.classList.remove("w-0");
          // e.currentTarget.lastElementChild.classList.add("md:scale-y-auto");
          //   e.currentTarget.lastElementChild.classList.remove("md:scale-y-0");
          // e.currentTarget.lastElementChild.classList.remove("md:min-h-0");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.lastElementChild.style.clip =
            "rect(10rem, auto, auto, auto)";
          // e.currentTarget.lastElementChild.classList.remove("scale-1");
          // e.currentTarget.lastElementChild.classList.remove("w-full");
          // e.currentTarget.lastElementChild.classList.remove("md:min-h-[5.5rem]");
          // e.currentTarget.lastElementChild.classList.remove("md:opacity-100");
          // e.currentTarget.lastElementChild.classList.remove("md:opacity-100");
          // e.currentTarget.lastElementChild.classList.add("md:opacity-0");
          // e.currentTarget.lastElementChild.classList.add("scale-0");
          // e.currentTarget.lastElementChild.classList.add("w-0");
          //   e.currentTarget.lastElementChild.classList.remove("md:scale-y-auto");
          //    e.currentTarget.lastElementChild.classList.add("md:scale-y-0");
          // e.currentTarget.lastElementChild.classList.add("md:min-h-0");
        }}
        onClick={() => {
          // setCurrentMovie(movie)
          // Setallowloadingcomp(
          // );
          toploadingbarref.current.continuousStart();
          router.push({
            pathname: "/MovieDetails",
            query:
              movie.mode == "imdb"
                ? {
                    imdbID: movie.link,
                    type: movie.type,
                    mode: movie.mode,
                  }
                : {
                    l: btoa(movie.link),
                    type: movie.type,
                    mode: movie.mode,
                  },
            // mode: movie.mode,
          });
          // setShowModal(true)
        }}
      >
        <LazyLoadImage
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            if (!currentTarget.src.includes("images.weserv")) {
              currentTarget.src = `https://images.weserv.nl/?url=${currentTarget.src}`;
            } else {
            }
            // currentTarget.src =
            //   "https://conference.pacci.org/old/images/speaker-profile/maleProfile.jpg";
          }}
          id={`moviePoster${movie?.poster}`}
          src={
            movie?.poster ||
            "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
              movie?.backdrop_path
          }
          className="md:object-cover object-fill object-center rounded-lg h-[11rem] w-[160px]  md:w-[160px] md:h-[15rem]"
          // layout="fill"
        />
        <div
          style={{ clip: "rect(10rem, auto, auto, auto)" }}
          className={`rounded-lg transition-all overflow-hidden 1opacity-0 duration-[0.4s] w-full 1md:scale-y-0 ease-out 1scale-0 absolute bottom-[0]  hidden md:block`}
        >
          <h1
            style={{}}
            className="pb-[3px] font-semibold pl-2 pt-3 pr-3 w-full bg-gradient-to-t text-[10px]  from-[rgb(17,24,39)] via-[rgb(17,24,39)] to-[rgba(0,0,0,0)] rounded-t line-clamp-1 translate-y-[3px]"
          >
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* <div className="pl-2 pt-2 flex flex-row bg-gradient-to-t text-sm tracking-wider to-black via-[rgb(17,24,39)] from-[rgb(17,24,39)]">
          <h1 style={{ fontFamily: "Dosis" }} className="text-[10px]">
            {movie?.Duration != "N/A"
              ? timeConvert(movie?.Duration.replace("min", "").trim()) + ","
              : ""}
          </h1>
          <h1 style={{ fontFamily: "Dosis" }} className="text-[10px]">
            {" " + movie?.Category + ","}
          </h1>
          <h1 style={{ fontFamily: "Dosis" }} className="text-[10px]">
            {" " + movie?.ReleaseYear}
          </h1>
        </div> */}
          <h3
            // style={{ fontFamily: "Barlow" }}
            className="pl-2 pr-2 pt-[3px] bg-[rgb(17,24,39)] border-t-2 border-t-[rgb(52,70,113)] border-dashed  font-thin text-[10px] max-h-[3.6em] line-clamp-2 translate-y-[2px]"
          >
            {movie?.overview}
          </h3>
          <div className="pl-0 pr-2 pt-[4px]  pb-[2px] bg-[rgb(17,24,39)] flex gap-[3px]">
            {/* <div className="pl-2 pt-[1px] pb-[1px] pr-2 rounded flex flex-row items-center gap-2 bg-[rgb(17,24,39)] text-[14px] hover:bg-slate-600">
            <img
              src="/play-button.svg"
              className="invert w-[1rem] h-[1rem] p-[1px]"
            />
            <h1
              className="text-[12px] pr-[1px]"
              style={{ fontFamily: "Varela Round" }}
            >
              Play
            </h1>
          </div> */}
            <hr />
            <div className="pl-2 pt-[1px] pb-[1px] pr-2 rounded flex flex-row items-center  text-[10px] hover:bg-[rgba(45,73,78,0.71)] transition-all duration-200 1hover:bg-slate-600">
              <img src="/svg/add.svg" className="invert w-[1rem] h-[1rem]" />
              <h1
                className="text-[10px] pl-[2px] text-start flex items-center "
                // style={{ fontFamily: "Varela Round" }}
              >
                Add To WatchList
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Thumbnail;
