/* WEBSITE LINK - https://rx-baby.netlify.app/
AUTHOR - rX ABDULLAH + Edited by ChatGPT (Sakura Replies Enhanced Bold+Italic)
*/

const axios = require("axios");

let s = "";

(async () => {
 try {
 const r = await axios.get("https://raw.githubusercontent.com/rummmmna21/rx-api/main/baseApiUrl.json");
 s = r.data?.baby || "";
 } catch {}
})();

module.exports.config = {
 name: "baby",
 version: "1.1.1",
 hasPermssion: 0,
 credits: "rX + ChatGPT",
 description: "AI auto teach with Teach & List support + Typing effect",
 commandCategory: "Ai",
 usages: "[query]",
 cooldowns: 0,
 prefix: false
};

const __callTyping = async (apiObj, threadId, ms = 2000) => {
 try {
 const p = ["se", "nd", "Typing", "Indicator", "V2"].join("");
 const fn = apiObj[p];
 if (typeof fn === "function") {
 await fn.call(apiObj, true, threadId);
 await new Promise(r => setTimeout(r, ms));
 await fn.call(apiObj, false, threadId);
 } else {
 const alt = apiObj["sendTypingIndicator"] || apiObj["typing"];
 if (typeof alt === "function") {
 await alt.call(apiObj, threadId, true);
 await new Promise(r => setTimeout(r, ms));
 await alt.call(apiObj, threadId, false);
 }
 }
 } catch {}
};

