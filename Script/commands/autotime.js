const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
  name: 'autosent',
  version: '12.0.0',
  hasPermssion: 0,
  credits: 'Shuvo Hassan & ChatGPT',
  description: 'Automatically sends funny messages 24 hours (BD Time) + night @everyone check',
  commandCategory: 'group messenger',
  usages: '[]',
  cooldowns: 3
};

// =========================
// Configurable content
// =========================

// Very large funny/cute/attitude messages (expanded)
const messages = [
  { time: '12:00 AM', message: '⏰ এখন রাত 12:00 AM — রাত্রি পিরিয়ড শুরু! ঘুমাই না? ভালোবাসা নাস্তা করে ফেলো, পরে কাঁদবি না! 😴🖤' },
  { time: '12:30 AM', message: '🌙 12:30 AM — কেউ সাপোর্ট চাইলে ghost করো না, আমার নাম বলবে: “শুভ আছে?” 😏👻' },
  { time: '1:00 AM', message: '🌃 1:00 AM — রাতের রাজা তুমি নাকি? কিন্তু ঘুম না করলে রাজত্ব কাস্ট হবে! 👑😪' },
  { time: '1:30 AM', message: '😵 1:30 AM — মোবাইল ছাড়া রাতটা কি সৌন্দর্য? নাই! কিন্তু চোখ বন্ধ কর, তার চেয়ে ভালো লাগে।' },
  { time: '2:00 AM', message: '🕒 2:00 AM — জাগো না, রাত বলে তোমাকে প্রেমে ফেলে, সকালে ব্যাকআপ নেই। 😅' },
  { time: '3:00 AM', message: '👀 3:00 AM — কেউ তোমায় দেখে না রাতেও? চিন্তা নেই, আমি দেখি — তুমি খুব দারুন! (পায়ে বকনা) 😂' },
  { time: '4:00 AM', message: '🌅 ভোর 4:00 AM — সূর্য উঠার আগে উঠে নামাজ/দোয়া করে নাও, পজিটিভ ভিবেস আনবে 🙏✨' },
  { time: '5:20 AM', message: '🌄 ভোর 5:20 AM — ফজরের আগে হাঁটা-মোটা করলে মন ভালো হয়ে যাবে, আর রোমান্সটা বাড়বে না কমবে না 😇' },
  { time: '6:00 AM', message: '☀️ সকাল 6:00 AM — হ্যালো সুন্দর! উঠে চা বানাও, হাসি বানাও, দিন শুরু করো! ☕🌼' },
  { time: '7:15 AM', message: '🚶‍♀️ 7:15 AM — সকালে হাঁটা না করলে WiFi গোপনে ক্ষতিপূরণ দেবে না — জয়েন করো বাইরে! 😄' },
  { time: '8:00 AM', message: '🍳 8:00 AM — ব্রেকফাস্ট ওয়ার্নিং! প্রেমে পড়লে খাবার ভুলে যেও না 😘' },
  { time: '9:00 AM', message: '📚 9:00 AM — কাজ/ক্লাস টাইম! মোবাইল ধীরে—ধীরে রেখে পড়াশোনা কর, পরে দেখবি কাপুরুষ খুব মিচলি 😜' },
  { time: '10:30 AM', message: '😎 10:30 AM — তুমি কিউট নও, তুমি ফ্যান্টাস্টিক—কিউটা আলাদা জিনিস! (তবো বাইর থেকে হাসো) 😁' },
  { time: '12:00 PM', message: '🍽️ দুপুর 12:00 PM — লাঞ্চ টাইম! বাসা খাও, প্রেমে না পড়লে টিফিনরে সাথে শেয়ার করো 😋' },
  { time: '2:00 PM', message: '🛁 2:00 PM — একটু রিল্যাক্স নাও, গোসল করে নিজেরে fresh করো — বিশ্বের সবচেয়ে সুন্দর হবে তুমি! 💦' },
  { time: '3:30 PM', message: '☕ 3:30 PM — চা ব্রেক! আর যদি চায়ে কুকি না থাকে, আমায় blame করো 😆🍪' },
  { time: '5:00 PM', message: '🌇 5:00 PM — সূর্যাস্ত রোমান্সা দিন শেষের শেষে ভালো লাগে, আর মনে রেখো হাসি লাইফটাইম! 😍' },
  { time: '6:30 PM', message: '🕌 6:30 PM — মাগরিব/আস্তাগফিরুল্লাহ বলে একটু থামো; পৃথিবীর দৌড় ফেলে আজকের কৃত্যগুলো মনে করো। 🙏' },
  { time: '8:00 PM', message: '🍽️ 8:00 PM — রাতের খাবার হোক, প্রেম হোক, Netflix হোক — যে কিছুই হোক, মিলে খাও! ❤️' },
  { time: '9:30 PM', message: '🌙 9:30 PM — ফোনটা আগ্নেয়াস্ত্র না, একটু দূরে ফেলে দাও — রাতটা শান্ত রাখো। 🌌' },
  { time: '10:30 PM', message: '🔋 10:30 PM — ব্যাটারি 10%? না হলে তুমি সারাদিনও কাজ করতে পারবে না — চার্জার বন্দোবস্ত করো! ⚡' },
  { time: '11:30 PM', message: '💤 11:30 PM — শুভ রাত্রি! ঘুমালে স্বপ্নেই আমি আসব (ভালোই লাগবে) 😇💤' }
];

