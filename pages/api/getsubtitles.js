import nc from "next-connect";
var jsdomi = require("jsdom");
const { JSDOM } = jsdomi;
const jqreyi = require("jquery");
//AXIOS
var axios = require("axios");
const OS = require("opensubtitles-api");
const OpenSubtitles = new OS({
  useragent: "UserAgent",
  username: "movizzdatabase",
  password: "Movizzdatabase@123",
  ssl: true,
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    try {
      var now = await OpenSubtitles.login().catch((er) => console.log(er));
      if (now.userinfo) {
        OpenSubtitles.search({
          sublanguageid:
            (req?.query?.lang?.includes(",")
              ? req.query.lang.split(",")
              : req.query.lang) || "eng", // Can be an array.join, 'all', or be omitted.
          hash: "8e245d9679d31e12", // Size + 64bit checksum of the first and last 64k
          // filesize: '129994823',      // Total size, in bytes.
          // path: 'foo/bar.mp4',        // Complete path to the video file, it allows
          //   to automatically calculate 'hash'.
          // filename: 'bar.mp4',        // The video file name. Better if extension
          //   is included.
          season: req.query.s || null,
          episode: req.query.e || null,
          extensions: ["srt", "vtt"], // Accepted extensions, defaults to 'srt'.
          limit: "3", // Can be 'best', 'all' or an
          // arbitrary nb. Defaults to 'best'
          imdbid: req.query.imdb, // 'tt528809' is fine too.
          // fps: '23.96',               // Number of frames per sec in the video.
          // query: 'Charlie Chaplin',   // Text-based query, this is not recommended.
          // gzip: true                  // returns url to gzipped subtitles, defaults to false
        }).then((subtitles) => {
          res.send(subtitles);
        });
      }
    } catch (error) {
      console.log(error);
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
    }
  })
  .options((req, res) => {
    res.send({
      ALL: { value: "ALL", code: "all" },
      Abkhazian: { value: "Abkhazian", code: "abk" },
      Afrikaans: { value: "Afrikaans", code: "afr" },
      Albanian: { value: "Albanian", code: "alb" },
      Arabic: { value: "Arabic", code: "ara" },
      Aragonese: { value: "Aragonese", code: "arg" },
      Armenian: { value: "Armenian", code: "arm" },
      Assamese: { value: "Assamese", code: "asm" },
      Asturian: { value: "Asturian", code: "ast" },
      Azerbaijani: { value: "Azerbaijani", code: "aze" },
      Basque: { value: "Basque", code: "baq" },
      Belarusian: { value: "Belarusian", code: "bel" },
      Bengali: { value: "Bengali", code: "ben" },
      Bosnian: { value: "Bosnian", code: "bos" },
      Breton: { value: "Breton", code: "bre" },
      Bulgarian: { value: "Bulgarian", code: "bul" },
      Burmese: { value: "Burmese", code: "bur" },
      Catalan: { value: "Catalan", code: "cat" },
      Chinese: { value: "Chinese (simplified)", code: "chi" },
      Chinese: { value: "Chinese (traditional)", code: "zht" },
      Chinese: { value: "Chinese bilingual", code: "zhe" },
      Croatian: { value: "Croatian", code: "hrv" },
      Czech: { value: "Czech", code: "cze" },
      Danish: { value: "Danish", code: "dan" },
      Dari: { value: "Dari", code: "prs" },
      Dutch: { value: "Dutch", code: "dut" },
      English: { value: "English", code: "eng" },
      Esperanto: { value: "Esperanto", code: "epo" },
      Estonian: { value: "Estonian", code: "est" },
      Extremaduran: { value: "Extremaduran", code: "ext" },
      Finnish: { value: "Finnish", code: "fin" },
      French: { value: "French", code: "fre" },
      Gaelic: { value: "Gaelic", code: "gla" },
      Galician: { value: "Galician", code: "glg" },
      Georgian: { value: "Georgian", code: "geo" },
      German: { value: "German", code: "ger" },
      Greek: { value: "Greek", code: "ell" },
      Hebrew: { value: "Hebrew", code: "heb" },
      Hindi: { value: "Hindi", code: "hin" },
      Hungarian: { value: "Hungarian", code: "hun" },
      Icelandic: { value: "Icelandic", code: "ice" },
      Igbo: { value: "Igbo", code: "ibo" },
      Indonesian: { value: "Indonesian", code: "ind" },
      Interlingua: { value: "Interlingua", code: "ina" },
      Irish: { value: "Irish", code: "gle" },
      Italian: { value: "Italian", code: "ita" },
      Japanese: { value: "Japanese", code: "jpn" },
      Kannada: { value: "Kannada", code: "kan" },
      Kazakh: { value: "Kazakh", code: "kaz" },
      Khmer: { value: "Khmer", code: "khm" },
      Korean: { value: "Korean", code: "kor" },
      Kurdish: { value: "Kurdish", code: "kur" },
      Latvian: { value: "Latvian", code: "lav" },
      Lithuanian: { value: "Lithuanian", code: "lit" },
      Luxembourgish: { value: "Luxembourgish", code: "ltz" },
      Macedonian: { value: "Macedonian", code: "mac" },
      Malay: { value: "Malay", code: "may" },
      Malayalam: { value: "Malayalam", code: "mal" },
      Manipuri: { value: "Manipuri", code: "mni" },
      Marathi: { value: "Marathi", code: "mar" },
      Mongolian: { value: "Mongolian", code: "mon" },
      Montenegrin: { value: "Montenegrin", code: "mne" },
      Navajo: { value: "Navajo", code: "nav" },
      Nepali: { value: "Nepali", code: "nep" },
      Northern: { value: "Northern Sami", code: "sme" },
      Norwegian: { value: "Norwegian", code: "nor" },
      Occitan: { value: "Occitan", code: "oci" },
      Odia: { value: "Odia", code: "ori" },
      Persian: { value: "Persian", code: "per" },
      Polish: { value: "Polish", code: "pol" },
      Portuguese: { value: "Portuguese", code: "por" },
      Portuguese: { value: "Portuguese (BR)", code: "pob" },
      Portuguese: { value: "Portuguese (MZ)", code: "pom" },
      Pushto: { value: "Pushto", code: "pus" },
      Romanian: { value: "Romanian", code: "rum" },
      Russian: { value: "Russian", code: "rus" },
      Santali: { value: "Santali", code: "sat" },
      Serbian: { value: "Serbian", code: "scc" },
      Sindhi: { value: "Sindhi", code: "snd" },
      Sinhalese: { value: "Sinhalese", code: "sin" },
      Slovak: { value: "Slovak", code: "slo" },
      Slovenian: { value: "Slovenian", code: "slv" },
      Somali: { value: "Somali", code: "som" },
      Spanish: { value: "Spanish", code: "spa" },
      Spanish: { value: "Spanish (EU)", code: "spn" },
      Spanish: { value: "Spanish (LA)", code: "spl" },
      Swahili: { value: "Swahili", code: "swa" },
      Swedish: { value: "Swedish", code: "swe" },
      Syriac: { value: "Syriac", code: "syr" },
      Tagalog: { value: "Tagalog", code: "tgl" },
      Tamil: { value: "Tamil", code: "tam" },
      Tatar: { value: "Tatar", code: "tat" },
      Telugu: { value: "Telugu", code: "tel" },
      Thai: { value: "Thai", code: "tha" },
      Toki: { value: "Toki Pona", code: "tok" },
      Turkish: { value: "Turkish", code: "tur" },
      Turkmen: { value: "Turkmen", code: "tuk" },
      Ukrainian: { value: "Ukrainian", code: "ukr" },
      Urdu: { value: "Urdu", code: "urd" },
      Vietnamese: { value: "Vietnamese", code: "vie" },
      Welsh: { value: "Welsh", code: "wel" },
    });
  });
export default handler;