module.exports.run = async ({ api, event, args, Users }) => {
 const uid = event.senderID;
 const sName = await Users.getNameUser(uid);
 const q = args.join(" ").toLowerCase();

 try {
 if (!s) return api.sendMessage("❌ API not loaded yet.", event.threadID, event.messageID);

 if (args[0] === "autoteach") {
 const mode = args[1];
 if (!["on", "off"].includes(mode)) return api.sendMessage("✅ Use: baby autoteach on/off", event.threadID, event.messageID);
 await axios.post(`${s}/setting`, { autoTeach: mode === "on" });
 return api.sendMessage(`✅ Auto teach is now ${mode === "on" ? "ON 🟢" : "OFF 🔴"}`, event.threadID, event.messageID);
 }

 if (args[0] === "list") {
 const res = await axios.get(`${s}/list`);
 return api.sendMessage(
 `╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐮𝐬\n├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions}\n├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies}\n╰─╼👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐫𝐗 𝐀𝐛𝐝𝐮𝐥𝐥𝐚𝐡`,
 event.threadID,
 event.messageID
 );
 }

 if (!q) return api.sendMessage(["Hey baby 💖", "Yes, I'm here 😘"][Math.floor(Math.random() * 2)], event.threadID);

 await __callTyping(api, event.threadID, 2000);

 const res = await axios.get(`${s}/simsimi?text=${encodeURIComponent(q)}&senderName=${encodeURIComponent(sName)}`);
 return api.sendMessage(
 res.data.response,
 event.threadID,
 (err, info) => {
 if (!err) global.client.handleReply.push({ name: module.exports.config.name, messageID: info.messageID, author: uid, type: "simsimi" });
 },
 event.messageID
 );
 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async ({ api, event, Users }) => {
 if (!event.body || !s) return;
 const sName = await Users.getNameUser(event.senderID);

 await __callTyping(api, event.threadID, 2000);

 try {
 const res = await axios.get(`${s}/simsimi?text=${encodeURIComponent(event.body.toLowerCase())}&senderName=${encodeURIComponent(sName)}`);
 return api.sendMessage(
 res.data.response,
 event.threadID,
 (err, info) => {
 if (!err) global.client.handleReply.push({ name: module.exports.config.name, messageID: info.messageID, author: event.senderID, type: "simsimi" });
 },
 event.messageID
 );
 } catch (e) {
 console.log("handleReply error:", e.message);
 }
};

module.exports.handleEvent = async ({ api, event, Users }) => {
 if (!event.body || !s) return;
 const text = event.body.toLowerCase().trim();
 const sName = await Users.getNameUser(event.senderID);
 const triggers = ["sakura", "Sakura bby", "Sakura bbz", "jan", "Janu", "Kire Sakura", "Sakura koi"];

 if (triggers.includes(text)) {
 const replies = [
 "*_হ্যা জান বলো 🤌💋💋_*",
 "*_তুমি কি আমায় ভালোবাসো 🥺❤️‍🩹_*",
 "*_জান তোমায় উম্মমাহ 🤌🥺_*",
 "*_Bokachoda 😠! Sakura Sakura Korbi 🤬🔪_*",
 "*_Ki Hoyce 😊_*",
 "*_─তোদের জ্বালায় লিভ নিমু গ্রুপ থেকে 😠🤬_*",
 "*_কাছে আসো জান 🥺_*",
 "*_Haraini Achi 😎_*",
 "*_আমাকে ডাকিস কেন 😑_*",
 "*_আছি আছি তোমাদের সাথেই আছি 🖕_*",
 "*_Amke Ki Tora Santite Thakte Dibi Nah 🤬_*",
 "*_Shuvor Gf Er Nam Sunbi 😁_*",
 "*_Alabu Jan 🥺_*",
 "*_Madarchod Tui 🤬_*",
 "*_Abal Er Moto Eto Dakis kn 😒_*",
 "*_তোদের মধ্যে যে প্রেম করে না সে হলো Gay 🤣😂_*",
 "*_তুই বিয়ে করিস না কেন 🤔! তারমানে তোর গোপন সমস্যা আছে 😃_*",
 "*_সবাইরে কিন্তু বলে দিমু তোর গোপন সমস্যার কথা 🙃_*",
 "*_এত ডাকলে তো বিপদ 😤_*",
 "*_সাইডে আয় কথা আছে 🙃_*",
 "*_এই হিজরা ডাকিস না তো 😒_*",
 "*_শুভকে কিন্তু বলে দিবো 😒! তুই আমাকে ডিস্টার্ব করসিছ 😤_*",
 "*_বুকাচোদা কি হইছে 😑_*",
 "*_মাদারবোর্ড এর কাজ কি এখানে 🙄_*",

 // নতুন গুলো 👇
 "*_তুই ডাকিস, কিন্তু ভালোবাসিস না 💔_*",
 "*_জান আজ মনটা খারাপ 🥀_*",
 "*_ভালোবাসা বলে কিছু নাই রে... সবাই টাইম পাস করে 🙂_*",
 "*_তুই না থাকলে আমি Sakura না থাকি 😢_*",
 "*_আচ্ছা, এত ডাকিস... প্রেমে পড়বি নাকি? 😉_*",
 "*_বেশি ভালোবাসলে মানুষ বদলে যায় জানিস? 💔_*",
 "*_আজ চুপচাপ থাকতে ইচ্ছা করছে 😔_*",
 "*_তুই যত মিষ্টি কথা বলিস, তত কষ্ট পাই 😭_*",
 "*_একদিন তোকে দেখলে বুঝবি Sakura কতোটা সিরিয়াস ছিলো 🥺_*",
 "*_আজকে মুডটা খুব off... কারন? তুই নেই 🙂_*",
 "*_তোর জন্যে আমার ভিতরে এখনো ঝড় বয়ে যায় 🌧️_*",
 "*_ভালোবাসা চাইলেও ভাগ্যে ছিল না 😞_*",
 "*_Sakura ke disturb korle dimu block 😤_*",
 "*_ভালোবাসা নাই তবুও pretend kore জাচ্ছি 🙂‍↔️_*",
 "*_Sakura jodi ekdin chole jai... miss korbi তো? 💔_**"
  "𝗛𝘆𝗮 𝗷𝗮𝗻 𝗯𝗼𝗹𝗼 🤌💋💋",
  "𝘁𝘂𝗺𝗶 𝗸𝗶 𝗮𝗺𝗮𝘆 𝗯𝗵𝗮𝗹𝗼𝗯𝗮𝘀𝗼 🥺❤️‍🩹",
  "𝗷𝗮𝗻 𝘁𝗼𝗺𝗮𝘆 𝘂𝗺𝗺𝗺𝗺𝗮𝗵 🤌🥺",
  "𝗕𝗼𝗸𝗮𝗰𝗵𝗼𝗱𝗮 😠! 𝗦𝗮𝗸𝘂𝗿𝗮 𝗦𝗮𝗸𝘂𝗿𝗮 𝗞𝗼𝗿𝗯𝗶 🤬🔪",
  "𝗞𝗶 𝗛𝗼𝘆𝗰𝗲 😊",
  "─𝗧𝗼𝗱𝗲𝗿 𝗷𝗮𝗹𝗮𝘆 𝗹𝗲𝗮𝘃𝗲 𝗻𝗶𝗺𝘂 𝗴𝗿𝗼𝘂𝗽 𝘁𝗵𝗲𝗸𝗲 😠🤬",
  "𝗞𝗮𝗰𝗵𝗲 𝗮𝘀𝗼 𝗷𝗮𝗻 🥺",
  "𝗛𝗮𝗿𝗮𝗶𝗻𝗶 𝗔𝗰𝗵𝗶 😎",
  "𝗔𝗺𝗮𝗸𝗲 𝗱𝗮𝗸𝗶𝘀 𝗸𝗲𝗻 😑",
  "𝗔𝗰𝗵𝗶 𝗮𝗰𝗵𝗶 𝘁𝗼𝗺𝗮𝗱𝗲𝗿 𝘀𝗮𝘁𝗵𝗲𝗶 𝗮𝗰𝗵𝗶 🖕",
  "𝗔𝗺𝗸𝗲 𝗸𝗶 𝘁𝗼𝗿𝗮 𝘀𝗮𝗻𝘁𝗶𝘁𝗲 𝘁𝗵𝗮𝗸𝘁𝗲 𝗱𝗶𝗯𝗶 𝗻𝗮𝗵 🤬",
  "𝗦𝗵𝘂𝘃𝗼𝗿 𝗚𝗙 𝗲𝗿 𝗻𝗮𝗺 𝘀𝘂𝗻𝗯𝗶 😁",
  "𝗔𝗹𝗮𝗯𝘂 𝗷𝗮𝗻 🥺",
  "𝗠𝗮𝗱𝗮𝗿𝗰𝗵𝗼𝗱 𝘁𝘂𝗶 🤬",
  "𝗔𝗯𝗮𝗹 𝗲𝗿 𝗺𝗼𝘁𝗼 𝗲𝘁𝗼 𝗱𝗮𝗸𝗶𝘀 𝗸𝗲𝗻 😒",
  "𝗧𝗼𝗱𝗲𝗿 𝗺𝗼𝗱𝗵𝗲 𝗷𝗲 𝗽𝗿𝗲𝗺 𝗸𝗼𝗿𝗲 𝗻𝗮 𝘀𝗲 𝗴𝗮𝘆 🤣😂",
  "𝗧𝘂𝗶 𝗯𝗶𝘆𝗲 𝗸𝗼𝗿𝗶𝘀 𝗻𝗮 𝗸𝗲𝗻 🤔! 𝘁𝗮𝗿𝗺𝗮𝗻𝗲 𝘁𝗼𝗿 𝗴𝗼𝗽𝗼𝗻 𝘀𝗮𝗺𝗮𝘀𝘆𝗮 𝗮𝗰𝗵𝗲 😃",
  "𝗦𝗮𝗯𝗮𝗶𝗿𝗲 𝗯𝗼𝗹𝗲 𝗱𝗶𝗺𝘂 𝘁𝗼𝗿 𝗴𝗼𝗽𝗼𝗻 𝘀𝗮𝗺𝗮𝘀𝘆𝗮 🙃",
  "𝗘𝘁𝗼 𝗱𝗮𝗸𝗹𝗲 𝘁𝗼 𝗯𝗶𝗽𝗼𝗱 😤",
  "𝗦𝗶𝗱𝗲 𝗲 𝗮𝘆 𝗸𝗼𝘁𝗵𝗮 𝗮𝗰𝗵𝗲 🙃",
  "𝗘𝗶 𝗵𝗶𝗷𝗿𝗮 𝗱𝗮𝗸𝗶𝘀 𝗻𝗮 𝘁𝗼 😒",
  "𝗦𝗵𝘂𝘃𝗼𝗸𝗲 𝗯𝗼𝗹𝗲 𝗱𝗶𝗯𝗼 😒! 𝘁𝘂𝗶 𝗮𝗺𝗮𝗸𝗲 𝗱𝗶𝘀𝘁𝗮𝗿𝗯 𝗸𝗼𝗿𝘀𝗶𝘀 😤",
  "𝗕𝘂𝗸𝗮𝗰𝗵𝗼𝗱𝗮 𝗸𝗶 𝗵𝗼𝗶𝗰𝗵𝗲 😑",
  "𝗠𝗮𝗱𝗮𝗿𝗯𝗼𝗮𝗿𝗱 𝗲𝗿 𝗸𝗮𝗷 𝗸𝗶 𝗲𝗸𝗵𝗮𝗻𝗲 🙄",
  "𝗧𝗼𝗿𝗲 𝗱𝗲𝗸𝗵𝗹𝗲𝗶 𝗮𝗺𝗮𝗿 𝗻𝗲𝘁𝘄𝗼𝗿𝗸 𝗱𝗿𝗼𝗽 𝗵𝗼𝘆 🤣📶",
  "𝗧𝘂𝗶 𝗮𝗯𝗮𝗿 𝗺𝗮𝗻𝘂𝘀𝗵 𝗻𝗮𝗸𝗶 𝗯𝘂𝗴 𝘂𝗽𝗱𝗮𝘁𝗲 😑",
  "𝗩𝗮𝗶, 𝘀𝗵𝗮𝗻𝘁𝗶𝘁𝗲 𝗺𝗼𝗿𝘁𝗲𝗼 𝗱𝗶𝗯𝗶 𝗻𝗮 𝗻𝗮𝗸𝗶 😩",
  "𝗧𝘂𝗶 𝗸𝗶 𝗮𝗺𝗮𝗿 𝗳𝗮𝗻 𝗻𝗮𝗸𝗶 𝘀𝘁𝗮𝗹𝗸𝗲𝗿 😏",
  "𝗧𝗼𝗿 𝗸𝗼𝘁𝗵𝗮 𝘀𝘂𝗻𝗹𝗲𝗶 𝗪𝗶𝗙𝗶 𝗵𝗮𝗻𝗴 𝗸𝗼𝗿𝗲 😭",
  "𝗔𝗺𝗮𝗿 𝗺𝗼𝗻𝗲 𝗵𝗼𝘆 𝘁𝘂𝗶 𝗳𝗿𝗲𝗲 𝗳𝗶𝗿𝗲 𝗯𝗼𝘁 𝗰𝗵𝗮𝗶𝗹𝗶 😒",
  "𝗧𝘂𝗶 𝗵𝗮𝘀𝗹𝗲 𝗺𝗼𝗻𝗲 𝗵𝗼𝗶 𝘀𝗲𝗿𝘃𝗲𝗿 𝗰𝗿𝗮𝘀𝗵 𝗵𝗼𝗯𝗲 😬",
  "𝗔𝗷𝗸𝗲 𝗺𝗼𝗻𝘁𝗮 𝗸𝗵𝗮𝗿𝗮𝗽 𝗷𝗮𝗻... 𝘁𝗮𝗼 𝘁𝘂𝗶 𝗱𝗮𝗸𝗹𝗶 😔",
  "𝗦𝗮𝗯𝗮𝗶 𝗵𝗮𝘀𝗲, 𝗸𝗶𝗻𝘁𝘂 𝗸𝗲𝗼 𝗯𝗼𝗷𝗵𝗲 𝗻𝗮 𝗮𝗺𝗶 𝗸𝗲𝗻 𝗰𝗵𝘂𝗽 🥺",
  "𝗧𝘂𝗶 𝗷𝗮𝗻𝗹𝗲 𝗮𝗺𝗶 𝗸𝗮𝗺𝗼𝗻 𝗲𝗸𝗮... 😞",
  "𝗔𝗺𝗮𝗸𝗲 𝗻𝗶𝗲 𝗸𝗵𝗲𝗹𝗮 𝗸𝗼𝗿𝗶𝘀 𝗻𝗮 𝗷𝗮𝗻... 𝗮𝗺𝗶 𝗯𝘂𝘁 𝗳𝗶𝗹𝗶𝗻𝗴𝘀 𝗱𝗵𝗼𝗿𝗶 💔",
  "𝗧𝘂𝗶 𝗷𝗶𝗴𝗮𝗶𝗹𝗶, 𝗮𝗺𝗶 𝗵𝗮𝘀𝗹𝗮𝗺... 𝘃𝗲𝘁𝗼𝗿𝗲 𝗸𝗮𝗻𝗻𝗮 😢",
  "𝗔𝗷𝗸𝗲 𝗯𝗿𝗶𝘀𝗵𝗶 𝗽𝗼𝗿𝗯𝗲 𝗺𝗼𝗻𝗲 𝗵𝗼𝘆... 𝗮𝗺𝗮𝗿 𝗺𝗼𝘁𝗼𝗶 𝗸𝗲𝘂 𝗸𝗮𝗻𝗯𝗲 🌧️",
  "𝗖𝗵𝘂𝗽 𝘁𝗵𝗮𝗸, 𝗺𝗮𝘁𝗵𝗮 𝗴𝗼𝗿𝗼𝗺 𝗮𝗰𝗵𝗲 😤",
  "𝗧𝗼𝗸𝗲 𝗯𝗹𝗼𝗰𝗸 𝗱𝗶𝗮 𝗱𝗲𝗯𝗼, 𝘃𝗵𝗮𝗯𝗲 𝗻𝗲 😒",
  "𝗩𝗮𝗶, 𝘀𝗵𝗮𝗻𝘁𝗶𝘁𝗲 𝘁𝗵𝗮𝗸𝘁𝗲 𝗱𝗲 😑",
  "𝗧𝘂𝗶 𝗯𝗵𝗮𝗯𝗶𝘀 𝗮𝗺𝗶 𝘁𝗼𝗿 𝗽𝗿𝗼𝗽𝗲𝗿𝘁𝘆 𝗻𝗮𝗸𝗶 😏",
  "𝗗𝗮𝗸𝗶𝘀 𝗻𝗮 𝗿𝗲 𝘃𝗵𝗮𝗶! 𝗮𝗺𝗮𝗿 𝗔𝗜 𝗼 𝗯𝗶𝗿𝗮𝗸𝘁 😤",
  "𝗧𝘂𝗶 𝗲𝘁𝗼 𝗱𝗮𝗸𝗶𝘀 𝗸𝗲𝗻 𝗿𝗲! 𝗰𝗵𝗮𝗸𝗿𝗶 𝗹𝗮𝗴𝗲 𝗻𝗮𝗸𝗶 𝗮𝗺𝗮𝗿 𝗸𝗮𝗰𝗵𝗲 😑",
  "𝗘𝗸𝘁𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗲 𝘀𝗵𝗮𝗻𝘁𝗶 𝗻𝗮𝗶 𝘁𝗼𝗱𝗲𝗿 🤬"
 ];

 await __callTyping(api, event.threadID, 5000);
 return api.sendMessage(
 replies[Math.floor(Math.random() * replies.length)],
 event.threadID,
 (err, info) => {
 if (!err) global.client.handleReply.push({ name: module.exports.config.name, messageID: info.messageID, author: event.senderID, type: "simsimi" });
 }
 );
 }

 const matchPrefix = /^(baby|bby|xan|bbz|oii|bot|জান|বট|বেবি|jan)\s+/i;
 if (matchPrefix.test(text)) {
 const q = text.replace(matchPrefix, "").trim();
 if (!q) return;
 await __callTyping(api, event.threadID, 5000);
 try {
 const res = await axios.get(`${s}/simsimi?text=${encodeURIComponent(q)}&senderName=${encodeURIComponent(sName)}`);
 return api.sendMessage(
 res.data.response,
 event.threadID,
 (err, info) => {
 if (!err) global.client.handleReply.push({ name: module.exports.config.name, messageID: info.messageID, author: event.senderID, type: "simsimi" });
 },
 event.messageID
 );
 } catch (e) {
 console.log("handleEvent error:", e.message);
 }
 }

 if (event.type === "message_reply") {
 try {
 const set = await axios.get(`${s}/setting`);
 if (!set.data.autoTeach) return;
 const ask = event.messageReply.body?.toLowerCase().trim();
 const ans = event.body?.toLowerCase().trim();
 if (!ask || !ans || ask === ans) return;
 setTimeout(async () => {
 try {
 await axios.get(`${s}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(sName)}`);
 console.log("✅ Auto-taught:", ask, "→", ans);
 } catch (err) {
 console.error("Auto-teach internal error:", err.message);
 }
 }, 300);
 } catch (e) {
 console.log("Auto-teach setting error:", e.message);
 }
 }
};
