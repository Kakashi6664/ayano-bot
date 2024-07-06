let handler = async (m, { conn, usedPrefix }) => {
  try {
    const الوقت_للانتظار = 300000;
    const الوقت_الحالي = new Date();
    const الوقت_منذ_آخر_مغامرة = الوقت_الحالي - global.db.data.users[m.sender].lastadventure;
    const الوقت_المتبقي = الوقت_للانتظار - الوقت_منذ_آخر_مغامرة;
    const المؤقت = clockString(الوقت_المتبقي);

    const المستخدم = global.db.data.users[m.sender];
    const { healt, armor, rubah, kuda, kucing, anjing } = المستخدم;

    if (healt <= 79) {
      return conn.reply(m.chat, `⚠️ *الحد الأدنى للصحة يجب أن يكون 80* للقيام بمغامرة. اشترِ الدواء باستخدام ${usedPrefix}shop buy potion <الكمية> واستخدمه بـ ${usedPrefix}use potion <الكمية>. للحصول على المال والجرعات مجانًا اكتب *${usedPrefix}claim*`, m);
    }

    if (الوقت_منذ_آخر_مغامرة <= الوقت_للانتظار) {
      return conn.reply(m.chat, `⌛ *لقد قمت بمغامرة بالفعل*، يرجى الانتظار حتى *${المؤقت}*`, m);
    }

    const الصحة = Math.floor(Math.random() * 101);
    const صحة_القط = [0, 5, 10, 15, 21, 30][kucing] || 30;
    const صحة_الدرع = [0, 5, 10, 15, 21, 30][armor] || 30;
    const الصحة_الإجمالية = الصحة > 60 ? الصحة - صحة_القط - صحة_الدرع : الصحة;
    const الخبرة = Math.floor(Math.random() * 400) + kuda * 70;
    const المال = Math.floor(Math.random() * 400) + anjing * 70;
    const الجرعة = Math.floor(Math.random() * 5) + 1; // كمية الجرعة تتراوح بين 1 إلى 5
    const الألماس = [pickRandom(['0', '1']), pickRandom(['0', '1']), pickRandom(['0', '1', '2']), pickRandom(['0', '1', '2']), pickRandom(['0', '1', '1', '2', '1', '1', '0']), pickRandom(['0', '0', '1', '2', '2', '1', '1', '0'])][rubah] || 0;
    const العادي = Math.floor(Math.random() * 5) + 1; // كمية العادي تتراوح بين 1 إلى 5
    const غير_العادي = Math.floor(Math.random() * 3) + 1; // كمية غير العادي تتراوح بين 1 إلى 3
    const الأسطوري = pickRandom(['1', '0', '0', '1']);
    const الأسطوري_الكبير = pickRandom(['1', '0', '0', '0']);
    const القمامة = Math.floor(Math.random() * 300) + 100; // كمية القمامة تتراوح بين 100 إلى 399
    const الخشب = Math.floor(Math.random() * 3) + 1; // كمية الخشب تتراوح بين 1 إلى 3
    const الحجر = Math.floor(Math.random() * 2) + 1; // كمية الحجر تتراوح بين 1 إلى 2
    const الحبل = Math.floor(Math.random() * 2) + 1; // كمية الحبل تتراوح بين 1 إلى 2
    const الحديد = Math.floor(Math.random() * 2) + 1; // كمية الحديد تتراوح بين 1 إلى 2

    المستخدم.healt -= الصحة;
    المستخدم.exp += الخبرة;
    المستخدم.money += المال;
    المستخدم.potion += الجرعة;
    المستخدم.diamond += الألماس;
    المستخدم.common += العادي;
    المستخدم.uncommon += غير_العادي;
    المستخدم.sampah += القمامة;
    المستخدم.iron += الحديد;
    المستخدم.batu += الحجر;
    المستخدم.kayu += الخشب;
    المستخدم.string += الحبل;
    المستخدم.lastadventure = الوقت_الحالي;

    const str = `
*${rpg.emoticon('healt')} فقدت ${الصحة} صحة* لأنك قمت بمغامرة إلى *${pickRandom(['🌏 نهاية العالم', '🌌 الفضاء الخارجي', '🗺️ عالم الأحلام', '🚀 المريخ', '🌚 القمر', '🪐 بلوتو', '🌞 الشمس', '❤️ قلبها', '...'])}* وحصلت على
*${rpg.emoticon('exp')} الخبرة:* ${الخبرة}
*${rpg.emoticon('money')} المال:* ${المال}
*${rpg.emoticon('sampah')} القمامة:* ${القمامة}${الجرعة === 0 ? '' : `\n*${rpg.emoticon('potion')} الجرعة:* ${الجرعة}`}${الحديد === 0 ? '' : `\n*${rpg.emoticon('iron')} الحديد:* ${الحديد}`}${الخشب === 0 ? '' : `\n*${rpg.emoticon('kayu')} الخشب:* ${الخشب}`}${الحجر === 0 ? '' : `\n*${rpg.emoticon('batu')} الحجر:* ${الحجر}`}${الحبل === 0 ? '' : `\n*${rpg.emoticon('string')} الحبل:* ${الحبل}`}${الألماس === 0 ? '' : `\n*${rpg.emoticon('diamond')} الألماس:* ${الألماس}`}${العادي === 0 ? '' : `\n*${rpg.emoticon('common')} الصندوق العادي:* ${العادي}`}${غير_العادي === 0 ? '' : `\n*${rpg.emoticon('uncommon')} الصندوق غير العادي:* ${غير_العادي}`}`;

    conn.reply(m.chat, str, m);

    if (الأسطوري > 0) {
      المستخدم.mythic += الأسطوري;
      conn.reply(m.chat, `🎉 *تهانينا!*\nلقد حصلت على عنصر *نادر* وهو *${الأسطوري}* ${rpg.emoticon('mythic')} Mythic Crate`, m);
    }

    if (الأسطوري_الكبير > 0) {
      المستخدم.legendary += الأسطوري_الكبير;
      conn.reply(m.chat, `🎉 *تهانينا!*\nلقد حصلت على عنصر *ملحمي* وهو *${الأسطوري_الكبير}* ${rpg.emoticon('legendary')} Legendary Crate`, m);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

handler.help = ['مغامرة', 'عمل'];
handler.tags = ['rpg'];
handler.command = /^(مغامرة|عمل)$/i;

handler.fail = null;
handler.register = false;
handler.group = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n' + d, ' *أيام ☀️*\n ', h, ' *ساعات 🕐*\n ', m, ' *دقائق ⏰*\n ', s, ' *ثواني ⏱️* '].map(v => v.toString().padStart(2, 0)).join('');
}
