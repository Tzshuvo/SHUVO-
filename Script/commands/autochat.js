const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "modules", "autochat_config.json");

if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify({ enabled: true, mode: "public" }, null, 2));
}

module.exports.config = {
  name: "autochat",
  version: "4.0.0",
  hasPermssion: 2,
  credits: "Ferdous Wahid (edited by Ridoy)",
  description: "Auto reply only if the FULL message matches a keyword (Admin/Public mode)",
  commandCategory: "fun",
  usages: "autochat [on/off/admin/public]",
  cooldowns: 0
};

// random replies for "bot"
const botReplies = [
"বলো কি হইসে 😒","আবার বিরক্ত করছো কেন 🙂","কি চাই বলো তাড়াতাড়ি 😑","আমি ঘুমাচ্ছিলাম 😴 এখন বলো?","জ্বী বট বলছি বলুন 😄","Ki somossa?","Bolo ki bolba","Eto daako kn 😫","Hae bolo shuntesi","Beshi bot bot korle mair dibo 😒","Hey ʘ⁠‿⁠ʘ","এত ডাকে কেউ?","বেদ্দপ, খালি বট বট করে 🤐","Achi re bhai, bolo ebar.","Bot kn?, Babe bolleo paro 😽","Disturb korba na jao 😒🔪","Hae pakhi bolo.","Inbox e asho alap kori 🤭","Bolo shunchi ami💜","Eto je dako, valo talo basho naki? 🤧","Sudhu deko na, dekhao dio.","Cholo ghurte jai😌","Dakba na rag korsi 😞","Mood off amar, kotha bolbo na","কি হইসে?","বলে ফেলো শুনতাসি","আছি আছি 🙂","এত ডাক তো বৌও ডাকবে না 😒","বট বট, আর কিছু বলতে পারো না?","বট না, সোনাপাখি ডেকো 🙈..!","হ্যা ভাই বল","কিরে ডাকিস কেনো?","আচ্ছা তারপর","ডাকিস না, ব্যস্ত আছি 🤫","এত ডাকলে লিভ নিবো কিন্তু 🥺","একা থাকতে দেও, ডাকব না..।","মন ভালো না রে","আজাইরা পোলাপান, শুধু বট বট করে 🫤","কাজ থাকলে বলে, নইলে যাইগা","বলো বেব্স 😫","কি করতে পারি বলো","কি দরকার?","jaiga ar ashum na 🤧"
];

