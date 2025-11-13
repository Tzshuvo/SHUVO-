module.exports.config = {
  name: "autoinvite",
  eventType: ["log:unsubscribe"],
  version: "2.5",
  credits: "MOHAMMAD AKASH",
  description: "Auto re-add members who leave the group"
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID, logMessageData, author } = event;
  const leftID = logMessageData.leftParticipantFbId;

  // ✅ যদি ইউজার নিজে লিভ নেয় (kick না হয়)
  if (leftID === author) {
    const userInfo = await Users.getData(leftID);
    const userName = userInfo.name || "Unknown";

    // ✅ Bold ফন্ট ম্যাপ
    const boldMap = {
      A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
      K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
      U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
      a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
      k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
      u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇"
    };

    const boldName = userName
      .split("")
      .map(c => boldMap[c] || c)
      .join("");

    // ✅ মজার মেসেজ
    const msg = `🛑 এই বলদ....!! 😹  
${boldName}  
💬 গ্রুপ থেকে লিভ নেওয়া কি মুখের কথা নাকি? 😏  
👑 যে গ্রুপে আমি থাকি..?? 🐸  
⚠️ সেই গ্রুপ থেকে লিভ নেওয়া অসম্ভব ভাই! 😂  
🌀 আবার অ্যাড করে দিলাম 😇  

━━━━━━━━━━━━━━━
     —͟͟͞͞𝐒𝐇𝐔𝐕𝐎 
━━━━━━━━━━━━━━━`;

    // ✅ আবার গ্রুপে অ্যাড করা
    try {
      await api.addUserToGroup(leftID, threadID);
      await api.sendMessage(msg, threadID);
    } catch (err) {
      api.sendMessage(
        "⚠️ দুঃখিত, আমি ইউজারটাকে আবার অ্যাড করতে পারিনি। সম্ভবত অ্যাড ব্লক করা আছে।",
        threadID
      );
    }
  }
};
