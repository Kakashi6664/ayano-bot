import fetch from 'node-fetch';
import axios from 'axios';
import pinterestDownloader from 'pinterest-downloader'; // تحتاج إلى مكتبة لتنزيل محتوى Pinterest
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.descargas_pinterest;

  if (!args[0]) throw `${tradutor.texto1} _${usedPrefix + command} https://www.pinterest.com/pin/123456789012345/`;
  m.reply(global.wait);

  try {
    const img = await pinterestDownloader(args[0]);
    for (let i = 0; i < img.length; i++) {
      const bufferInfo = await getBuffer(img[i].download_link);
      if (bufferInfo.detectedType.mime.startsWith('image/')) {
        await conn.sendMessage(m.chat, { image: { url: img[i].download_link } }, { quoted: m });
      } else if (bufferInfo.detectedType.mime.startsWith('video/')) {
        await conn.sendMessage(m.chat, { video: { url: img[i].download_link } }, { quoted: m });
      }
    }
  } catch {
    try {
      const resultss = await pinterestDownloader(args[0]);
      const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
      const txt = `${tradutor.texto2} _${shortUrl}_`.trim();
      for (const { url } of resultss) await conn.sendFile(m.chat, url, 'error.mp4', txt, m);
    } catch {
      throw `${tradutor.texto3}`;
    }
  }
};

handler.command = /^(بينتر|pinterest|pindl|pin|pinterestdl)$/i;
export default handler;

const getBuffer = async (url, options) => {
  options = options || {};
  const res = await axios({ method: 'get', url, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, ...options, responseType: 'arraybuffer' });
  const buffer = Buffer.from(res.data, 'binary');
  const detectedType = await fileTypeFromBuffer(buffer);
  if (!detectedType || (detectedType.mime !== 'image/jpeg' && detectedType.mime !== 'image/png' && detectedType.mime !== 'video/mp4')) {
    return null;
  }
  return { buffer, detectedType };
};