// Playful insults/messages for @everyone night call (keep them non-violent, playful)
const nightShouts = [
  'হেই রাত পাগলেরা! @everyone — ক্যান তুমি সবাই এখনো অনলাইনে? ওরা তো বোকাই! 😜',
  '@everyone তোমরা জেগে আছো কেন? দেরি করলে আল জাব্বার রাগ করবো না, আমি করব 😏',
  '@everyone হাসতে আসো, না হলে রাতের রুটি কেউ কোথায় দেবে! বোকা বোকা পাগলরা উঠে আছো! 😂',
  '@everyone রাইটি কান্নাকাটি বন্ধ! ঘুমাও না হলে আমার কৌতুক মনে রাখবে না 😝',
  '@everyone যদি তোমার সাপোর্ট দরকার হয়, বলো — আমি তোর পাগল সাপোর্ট! আর বেপারটা বুঝে খেয়ো, বোকামি কমাও 😅'
];

// to avoid repeated spam in same night per thread
if (!global._autosentNightFlag) global._autosentNightFlag = {};

// =========================
// Helper: create mentions (try both @everyone & mentions for participants)
// =========================
function buildMentionList(participants) {
  // participants: array of {id, name}
  const mentions = [];
  let textParts = [];

  participants.forEach((p, idx) => {
    const tag = `@${(p.name || 'User').replace(/\s+/g, '')}`;
    textParts.push(tag);
    mentions.push({
      id: p.id,
      tag: tag
    });
  });

  return {
    text: textParts.join(' '),
    mentions
  };
}

