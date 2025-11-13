const fs = require("fs-extra");

module.exports.config = {
  name: "welcome",
  version: "2.3",
  credits: "Mohammad Akash",
  description: "Send custom welcome message when new members join",
  eventType: ["log:subscribe"],
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  const { threadID, logMessageData, author } = event;
  const addedMembers = logMessageData.addedParticipants;
  if (!addedMembers || addedMembers.length === 0) return;

  // 🕒 সময় নির্ধারণ
  const now = new Date();
  const hours = now.getHours();
  const session =
    hours <= 10 ? "morning" :
    hours <= 12 ? "noon" :
    hours <= 18 ? "afternoon" :
    "evening";

  // 📚 গ্রুপ ইনফো
  const threadInfo = await api.getThreadInfo(threadID);
  const threadName = threadInfo.threadName || "this group";
  const memberCount = threadInfo.participantIDs.length;

  for (const user of addedMembers) {
    const userID = user.userFbId;
    const userName = user.fullName;
    const botID = api.getCurrentUserID();

    // ✅ যদি বটকে অ্যাড করা হয়
    if (userID == botID) {
      return api.sendMessage(
`━━━━━━━━━━━━━━━━━━━━━
🤖 ধন্যবাদ আমাকে গ্রুপে অ্যাড করার জন্য 💖

⚙️ Bot Prefix :  /
📜 সব কমান্ড দেখতে লিখুন :  /help

চলুন একসাথে এই গ্রুপটা আরও মজার করে তুলি! 😄
━━━━━━━━━━━━━━━━━━━━━`, 
threadID
      );
    }

    // ✅ নতুন ইউজার হলে
    const inviterName = await Users.getNameUser(author);

    // 🎀 ওয়েলকাম মেসেজ
    let welcomeMessage = 
`__আসসালামু আলাইকুম__
═══════════════
__𝑾𝑬𝑳𝑪𝑶𝑴𝑬 ➤ ${userName}__

_আমাদের ${threadName}_
_এর পক্ষ থেকে আপনাকে_
       __!! স্বাগতম !!__
__'আপনি এই__
        __গ্রুপের ${memberCount} নাম্বার মেমবার___!!

___𝙰𝚍𝚍𝚎𝚍 𝙱𝚢 : ${inviterName}___

🌞 শুভ ${session}!
𝙱𝚘𝚝 𝙾𝚠𝚗𝚎𝚛 :—͟͟͞͞𝐒𝐇𝐔𝐕𝐎`;

    // ✅ নিকনেম সেট করা
    try {
      const nickname = `★ ${userName} | ${threadName} ★`;
      await api.changeNickname(nickname, threadID, userID);
    } catch (err) {
      console.log("❌ Nickname set error:", err.message);
    }

    // ✅ ফাইনাল মেসেজ পাঠানো
    const form = {
      body: welcomeMessage,
      mentions: [{ tag: userName, id: userID }]
    };

    api.sendMessage(form, threadID);
  }
};
