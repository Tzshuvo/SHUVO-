const badWords = ["fuck", "madarchod", "abal", "vodai", "chudir vai", "মাদারচোদ", "হারামি", "chudi", "sawyai", "Mc"];
const badImages = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

let warningCount = {}; // userID অনুযায়ী warning ট্র্যাক হবে

// বাংলা + ইংরেজি mix গালি লিস্ট
const galiList = [
  "Tor matha ghumai gese naki 🤬",
  "Madarchod baccha, chup thak nahole petabo 👊",
  "Gandu tor bap ke bolbi ami astechi 🚶",
  "Tor moto randir baccha duniya dekhini 😡",
  "Bastard! tor upor vomit dite icha kortese 🤢",
  "Shala harami, tor sathe kotha bola jabe na ❌",
  "Tui ek numberer gandumar 😤",
  "Tor bap ke bol tor upor control korte 😈",
  "Shala bokachoda, tor matha jaliye dimu 🔥",
  "Tor dorkar dustbin er moddhe feliye deya 🗑️"
];

module.exports.config = {
  name: "antiBad",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "CYBER BOT TEAM",
  description: "Warn bad users, then insult after 3rd time",
  commandCategory: "system",
  usages: "",
  cooldowns: 0,
};

module.exports.handleEvent = async function ({ api, event }) {
  const userID = event.senderID;
  const message = event.body ? event.body.toLowerCase() : "";
  const attachments = event.attachments || [];

  let isBad = false;

  // খারাপ শব্দ চেক
  for (let word of badWords) {
    if (message.includes(word)) {
      isBad = true;
      break;
    }
  }

  // খারাপ ছবি চেক
  for (let att of attachments) {
    if (badImages.includes(att.type)) {
      isBad = true;
      break;
    }
  }

  if (isBad) {
    if (!warningCount[userID]) warningCount[userID] = 0;
    warningCount[userID]++;

    if (warningCount[userID] <= 2) {
      api.sendMessage(
        `⚠️ Warning ${warningCount[userID]}/2\nDon't use bad words or send dirty pics! Next time I won't spare you... 😠`,
        event.threadID,
        event.messageID
      );
    } else {
      // Random গালি দিবে
      const randomGali = galiList[Math.floor(Math.random() * galiList.length)];
      api.sendMessage(`🤬 ${randomGali}`, event.threadID, event.messageID);
    }
  }
};

module.exports.run = async function () {};