const keywordList = [
  { keywords: ["hello", "হেলো", "hi", "হাই"], reply: "হ্যালো! 😊 কেমন আছো?" },
  { keywords: ["bye", "বাই", "বায়", "বিদায়"], reply: "আবার দেখা হবে! 👋" },
  { keywords: ["kemon acho?", "kmn acho?", "kemon aso?", "kmn aso?", "কেমন আছো?", "কেমন আছেন?"], reply: "আলহামদুলিল্লাহ 💌✨, তুমি কেমন আছো?" },
  { keywords: ["tumi ke", "তুমি কে", "tmi ke", "tui ke", "তুই কে"], reply: "আমি একটা বট 🤖 তোমার সাহায্যে আছি, ফেরদৌস ওয়াহিদ ভাই আমাকে বানিয়েছে 😉🫶" },
  { keywords: ["love you", "লাভ ইউ"], reply: "তোমাকেও লাভিউ 😋💜" },
  { keywords: ["hmm"], reply: "hmm means, Hey marry me 😁💜" },
  { keywords: ["cdi", "chudi", "cudi"], reply: "tomake Cdi 💋" },
  { keywords: ["bal", "bl", "বাল"], reply: "bal na chul bolo 😕" },
  { keywords: ["allah hafez", "allah hafiz", "আল্লাহ হাফেজ"], reply: "Allah hafez 💜✨" },
  { keywords: ["tata", "tatah", "টাটা"], reply: "Tatah😚✨" },
  { keywords: ["thanos"], reply: "চুটকি দিয়ে ইউনিভার্সের পুঁটকি মেরে দিসিলো সেই হালায় না? 🙂" },
  { keywords: ["hm", "hum", "হুম"], reply: "hmm er reply ki dibo jana nei 😷" },
  { keywords: ["wahid", "wahid koi"], reply: "Busy ache hoyto, Inbox koro 👉 : https://m.me/ami.wahid.bolchi 💌" },
  { keywords: ["thu", "থু"], reply: "তোর মুখে পড়ুক 😌" },
  { keywords: ["Assalamualaikum", "আসসালামু আলাইকুম"], reply: "Walaikumus salam warah matullahi wabrah katuh 🖤✨" },
  { keywords: ["salam"], reply: "salam na bole, bolo Assalamualaikum 💌. sundor vabe salam dite hoy 🖤✨" },
  { keywords: ["admin", "admin ke?", " বট কার", "bot kar", "admin ke", "kar bot"], reply: "Admin/Owner: 𝐅𝐞𝐫𝐝𝐨𝐮𝐬 𝐖𝐚𝐡𝐢𝐝 💜✨. 𝚃𝚢𝚙𝚎 𝙰𝚍𝚖𝚒𝚗 𝚏𝚋 𝚏𝚘𝚛 𝚏𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔 & 𝙰𝚍𝚖𝚒𝚗 𝚒𝚗𝚜𝚝𝚊 𝚏𝚘𝚛 𝚑𝚒𝚜 𝚒𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖 𝚊𝚌𝚌𝚘𝚞𝚗𝚝..! 😉💜" },
  { keywords: ["vondo", "ভন্ড"], reply: "Tumi Vondooo 🤡" },
  { keywords: ["ironman"], reply: "He loves us 3000 💌" },
  { keywords: ["mor", "dure giye mor", "moren", "মর"], reply: "Tui dure jaya mor 💀" },
  { keywords: ["bot cdi", "বট চুদি"], reply: "Cdao tmi 👅" },
  { keywords: ["jaiga", "chole jai", "gelam ga"], reply: "Jaoga, keo thakte bolse? 🙄" },
  { keywords: ["i love you", "valobashi", "ভালবাসি", "তোমাকে ভালোবাসি", "tomake valobashi"], reply: "Tomakeo Valobashi 🖤✨" },
  { keywords: ["Love me?", "valobasho?", "amake valobasho?", "ভালোবাসো"], reply: "নিজের চেহারা আয়নায় দেখসোস? 😶" },
  { keywords: ["sala", "hala", "halay"], reply: "Call me Dula bhai 🗿✨" },
  { keywords: ["bot sala", "বট সালা", "sala bot", "সালা বট"], reply: "দুলা ভাই ডাক 🥴" },
  { keywords: ["vag", "vago"], reply: "Dur ho tui 🫩" },
  { keywords: ["sigma", "chad"], reply: "🗿" },
  { keywords: ["nigga", "kala chan", "kalo", "kallu"], reply: "🌚" },
  { keywords: ["gaan", "song", "gaan shunao", "gaan sunao", "gan sunao", "gan shunbo", "gan sunbo", "গান", "গান শুনাও", "গান শুনবো"], reply: "গান শুনতে type করো : .song (title or song line)" },
  { keywords: ["Morning", "good morning", "gd morning", "gd m9", "শুভ সকাল", "গুড মর্নিং"], reply: "Good Morning 🌞, ফ্রেশ হয়ে নাস্তা করে নাও" },
  { keywords: ["good night", "gd night", "gd n8", "শুভ রাত্রি", "গুড নাইট"], reply: "Good night 😴 have a sweet dreams ✨, ঘুমিয়ে পরো 💌" },
  { keywords: ["bot er baccha", "bot er bacca"], reply: "Amar baccha nai, tumi chaile try korte pari 🙊💔" },
  { keywords: ["magi", "mgi", "mgi naki", "magi naki"], reply: "Tui mgi🫦" },
  { keywords: ["dhon", "dhn"], reply: "Dhon bolso bhaya shei hoise..! 🥴" },
  { keywords: ["gay", "গে"], reply: "Tui gay 🏳️‍🌈" },
  { keywords: ["ki koro", "ki koro?", "ki koros", "ki koros?"], reply: "Tomake miss kori 🫣, tmi ki koro?" },
  { keywords: ["lesbian", "lesbu", "লেসবিয়ান", "লেসবু"], reply: "Tui lesbu 🏳️‍🌈👅" },
  { keywords: ["🏳️‍🌈"], reply: "Somo-Kami naki?🤢" },
  { keywords: ["thanda lagse", "jor", "jor ashche"], reply: "Kivabe..? 🤒" },
  { keywords: ["gorom", "গরম", "গরম লাগে", "অনেক গরম", "গরম লাগতেসে", "গরম লাগতাসে", "gorom lage", "onek gorom", "gorom lagtase", "onk gorom"], reply: "asholei gorom onek 🥵" },
  { keywords: ["mara kha", "মারা খা"], reply: "Tore khawamu 🥴" },
  { keywords: ["mara khao", "মারা খাও"], reply: "tumi khao 😽, ami esob khaina..!" },
  { keywords: ["mara khan", "মারা খান"], reply: "Apnake khawate chai 🫦..!" },
  { keywords: ["bot gay", "বট গে", "গে বট", "gay bot"], reply: "Asho check koro, tmk dekhai 💋❤️‍🔥" },
  { keywords: ["Admin fb"], reply: "https://www.facebook.com/share/161ASSLBZ5/" },
  { keywords: ["Admin insta"], reply: "https://www.instagram.com/wahid_onthe_way?igsh=MW9kN3AwcGE2bjl4Mw=" },
  { keywords: ["bal bot", "baler bot", "বল বট", "বালের বট"], reply: "তুই নিজে বাল, থুক্কু আবাল 😆" },
  { keywords: ["kire bot", "কিরে বট", "ওই বট", "oi bot"], reply: "Kisse chillas keno?..!🫤" },
  { keywords: ["কিরে", "ওই কিরে", "kire", "oi kire"], reply: "Kire bhai, ki hoise 🙂 🔪" },
  { keywords: ["ok", "okay", "okah", "ওকে", "অকে"], reply: "hae okay 😗" },
  { keywords: ["okie", "ওকি", "okieee", "okieeeeeeeeeee"], reply: "okieeeeeeeeeee Wahid 🫂" },
  { keywords: ["accha", "acca", "আচ্ছা"], reply: "hmm accha 👌" },
  { keywords: ["Fb id", "Facebook id"], reply: "Amar to Facebook I'd nei 🙄" },
  { keywords: ["Ahem ahem", "ahem"], reply: "Golay ki Beng 🐸 dhukse?" },
  { keywords: ["big fan"], reply: "amio big fan tmr 💜" },
  { keywords: ["chup", "chop", "চুপ", "চপ"], reply: "Tui chup kor 🤫" },
  { keywords: ["Huh", "হুহ", "😤"], reply: "নিঃশ্বাস ছাড়লা একবার বললেও না" },
  { keywords: ["biye korbo", "বিয়ে করবো"], reply: "Amio korbo 🙈" },
  { keywords: ["biye korba?", "biye korba", "বিয়ে করবা?"], reply: "Hae cholo kore feli 🫣" },
  { keywords: ["lol", "xd", "lmao"], reply: "Posh Kid ashche 😷" },
  { keywords: ["hayre bot"], reply: "hayree polapan 🤦" },
  { keywords: ["🫦"], reply: "💋" },
  { keywords: ["😘", "😽"], reply: "chumu dio na issh 🙈" },
  { keywords: ["Ummah", "chumma", "chummah", "kiss"], reply: "Tomakeo Ummmmah 😽" },
  { keywords: ["ghumabo", "ghumamu", "ঘুমামু", "ঘুমাবো"], reply: "Toh ghumao, keo na korche? 😴" },
  { keywords: ["Khaiso", "খাইসো?", "khaiso?"], reply: "khaite diso? 🥺💔" },
  { keywords: ["khabo", "খাবো"], reply: "আমিও খাবো 😋" },
  { keywords: ["ki", "কি?", "কী", "ki?"], reply: "কিছু না 😅" },
  { keywords: ["ki khaba?", "ki khaba", "কি খাবা?"], reply: "Tomake khabo 🙂" },
  { keywords: ["gu kha", "gu khao", "gu", "গু", "গু খা", "গু খাও"], reply: "Tui kha 🤮" },
  { keywords: ["ghuma", "ঘুমা"], reply: "Tui age ghuma 😒" },
  { keywords: ["ghumao", "ঘুমাও"], reply: "Thik ache! ghumiye poro 💜" },
  { keywords: ["bot ghuma", "bot ghumao", "বট ঘুমা", "বট ঘুমাও"], reply: "Nah re, ghumabo na" },
  { keywords: ["oh accha", "oh", "ow", "owh"], reply: "hae 😗" },
  { keywords: ["Hey", "hey guys", "hey guy's"], reply: "Hey Wassup? 😉" },
  { keywords: ["natok", "নাটক"], reply: "Natok kom koro pio" },
  { keywords: ["bujhso?", "buccho?"], reply: "Bujhte chaina" },
  { keywords: ["Omg"], reply: "Say Omaygotto" },
  { keywords: ["🥵"], reply: "Horny mood e nak 🙂i" },
  { keywords: ["Ayhy", "Ayhyeee"], reply: "Kire ki hois 😐e" },
  { keywords: ["koi jao", "koi jas?"], replt: "Morte ☺️" }
  
  ];