// =========================
// Schedule main messages
// =========================
module.exports.onLoad = ({ api }) => {
  console.log(chalk.bold.hex("#00c300")("============ AUTO FUNNY COMMAND LOADED (BD TIME) ============"));

  // schedule regular messages
  messages.forEach(({ time, message }) => {
    const [hour, minute, period] = time.split(/[: ]/);
    let hour24 = parseInt(hour, 10);
    if (period === 'PM' && hour !== '12') hour24 += 12;
    else if (period === 'AM' && hour === '12') hour24 = 0;

    const rule = new schedule.RecurrenceRule();
    rule.tz = 'Asia/Dhaka';
    rule.hour = hour24;
    rule.minute = parseInt(minute || '0', 10);

    schedule.scheduleJob(rule, () => {
      if (!global.data?.allThreadID) return;
      global.data.allThreadID.forEach(threadID => {
        api.sendMessage(message, threadID, (error) => {
          if (error) {
            console.error(`Failed to send message to ${threadID}:`, error);
          }
        });
      });
    });

    console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
  });

  // =========================
  // Night-check job: between 00:00 - 00:59 (BDT)
  // We'll poll every 5 minutes during that hour to check online users.
  // If finds any online and not yet shouted tonight for that thread => send shout @everyone
  // =========================
  const nightRule = new schedule.RecurrenceRule();
  nightRule.tz = 'Asia/Dhaka';
  nightRule.hour = 0; // 12 AM hour
  nightRule.minute = new schedule.Range(0, 59, 5); // every 5 minutes

  schedule.scheduleJob(nightRule, async () => {
    if (!global.data?.allThreadID) return;

    for (const threadID of global.data.allThreadID) {
      try {
        // Try to fetch thread info (API may vary across frameworks)
        const threadInfo = await new Promise((resolve, reject) => {
          api.getThreadInfo(threadID, (err, info) => {
            if (err) return reject(err);
            resolve(info);
          });
        });

        // Try multiple common places where online info may exist
        let onlineUsers = [];

        // method 1: some libs provide `onlineUsers` or `presence` in threadInfo
        if (Array.isArray(threadInfo.onlineUsers) && threadInfo.onlineUsers.length) {
          onlineUsers = threadInfo.onlineUsers.map(id => ({ id }));
        }

        // method 2: fb-chat-api style: threadInfo.userInfo -> [{id, name, is_online}]
        if (!onlineUsers.length && Array.isArray(threadInfo.userInfo)) {
          onlineUsers = threadInfo.userInfo
            .filter(u => u.is_online || u.presence === 'active' || u.presence === 'online')
            .map(u => ({ id: u.id, name: u.name || u.userName }));
        }

        // method 3: sometimes `participantIDs` available but no presence -> skip
        // If we cannot detect actual online flag, fallback: skip to avoid false-shout
        if (!onlineUsers.length) {
          // optional fallback: try `threadInfo.participantIDs` and check each user's status individually
          if (Array.isArray(threadInfo.participantIDs)) {
            // attempt to fetch each user info (may be rate-limited) and check presence
            for (const uid of threadInfo.participantIDs.slice(0, 10)) { // limit to first 10 to avoid overload
              try {
                const userInfo = await new Promise((res, rej) => {
                  api.getUserInfo(uid, (e, uinfo) => {
                    if (e) return rej(e);
                    res(uinfo && uinfo[uid] ? uinfo[uid] : null);
                  });
                });
                if (userInfo && (userInfo.is_online || userInfo.presence === 'active' || userInfo.presence === 'online')) {
                  onlineUsers.push({ id: uid, name: userInfo.name || userInfo.fullName });
                }
              } catch (er) {
                // ignore per-user errors
              }
            }
          }
        }

        // If still none detected => do nothing for this thread this round
        if (!onlineUsers.length) continue;

        // If we've already shouted for this thread tonight, skip
        const todayKey = moment().tz('Asia/Dhaka').format('YYYY-MM-DD');
        if (!global._autosentNightFlag[threadID]) global._autosentNightFlag[threadID] = {};
        if (global._autosentNightFlag[threadID].date === todayKey && global._autosentNightFlag[threadID].shouted) {
          continue;
        }

        // Build mention list of participants (try to improve ping)
        const participants = (threadInfo.userInfo || []).map(u => ({ id: u.id, name: u.name || u.userName }));
        const mentionPack = buildMentionList(participants.slice(0, 30)); // limit mentions to 30 for safe

        const shout = nightShouts[Math.floor(Math.random() * nightShouts.length)];
        // prefer sending with mentions so everyone gets pinged; some platforms require `mentions` field
        const sendBody = `${shout}\n\n${mentionPack.text || '@everyone'}`;

        api.sendMessage({
          body: sendBody,
          mentions: mentionPack.mentions
        }, threadID, (err) => {
          if (err) {
            // As fallback, send plain body w/o mentions
            api.sendMessage(shout + ' @everyone', threadID, () => {});
          }
        });

        // mark shouted for tonight for this thread
        global._autosentNightFlag[threadID].date = todayKey;
        global._autosentNightFlag[threadID].shouted = true;

      } catch (err) {
        // fail silently for this thread but log
        console.error(`Night-check failed for thread ${threadID}:`, err);
      }
    }
  });

  console.log(chalk.hex("#FFAA00")("Night-check scheduled: will monitor 12:00 AM - 12:59 AM (every 5 minutes) and shout if online users found."));

  // Reset nightly flags at 1:00 AM so next night it can shout again
  const resetRule = new schedule.RecurrenceRule();
  resetRule.tz = 'Asia/Dhaka';
  resetRule.hour = 1;
  resetRule.minute = 0;
  schedule.scheduleJob(resetRule, () => {
    global._autosentNightFlag = {};
    console.log(chalk.hex("#FF00FF")("Night shout flags reset for new day."));
  });
};

module.exports.run = () => {
  // nothing to manually run
};
