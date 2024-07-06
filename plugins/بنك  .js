let handler = async (m, { conn, command }) => {
 let user = global.db.data.users[m.sender]
 let imgr = flaaa.getRandom()
 const caption = `
${htki} *بنك المستخدم* ${htka}
${dmenub} 📛 *الاسم:* ${user.registered ? user.name : conn.getName(m.sender)}
${dmenub} 💳 *الصراف الآلي:* ${user.atm > 0 ? 'المستوى ' + user.atm : '✖️'}
${dmenub} 🏛️ *البنك:* ${user.bank} 💲 / ${user.fullatm} 💲
${dmenub} 💹 *المال:* ${user.money} 💲
${dmenub} 🤖 *الروبو:* ${user.robo > 0 ? 'المستوى ' + user.robo : '✖️'}
${dmenub} 🌟 *الحالة:* ${user.premiumTime > 0 ? 'بريميوم' : 'مجاني'}
${dmenub} 📑 *مسجل:* ${user.registered ? 'نعم':'لا'}
${dmenuf}
`.trim()
 
 await conn.sendFile(m.chat, imgr + command, "", caption, m)
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(بنك(cek)?|cekbank|بنك|البنك)$/i

handler.register = false
export default handler
