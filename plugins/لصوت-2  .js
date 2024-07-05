
import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    if (!/video|audio/.test(mime)) throw `رد على فيديو أو مذكرة صوتية تريد تحويلها إلى صوت/MP3 باستخدام الأمر *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'لا يمكن تحميل الوسائط'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'لا يمكن تحويل الوسائط إلى صوت'
    conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}

handler.help = ['tomp3']
handler.tags = ['audio']
handler.alias = ['tomp3', 'toaudio']
handler.command = /^(mp3|audio)$/i

export default handler
