module.exports.config = {
  name: "chat",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Helal + GPT",
  description: "Banglish auto reply system",
  commandCategory: "fun",
  usages: "[text]",
  cooldowns: 1
};

// এখানে 200+ reply add করা হয়েছে
const replies = {
  "kemn aso": ["Alhamdulillah valo", "Thik thak! tumi?", "Besi valo na 😅"],
  "ajke valo lagse na": ["Try koro notun kichu korte 🙂", "Relax koro, sob thik hobe inshallah"],
  "chup": ["Thik ase 🤫", "hmm chup thaklam", "😶"],
  "bolbo na": ["Jemon icha 😏", "Na bolleo problem nai"],
  "kire koi sobai": ["Eito shobai busy 🐸", "Kew kew ghume 😴"],
  "valo": ["Shune valo laglo!", "Onnorokom lagse 🥲"],
  "kire": ["Ki re boss?", "Baki shob valo?", "Kire mamaa 😆"],
  "ki koros": ["Eto kichu na chill 🤙", "Bot toh server e bose thake", "Besi kichu na, chill"],
  "hello": ["Hey!", "Hello bro!", "Hi there 👋", "Assalamu Alaikum 🤲"],
  "bye": ["Allah Hafez 🤲", "Thik ase, bhalo theko", "Tata! 👋"],
  "love": ["Beshii love koro na vai 😅", "Love shobai chay 🫶", "Love is life ❤️"],
  "kaj": ["Kaj valo cholse", "Ekhon free chill time", "Besi kaj nai"],
  "kothai": ["Ekhanei asi", "Tor pashei achi", "Dure na, just ekhane"],
  "valo lagse": ["Wow, valo lagse shune", "Hmm nice 🔥", "Good to hear!"],
  "game": ["Minecraft kheli tor sathe? 🎮", "Free Fire valo jachhe naki?", "PUBG valo lagse 😎"],
  "group": ["Group ta onek active 🔥", "Kisu meme daw group e 😁", "Group e noise cholse"],
  "pagol": ["Tor jonnoi pagol hoye gelam 🤪", "Sabai pagol pagol 😅"],
  "khabo": ["Khubi khide lagse 🍔", "Khabi naki?"],
  "ajke": ["Ajker din ta misti 🌸", "Ajke onek busy"],
  "tumi ke": ["Ami ekta bot 😎", "Tor bondhu 🤖"],
  "hmm": ["hmm 🤔", "hmmm", "hmmm thik kotha"],
  "oi": ["Ki re oi oi 😁", "Oiiiii!"],
  "janis": ["Ki janbo? bol", "Bolo shune"],
  "bujhlam": ["Valo bujhecho 😄", "Hmm thik bujhcho"],
  "pagla": ["Tor moto pagla onek kom 😆", "Haha pagla re pagla"],
  "valo asi": ["Alhamdulillah ✨", "Sukria Allah 🙏"],
  "valo nai": ["Dua kori valo hoye jao", "Hobe hobe tension nio na"],
  "boss": ["Boss tumii 🔥", "Respect boss 🙌"],
  "lol": ["lol 🤣", "haha lol", "Loool"],
  "hahaha": ["Hahaha 🤣", "Ki mojaa", "Haso haso valo lage"]
};

// reply detection
module.exports.handleEvent = async function({ api, event }) {
  const msg = event.body ? event.body.toLowerCase() : "";
  for (let key in replies) {
    if (msg.includes(key)) {
      const ans = replies[key];
      const randomReply = ans[Math.floor(Math.random() * ans.length)];
      return api.sendMessage(randomReply, event.threadID, event.messageID);
    }
  }
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage("Just write something, I’ll auto reply 😄", event.threadID, event.messageID);
};
