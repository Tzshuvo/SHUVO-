module.exports.config = {
name: "fork",
version: "1.0.0",
hasPermssion: 0,
credits: "SHUVO",
description: "Send GitHub repo link",
commandCategory: "other",
usages: "fork",
cooldowns: 3,
};

module.exports.run = async function({ api, event }) {
return api.sendMessage(
"🔗 GitHub Repo Link:\n\nhttps://github.com/Tzshuvo/SHUVO-.git",
event.threadID,
event.messageID
);
};

