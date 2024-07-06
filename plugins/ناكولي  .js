let handler = async (m, {
	command,
	usedPrefix,
	args
}) => {
	let user = global.db.data.users[m.sender]
	let author = global.author
	let upgrd = (args[0] || '').toLowerCase()
	let type = (args[0] || '').toLowerCase()
	let _type = (args[1] || '').toLowerCase()
	let jualbeli = (args[0] || '').toLowerCase()
	const list = `
╭──『 ғᴏᴏᴅ 』
│⬡ typing command↓
│ ${usedPrefix + command } rendang
│
│⬡ 🍖 *Ayambakar*
│⬡ 🍗 *Ayamgoreng*
│⬡ 🥘 *Rendang*
│⬡ 🥩 *Steak*
│⬡ 🥠 *Babipanggang*
│⬡ 🍲 *Gulaiayam*
│⬡ 🍜 *Oporayam*
│⬡ 🍷 *Vodka*
│⬡ 🍣 *Sushi*
│⬡ 💉 *Bandage*
│⬡ ☘️ *Ganja*
│⬡ 🍺 *Soda*
│⬡ 🍞 *Roti*
│⬡ 🍖 *ikan bakar*
│⬡ 🍖 *lele bakar*
│⬡ 🍖 *nila bakar*
│⬡ 🍖 *bawal bakar*
│⬡ 🍖 *udang bakar*
│⬡ 🍖 *paus bakar*
│⬡ 🍖 *kepiting bakar*
╰───────────────
`.trim()
	//try {
	if (/makan|eat/i.test(command)) {
		const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
		switch (type) {
			case 'ayamgoreng':
				if (user.stamina < 100) {
					if (user.ayamgoreng >= count * 1) {
						user.ayamgoreng -= count * 1
						user.stamina += 20 * count
						conn.reply(m.chat, `Nyam nyam`, m)
					} else conn.reply(m.chat, ` Ayam goreng kamu kurang`, m)
				} else conn.reply(m.chat, `Stamina kamu sudah penuh`, m)
				break
			case 'ayambakar':
				if (user.stamina < 100) {
					if (user.ayambakar >= count * 1) {
						user.ayambakar -= count * 1
						user.stamina += 20 * count
						conn.reply(m.chat, `Nyam nyam`, m)
					} else conn.reply(m.chat, ` Ayam bakar kamu kurang`, m)
				} else conn.reply(m.chat, `Stamina kamu sudah penuh`, m)
				break
			// الحالات الأخرى هنا
			default:
				await conn.sendMessage(m.chat, {
					text: list,
					footer: author,
					title: '「 *E A T I N G* 」',
					buttonText: "E A T",
					sections: [{
						title: "List Featured",
						rows: [{
								title: "Ayam Bakar 🍖",
								rowId: ".eat ayambakar",
								description: "Memakan Ayam Bakar +20 Stamina"
							},
							// المزيد من العناصر هنا
						]
					}]
				})
		}
	} else if (/p/i.test(command)) {
		const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count)
		switch (_type) {
			case 'p':
				break
			default:
				return conn.reply(m.chat, list, m)
		}

		console.log(e)
		if (DevMode) {
			for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
				conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)

			}
		}
	}
}

handler.help = ['eat', 'makan']
handler.tags = ['rpg']
handler.register = true
handler.command = /^(اكل|makan)$/i
export default handler
```
