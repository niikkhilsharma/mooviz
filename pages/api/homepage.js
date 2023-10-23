import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
//AXIOS
var axios = require("axios");

const fixtitle = (movietitle, qulity, ReleaseYear) => {
  var arr = [
    "Movie",
    "Hindi",
    "AMZN",
    "Web Series",
    "DSNP",
    "Zee5",
    "S01",
    "S02",
    "S03",
    "S04",
    "S05",
    "S06",
    "S07",
    "S08",
    "S09",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
    "S15",
    "S16",
    "S17",
    "S18",
    "S19",
    "S20",
    " All Parts Collection",
    "All",
    "Parts",
    "Vol 1",
    "Vol 2",
    "Vol 3",
    "Vol 4",
    "Vol 5",
    "Vol 6",
    "Vol 7",
    "Vol 8",
    "Vol 9",
    "Vol 10",
    "Collection",
    "18+",
  ];
  var nowmov = movietitle.split(qulity)[0].trim();
  arr.forEach((element, ind) => {
    nowmov = nowmov.split(element)[0];
  });
  nowmov = nowmov.split(/[S]\d{2}/)[0];
  nowmov = nowmov.replace("–", "");
  // nowmov = nowmov.split(/(19[5-9]\d|20[0-4]\d|2050)/)[0];
  var swcases = nowmov.includes("WebRip")
    ? "WebRip"
    : nowmov.includes("BluRay")
    ? "BluRay"
    : nowmov.includes("PreDvd")
    ? "PreDvd"
    : nowmov.includes("DvdScr")
    ? "DvdScr"
    : nowmov.includes("HDCam")
    ? "HDCam"
    : null;
  // console.log(nowmov);
  if (swcases != null) {
    var curmov = nowmov.split(swcases)[0].trim().split(ReleaseYear)[0].trim();
    return curmov;
  } else {
    return nowmov.split(swcases)[0].trim().split(ReleaseYear)[0].trim();
  }
};

