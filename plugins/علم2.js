import similarity from 'similarity'

const threshold = 0.72
const timeout = 60000
const poin = 500

export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/.*•┇❐↞استخدم انسحب للانسحاب┇*/i.test(m.quoted.text) || /.*hhint/i.test(m.text))
        return true
    this.tokitoki = this.tokitoki ? this.tokitoki : {}
    if (!(id in this.tokitoki))
        return this.reply(m.chat, '*❐┃هــاذا الــســؤال قــد انــتـهـى┃☑️❯*', m)
    if (m.quoted.id == this.tokitoki[id][0].id) {
        let isSurrender = /^(انسحب|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tokitoki[id][3])
            delete this.tokitoki[id]
            return this.reply(m.chat, '*❐┃طـلـع غـبـي و انســحــب┃⚠️ ❯*', m)
        }
        let json = this.tokitoki[id][1]

        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tokitoki[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n*❐↞┇الـجـائـزة💰↞ ${this.tokitoki[id][2]} نقطه┇❯*`, m)
            clearTimeout(this.tokitoki[id][3])
            delete this.tokitoki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply(`*❐ ┃اقـربـت مـن الاجـابـه┃🚸 ❯*`)
        } else {
            this.reply(m.chat, `*❐┃اجـابـة خـاطـئـة ┃❌ ❯*`, m)
        }
    }
    return true
}

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/mikey44dd/hanry-bot/master/src/JSON/%D8%B9%D9%84%D9%85.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `${command.toUpperCase()}\n\n*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} *┇*\n*استخدم .انسحب للأنسحاب*\n*❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇*\n*❰BY :𝑫𝒐𝒇𝒍𝒂𝒎𝒊𝒏𝒈𝒐 🧧❱*`
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.question, '', caption.trim(), m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) {
                conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ ${json.response}┇`, conn.tebakbendera[id][0])
                delete conn.tebakbendera[id]
            }
        }, timeout)
    ]
}

handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^علم/i

export default handler
