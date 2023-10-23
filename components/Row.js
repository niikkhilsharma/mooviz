import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import Thumbnail from "./Thumbnail";
import "owl.carousel/dist/assets/owl.carousel.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
function Row({ title, movies }) {
  const rowRef = useRef(null);
  // console.log(movies);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className=" 1space-y-0.5 1md:space-y-1 z-[1]">
      <div className="flex w-56 gap-1 cursor-pointer p-[1rem] md:p-0 text-[#e5e5e5] transition duration-200 hover:text-white text-2xl">
        <div className="block w-[0.3rem] h-[2.5rem] rounded-lg absolute translate-y-[0.1rem] translate-x-[-10px] bg-red-700" />
        <h2 style={{ fontWeight: 500 }} className="text-shadow-xl text-white">
          {title.split(" ")[0]}
        </h2>
        <h2 style={{}} className="font-thin text-shadow-lg text-white">
          {title.split(" ")[1]}
        </h2>
      </div>
      <div className="group relative md:-ml-2 md:translate-y-[-2rem]">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          className="flex  items-center relative 1space-y-1 gap-[0.5rem] md:gap-[0.2rem] pl-[2px] md:pl-6 pr-6 md:h-[20rem] overflow-y-visible overflow-x-scroll scrollbar-hide md:space-x-2.5 md:pt-2 "
          ref={rowRef}
        >
          {/* <OwlCarousel
            loop
            nav={true}
            autoplay={false}
            dots={false}
            // margin={10}
            items={4}
            style={{ "clip-depth": 2 }}
            className="rounded-lg overflow-y-visible "
            navText={["", ""]}
            // stagePadding={40}
            autoplayTimeout={2000}
            autoplaySpeed={2000}
            autoplayHoverPause
          > */}
          {movies
            ? movies.map((movie, index) => (
                <Thumbnail
                  key={
                    String(Math.floor(Math.random())) +
                    movie.title +
                    String(index)
                  }
                  movie={movie}
                />
              ))
            : ""}
          {/* </OwlCarousel> */}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