const createobject = (secel, $, type) => {
  const cred = new Object();
  cred["Link"] = $(secel).children("a").attr("href");
  cred["Type"] =
    $(secel).parent().parent().attr("id") == "sug-cont"
      ? $(secel).parent().attr("id")
      : $(secel).parent().parent().attr("id")
      ? $(secel).parent().parent().attr("id")
      : "Latest Results";
  cred["Title"] = fixtitle(
    $(secel.childNodes).children(".mli-info").text(),
    $(secel.childNodes).children(".mli-quality").text()
      ? $(secel.childNodes).children(".mli-quality").text()
      : "N/A",
    $(secel)
      .children("#hidden_tip")
      .children(".jtip-top")
      .children(`div[class="jt-info"]`)
      .eq(0)
      .text()
  );
  cred["Quality"] = $(secel.childNodes).children(".mli-quality").text()
    ? $(secel.childNodes).children(".mli-quality").text()
    : "N/A";
  cred["Image"] = $(secel.firstElementChild)
    .children("img[class='mli-thumb']")
    .attr("data-lazy-src")
    ? $(secel.firstElementChild)
        .children("img[class='mli-thumb']")
        .attr("data-lazy-src")
    : $(secel.firstElementChild).children("img[class='mli-thumb']").attr("src");
  cred["Description"] = $(secel).children("#hidden_tip").children(`p`).text();
  cred["IMDB"] = $(secel)
    .children("#hidden_tip")
    .children(".jtip-top")
    .children(`div[class='jt-info jt-imdb']`)
    .text();
  cred["ReleaseYear"] = $(secel)
    .children("#hidden_tip")
    .children(".jtip-top")
    .children(`div[class="jt-info"]`)
    .eq(0)
    .text();
  cred["Duration"] = $(secel)
    .children("#hidden_tip")
    .children(".jtip-top")
    .children(`div[class="jt-info"]`)
    .eq(1)
    .text();
  cred["OriginOfCountry"] = $(secel)
    .children("#hidden_tip")
    .children(`.block`)
    .children(`a[rel="tag"]`)
    .text()
    ? $(secel)
        .children("#hidden_tip")
        .children(`.block`)
        .children(`a[rel="tag"]`)
        .text()
    : "N/A";
  cred["Category"] = $(secel)
    .children("#hidden_tip")
    .children(`.block`)
    .children(`a[rel="category tag"]`)
    .eq(0)
    .text()
    ? $(secel)
        .children("#hidden_tip")
        .children(`.block`)
        .children(`a[rel="category tag"]`)
        .eq(0)
        .text()
    : "N/A";
  cred["CategoryLink"] = $(secel)
    .children("#hidden_tip")
    .children(`.block`)
    .children(`a[rel="category tag"]`)
    .eq(1)
    .attr("href")
    ? $(secel)
        .children("#hidden_tip")
        .children(`.block`)
        .children(`a[rel="category tag"]`)
        .eq(1)
        .attr("href")
    : "N/A";
  cred["CategoryTitle"] = $(secel)
    .children("#hidden_tip")
    .children(`.block`)
    .children(`a[rel="category tag"]`)
    .eq(1)
    .text()
    ? $(secel)
        .children("#hidden_tip")
        .children(`.block`)
        .children(`a[rel="category tag"]`)
        .eq(1)
        .text()
    : "N/A";
  return cred;
};

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  (async () => {
    try {
      const axres = await axios.get(
        // "https://185.53.88.204/category/all-movies-and-tv-shows/"
        req.query.search ? req.query.search : "https://185.53.88.204/"
        // "https://185.53.88.204/movies/"
        // "https://185.53.88.204/"
        // "https://185.53.88.204/category/page/3/bollywood-movies/"
      );
      const dom = new JSDOM(axres.data);
      const $ = jqreyi(dom.window);
      //   const allhomelists = dom.window.document.querySelectorAll(".movies-list");
      const allhomelists =
        dom.window.document.getElementsByClassName("movies-list-full");

      const arrallhomelists = Array.from(allhomelists);
      var maindatobject = new Object();
      arrallhomelists.forEach((el, inde) => {
        // el?.querySelector("center")?.remove();
        // Array.from(el?.querySelectorAll(`.clearfix`))?.forEach((el, ind) => {
        //   el?.remove();
        // });
        var gettype = $(el).attr("id") ? $(el).attr("id") : "Latest Results";
        // if ($(el.firstElementChild).first().attr("id") == "content-box") {
        var tempdatarr = new Array();
        Array.from(
          $(el.firstElementChild).first().attr("id") == "content-box"
            ? el.firstElementChild.childNodes
            : el.childNodes
        ).forEach((secel, ind) => {
          if (
            $(secel.firstElementChild)
              .children("img[class='mli-thumb']")
              .attr("data-lazy-src") ||
            $(secel.firstElementChild)
              .children("img[class='mli-thumb']")
              .attr("src")
          ) {
            tempdatarr.push(createobject(secel, $));
            maindatobject[gettype] = tempdatarr;
          }
          if (
            (ind == $(el.firstElementChild).first().attr("id")) == "content-box"
              ? el.firstElementChild.childNodes.length - 1 == ind
              : el.childNodes.length - 1 == ind
          ) {
            if (arrallhomelists.length - 1 == inde) {
              if ($(el).next().children().length != 0) {
                // console.log($(el).next().children("div"));
                if ($(el).next().children("div").length != 0) {
                  maindatobject["CurrentPage"] = $(el)
                    .next()
                    .children("div")
                    .children("nav")
                    .children("ul")
                    .children(".active")
                    .text();
                  $(el)
                    .next()
                    .children("div")
                    .children("nav")
                    .children("ul")
                    .children("li")
                    .last()
                    .children("a")
                    .attr("href")
                    ?.split("/")
                    .includes("page")
                    ? $(el)
                        .next()
                        .children("div")
                        .children("nav")
                        .children("ul")
                        .children("li")
                        .last()
                        .children("a")
                        .attr("href")
                        ?.split("/")
                        .forEach((elel, inni) =>
                          elel
                            ? elel == "page"
                              ? (maindatobject["TotalPages"] = $(el)
                                  .next()
                                  .children("div")
                                  .children("nav")
                                  .children("ul")
                                  .children("li")
                                  .last()
                                  .children("a")
                                  .attr("href")
                                  ?.split("/")[inni + 1])
                              : ""
                            : ""
                        )
                    : "N/A";
                } else {
                  maindatobject["CurrentPage"] = $(el)
                    .next()
                    .children("nav")
                    .children("ul")
                    .children(".active")
                    .text();

                  $(el)
                    .next()
                    .children("nav")
                    .children("ul")
                    .children("li")
                    .last()
                    .children("a")
                    .attr("href")
                    ?.split("/")
                    .includes("page")
                    ? $(el)
                        .next()
                        .children("nav")
                        .children("ul")
                        .children("li")
                        .last()
                        .children("a")
                        .attr("href")
                        ?.split("/")
                        .forEach((elel, inni) =>
                          elel
                            ? elel == "page"
                              ? (maindatobject["TotalPages"] = $(el)
                                  .next()
                                  .children("nav")
                                  .children("ul")
                                  .children("li")
                                  .last()
                                  .children("a")
                                  .attr("href")
                                  ?.split("/")[inni + 1])
                              : ""
                            : ""
                        )
                    : "N/A";
                }
              } else {
                if ($(el).prev().children("div").length != 0) {
                  maindatobject["CurrentPage"] = $(el)
                    .prev()
                    .children("div")
                    .children("nav")
                    .children("ul")
                    .children(".active")
                    .text();
                  $(el)
                    .prev()
                    .children("div")
                    .children("nav")
                    .children("ul")
                    .children("li")
                    .last()
                    .children("a")
                    .attr("href")
                    ?.split("/")
                    .includes("page")
                    ? $(el)
                        .prev()
                        .children("div")
                        .children("nav")
                        .children("ul")
                        .children("li")
                        .last()
                        .children("a")
                        .attr("href")
                        ?.split("/")
                        .forEach((elel, inni) =>
                          elel
                            ? elel == "page"
                              ? (maindatobject["TotalPages"] = $(el)
                                  .prev()
                                  .children("div")
                                  .children("nav")
                                  .children("ul")
                                  .children("li")
                                  .last()
                                  .children("a")
                                  .attr("href")
                                  ?.split("/")[inni + 1])
                              : ""
                            : ""
                        )
                    : "N/A";
                } else {
                  maindatobject["CurrentPage"] = $(el)
                    .prev()
                    .children("nav")
                    .children("ul")
                    .children(".active")
                    .text();
                  $(el)
                    .prev()
                    .children("nav")
                    .children("ul")
                    .children("li")
                    .last()
                    .children("a")
                    .attr("href")
                    ?.split("/")
                    .includes("page")
                    ? $(el)
                        .prev()
                        .children("nav")
                        .children("ul")
                        .children("li")
                        .last()
                        .children("a")
                        .attr("href")
                        ?.split("/")
                        .forEach((elel, inni) =>
                          elel
                            ? elel == "page"
                              ? (maindatobject["TotalPages"] = $(el)
                                  .prev()
                                  .children("nav")
                                  .children("ul")
                                  .children("li")
                                  .last()
                                  .children("a")
                                  .attr("href")
                                  ?.split("/")[inni + 1])
                              : ""
                            : ""
                        )
                    : "N/A";
                }
              }
              // console.log(maindatobject);
              var nowel = false;
              var somarray = new Array();
              // for (const [key, value] of Object.entries(maindatobject)) {
              //   // if (nowel == false) {
              //   //   nowel = true;
              //   var nowarr = new Array();
              //   var allem = new Array();
              //   console.log(Object.keys(maindatobject));
              // maindatobject[key].forEach((el, indlst) => {
              //   allem.push(el.Title);
              //   allem.map((eeal) => {
              //     if (!allem.includes(eeal)) return eeal;
              //   });
              //   // console.log(allem);
              //   var cnt = 0;
              //   maindatobject[key].forEach((el2) => {
              //     if (el.Title == el2.Title) {
              //       console.log(el.Title, el2.Title);
              //       cnt = cnt + 1;
              //     }
              //   });
              //   // var arrw = new Array();
              //   // console.log(cnt);
              //   if (cnt < 2) {
              //     nowarr.push(el);
              //   } else {
              //     // arrw.push(el);
              //     // nowarr.push(el);
              //   }
              res.setHeader("Cache-Control", "s-maxage=86400");
              res.status(200).json({
                status: 200,
                data: maindatobject,
              });
              // res.status(200).json(maindatobject);
            }
          }
          // }
        });
      });
    } catch (error) {
      const dat = `
          <style type='text/css'>
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&family=Roboto:wght@100;300&display=swap");
        :root {
            --button: #b3b3b3;
            --button-color: #0a0a0a;
            --shadow: #000;
            --bg: #737373;
            --header: #7a7a7a;
            --color: #fafafa;
            --lit-header: #e6e6e6;
            --speed: 2s;
        }
    
        * {
            box-sizing: border-box;
            transform-style: preserve-3d;
        }
    
        @property --swing-x {
            initial-value: 0;
            inherits: false;
            syntax: '<integer>';
        }
    
        @property --swing-y {
            initial-value: 0;
            inherits: false;
            syntax: '<integer>';
        }
    
        body {
            min-height: 100vh;
            display: flex;
            font-family: 'Roboto', sans-serif;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: black;
            color: var(--color);
            perspective: 1200px;
        }
    
        a {
            text-transform: uppercase;
            text-decoration: none;
            background: var(--button);
            color: var(--button-color);
            padding: 1rem 4rem;
            border-radius: 4rem;
            font-size: 0.875rem;
            letter-spacing: 0.05rem;
        }
    
        p {
            font-weight: 100;
        }
    
        h1 {
            -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
            animation: swing var(--speed) infinite alternate ease-in-out;
            font-size: clamp(5rem, 40vmin, 20rem);
            font-family: 'Open Sans', sans-serif;
            margin: 0;
            margin-bottom: 1rem;
            letter-spacing: 1rem;
            transform: translate3d(0, 0, 0vmin);
            --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
            background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x) 100%/200% 200%;
            -webkit-background-clip: text;
            color: transparent;
        }
    
        h1:after {
            -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
            animation: swing var(--speed) infinite alternate ease-in-out;
            content: "404";
            position: absolute;
            top: 0;
            left: 0;
            color: var(--shadow);
            filter: blur(1.5vmin);
            transform: scale(1.05) translate3d(0, 12%, -10vmin) translate(calc((var(--swing-x, 0) * 0.05) * 1%), calc((var(--swing-y) * 0.05) * 1%));
        }
    
        .cloak {
            animation: swing var(--speed) infinite alternate-reverse ease-in-out;
            height: 100%;
            width: 100%;
            transform-origin: 50% 30%;
            transform: rotate(calc(var(--swing-x) * -0.25deg));
            background: radial-gradient(40% 40% at 50% 42%, transparent, #000 35%);
        }
    
        .cloak__wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: hidden;
        }
    
        .cloak__container {
            height: 250vmax;
            width: 250vmax;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    
        .info {
            text-align: center;
            line-height: 1.5;
            max-width: clamp(16rem, 90vmin, 25rem);
        }
    
        .info>p {
            margin-bottom: 3rem;
        }
    
        @-webkit-keyframes swing {
            0% {
                --swing-x: -100;
                --swing-y: -100;
            }
    
            50% {
                --swing-y: 0;
            }
    
            100% {
                --swing-y: -100;
                --swing-x: 100;
            }
        }
    
        @keyframes swing {
            0% {
                --swing-x: -100;
                --swing-y: -100;
            }
    
            50% {
                --swing-y: 0;
            }
    
            100% {
                --swing-y: -100;
                --swing-x: 100;
            }
        }
    </style>
          <h1>404</h1>
          <div class="cloak__wrapper">
            <div class="cloak__container">
              <div class="cloak"></div>
            </div>
          </div>
          <div class="info">
            <h2>We can't find that page</h2>
            <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><a href="/" rel="noreferrer noopener">Home</a>
          </div>`;
      res.send(dat);
      console.log(error);
    }
  })();
});

export default handler;
