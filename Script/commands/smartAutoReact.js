// smartAutoReact.js
// মেসেজের দৈর্ঘ্য অনুযায়ী মজার র‍্যান্ডম রিয়েক্ট দেয়
// Credits: 𝑴𝒐𝒉𝒂𝒎𝒎𝒂𝒅 𝑨𝒌𝒂𝒔𝒉

module.exports.config = {
  name: "smartAutoReact",
  eventType: ["message"],
  version: "1.0.2",
  credits: "𝑴𝒐𝒉𝒂𝒎𝒎𝒂𝒅 𝑨𝒌𝒂𝒔𝒉",
  description: "মেসেজের দৈর্ঘ্য অনুযায়ী মজার র‍্যান্ডম রিয়েক্ট দেয়",
  dependencies: {}
};

module.exports.run = async function({ api, event }) {
  try {
    const shortEmojis = ["❤️", "👍", "😏", "😞"];
    const longEmojis = ["😂", "😅", "🥺", "😎", "😱"];

    let emoji;
    if (event.body.length <= 20) {
      // ছোট মেসেজে ছোট ইমোজি লিস্ট থেকে
      emoji = shortEmojis[Math.floor(Math.random() * shortEmojis.length)];
    } else {
      // বড় মেসেজে বড় ইমোজি লিস্ট থেকে
      emoji = longEmojis[Math.floor(Math.random() * longEmojis.length)];
    }

    await api.setMessageReaction(emoji, event.messageID, (err) => {
      if (err) console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
};
