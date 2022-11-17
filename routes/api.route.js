const router = require("express").Router();
const fetch = require("../config/fetch.js");
const auth = require("../config/auth.js");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.post("/events", async function (req, res, next) {
  try {
    // here we get an access token
    const authResponse = await auth.getToken(auth.tokenRequest);
    // console.log("🐱 ~  authResponse", authResponse);
    // console.log("🐱 ~  cache token", auth.cacheAC);

    // call the web API with the access token`

    const eventBody = {
      subject: req.body.subject,
      start: {
        dateTime: req.body.start.dateTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: req.body.end.dateTime,
        timeZone: "UTC",
      },
      attendees: req.body.attendees.map((item) => {
        return {
          emailAddress: {
            address: item,
          },
          type: "required",
        };
      }),
    };

    if (!req.body.attendees.length) {
      delete eventBody.attendees;
    }

    const resposne = await fetch.callApi(
      auth.apiConfig.uri + `/${process.env.ORGANIZER_EMAIL}/events`,
      eventBody,
      authResponse.accessToken
    );
    if (resposne) {
      res.send({ message: "Create Event Complete", data: resposne });
    }
  } catch (error) {
    console.log("error ", error);
    // if (error.code === "ERR_BAD_REQUEST") {
    res.status(404).send({ error: "something went wrong" });
    // }
  }
});

module.exports = router;
