let timeout = 60000
let poin = 500
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/ayanoo01/hanry-bot/master/src/JSON/%D8%B9%D9%84%D9%85.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*· • • ━━ ⌝☘️⌞ ━━ • • ·*
*${command.toUpperCase()}*
*🜋↫╎السـؤال ✍🏻⇜『ما اسم الدولة التي يمثلها هذا العلم؟』*
*🜋↫╎الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثواني ┇*
*استخدم .انسحب للأنسحاب*
*🜋↫╎الـجـائزة💰↞ ${poin} نقاط┇*
∞┇━━━ •☘️• ━━━┇∞
*✠ ~تــ✍︎ــوقــيــع ↯:~*
*『𝚃𝚛𝚊𝚏𝚊𝚕𝚐𝚊𝚛 𝙻𝚊𝚘』*
    `.trim()
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ *${json.name}* ┇`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['علم']
handler.tags = ['fun']
handler.command = /^علم/i

export default handler
