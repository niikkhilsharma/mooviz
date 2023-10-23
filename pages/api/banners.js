import nc from "next-connect";
//AXIOS
var axios = require("axios");

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).get((req, res) => {
  try {
    res.send({
      banners: [
        // {
        //   title: "🔴 Live : Star Sports 1 Hindi HD",
        //   url: "https://venturethree.com/assets/_fullWidth/Star_Sports_logo.jpg",
        //   description:
        //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        //   id: 0,
        //   type: "live",
        //   id: "starsports1hindi",
        // },

        {
          title: "🔴 Live : Australia Tour Of India",
          // url: "https://res.cloudinary.com/samrat-tech/image/upload/v1672676186/Screenshot_2023-01-02_214506_ueb0xg.png",
          // url: "https://laughingcolours.com/wp-content/uploads/2019/07/India-vs-Sri-Lanka.png",
          url: "https://img1.hotstarext.com/image/upload/sources/r1/cms/prod/1888/1471888-h-6fb2a3e46010",
          // url: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4781/1444781-h-2ff04fb7c577",
          // url: "https://s3.eu-central-1.amazonaws.com/centaur-wp/designweek/prod/content/uploads/2013/11/StarSports_03-1002x564.jpg",
          description:
            "Get Live & Exclusive Coverage Of SriLanka Tour Of India 2023 on Movizz",
          id: 0,
          // type: "live",
          // id: "starsports1hindi",
          // mode: "stream",
          // videos_id: 19,
          channelId: "Star_Sports_3",
          cateogry: "Sports",
          type: "channel",
          server: "channel",
          link: "https://movizz-web.vercel.app/api/livetv/sportschannels/starhindi/stream.m3u8",
          mode: "stream",
        },

        {
          title: "🔴 Live : Sony Sports 3",
          // url: "https://staticc.sportskeeda.com/editor/2022/12/82c6b-16715088967104-1920.jpg",
          // url: "https://crickettimes.com/wp-content/uploads/2022/12/New-Zealand-tour-of-Pakistan-2022-23.jpeg",
          // url: "https://img1.hotstarext.com/image/upload/sources/r1/cms/prod/1888/1471888-h-6fb2a3e46010",
          url: "https://res.cloudinary.com/samrat-tech/image/upload/v1670118365/indiavsbangladesh_bg81qj.png",
          description:
            "Get Live & Exclusive Coverage Of NewZealand Tour Of Pakistan on Movizz",
          id: 0,
          // type: "live",
          type: "channel",
          channelId: "anycric-ten1hd",
          cateogry: "Sports",
          server: "channel",
          link: "https://movizz-web.vercel.app/api/livetv/sportschannels/anycric/ten1hd/stream.m3u8",
          mode: "stream",
          // mode: "embed",
          // id: "starsports1hindi",
        },
        // {
        //   title: "Cirkus (2022)",
        //   url: "https://image.tmdb.org/t/p/original/jfbN09FuWw5cQNl248pL5KAyjZ7.jpg",
        //   description:
        //     "Two sets of identical twins are accidentally separated at birth. Several years later, when they are coincidentally in the same town, there is a lot of confusion and misunderstanding when people mistake them for each other.",
        //   id: 999,
        //   imdb: "tt11112808",
        //   type: "imdb",
        // },

        // {
        //   title: "Hostel Daze : Season 3",
        //   url: "https://assets.gadgets360cdn.com/pricee/assets/product/202211/Hostel-Daze_16-9_1_1667986418.jpg?downsize=680:*",
        //   description:
        //     "Through the adventures of four friends 'Hostel Daze' captures what goes inside an engineering hostel in India.",
        //   id: 2,
        //   imdb: "tt11407524",
        //   type: "imdb",
        // },
        // {
        //   title: "Black Panther: Wakanda Forever",
        //   url: "https://www.themoviedb.org/t/p/original/cs3LpA38BS2XDPfUzdgMB537XOo.jpg",
        //   description:
        //     "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
        //   id: 3,
        //   imdb: "tt9114286",
        //   type: "imdb",
        // },
        // {
        //   title: "Black Adam",
        //   url: "https://www.themoviedb.org/t/p/original/zZOitKW7TTexnUgXtBDL16J9EZ2.jpg",
        //   description:
        //     "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
        //   id: 4,
        //   imdb: "tt6443346",
        //   type: "imdb",
        // },
        // {
        //   title: "Naruto",
        //   url: "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
        //   description:
        //     "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
        //   id: 1,
        //   imdb: "tt0409591",
        //   type: "imdb",
        // },
      ],
    });
    // const { host, db, user, pass } = req.query;

    // var connection = mysql.createConnection({
    //   host: "44.237.84.212",
    //   database: "learning_db",
    //   user: "motion",
    //   password: "rqZk29u[jHk",
    //   // localAddress: localAddress,
    // });

    // connection.connect(function (err) {
    //   if (err) {
    //     // res.send(err);
    //     console.log(err);
    //   } else {
    //     console.log("Connection Successful");
    //   }

    //   //   console.log("Connected 1!");
    // });
  } catch (error) {
    res.send(error);
  }
});
export default handler;