// <<<<<< Admin UID List >>>>>>
const adminIDs = ["100025645342388"];

module.exports.handleEvent = function({ api, event }) {
  const { threadID, body, messageID, senderID } = event;
  if (!body) return;

  const config = JSON.parse(fs.readFileSync(configPath));
  if (!config.enabled) return;

  if (config.mode === "admin" && !adminIDs.includes(senderID)) return;

  const lowerBody = body.toLowerCase().trim();

  if (["bot", "বট"].includes(lowerBody)) {
    api.sendTypingIndicator(threadID, () => {
      setTimeout(() => {
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
        api.sendMessage(randomReply, threadID, messageID);
      }, 1000);
    });
    return;
  }

  keywordList.forEach(item => {
    if (item.keywords.some(k => lowerBody === k.toLowerCase())) {
      api.sendTypingIndicator(threadID, () => {
        setTimeout(() => {
          api.sendMessage(item.reply, threadID, messageID);
        }, 1000);
      });
    }
  });
};

module.exports.run = async function({ api, event, args }) {
  const { senderID, threadID, messageID } = event;

  if (!adminIDs.includes(senderID)) {
    return api.sendMessage("❌ Only Admin can use this command!", threadID, () => {
      api.deleteMessage(messageID);
    });
  }

  const config = JSON.parse(fs.readFileSync(configPath));

  if (args[0] === "on") {
    config.enabled = true;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("✅ AutoChat চালু হয়েছে!", threadID);

  } else if (args[0] === "off") {
    config.enabled = false;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("⛔ AutoChat বন্ধ হয়েছে!", threadID);

  } else if (args[0] === "admin") {
    config.mode = "admin";
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("🔒 AutoChat এখন শুধুমাত্র **Admin Mode** এ!", threadID);

  } else if (args[0] === "public") {
    config.mode = "public";
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("🌍 AutoChat এখন **Public Mode** এ!", threadID);

  } else {
    return api.sendMessage("⚙️ ব্যবহার: autochat on/off/admin/public", threadID);
  }
};
