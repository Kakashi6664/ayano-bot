import { URL_REGEX } from '@whiskeysockets/baileys';
import PinterestScraper from 'pinterest-scraper';
import fetch from 'node-fetch';
import { lookup } from 'mime-types';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD" } }, "participant": "0@s.whatsapp.net" };
  text = text.endsWith('SMH') ? text.replace('SMH', '') : text;
  if (!text) throw '*[❗مساعده❗]*\n*•┃❖ابحث على اي صوره ا. شخصيه ترديها*\n*•┃❖مثال افتار لوفي افتار سونغ*';
  
  await conn.reply(m.chat, '*انتضر جار تحميل الافتار*', fkontak, { contextInfo: { forwardingScore: 2022, isForwarded: true, externalAdReply: { title: '𝐿𝑈𝐹𝐹𝑌-𝐵𝛩𝑇', body: '【𝟐𝟎𝟎𝟓/𝟐/𝟏𝟎】١⁵', sourceUrl: 'nn', thumbnail: '' } } });

  try {
    let res = await pinterest(text);
    let mime = await lookup(res);

    if (text.match(URL_REGEX)) {
      await conn.sendMessage(m.chat, { [mime.split('/')[0]]: { url: res }, caption: `Success Download: ${await shortUrl(res)}` }, { quoted: m });
    } else {
      await conn.sendFile(m.chat, res, 'pinterest.jpg', `*•┃❖نتيجة بحث ${text.capitalize()}*\n*•┃❖ا〘 ~𝚃𝚛𝚊𝚏𝚊𝚕𝚐𝚊𝚛 𝙻𝚊𝚘-𝚋𝚘𝚝~ 〙*`, fkontak, m);
    }
  } catch (error) {
    console.error(error);
    m.reply(`*[❗خطأ❗]* حدث خطأ أثناء البحث.`);
  }
};

handler.help = handler.alias = ['pinterest'];
handler.tags = ['downloader', 'image'];
handler.command = /^(بنترست|افتارات|افتار)$/i;
export default handler;

async function pinterest(query) {
  if (query.match(URL_REGEX)) {
    let res = await fetch('https://www.expertsphp.com/facebook-video-downloader.php', {
      method: 'post',
      body: new URLSearchParams(Object.entries({ url: query }))
    });
    let $ = cheerio.load(await res.text());
    let data = $('table[class="table table-condensed table-striped table-bordered"]').find('a').attr('href');
    if (!data) throw 'Can\'t download post :/';
    return data;
  } else {
    let results = await PinterestScraper.getPins(query, { pages: 1 }); // تحميل الصور من Pinterest بمكتبة pinterest-scraper
    if (!results || !results.length) throw `Query "${query}" not found :/`;
    return results[0].url; // الحصول على رابط أول صورة من النتائج
  }
}

async function shortUrl(url) {
  return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text();
}
