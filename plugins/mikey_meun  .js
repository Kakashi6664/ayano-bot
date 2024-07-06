import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);
    const mentionId = m.key.participant || m.key.remoteJid;

    if (device !== 'desktop' || device !== 'web') {      
        var joanimiimg = await prepareWAMessageMedia({ image: {url: 'https://telegra.ph/file/ec34a10a1e120334df142.jpg'}}, { upload: conn.waUploadToServer })
        const interactiveMessage = {
            body: { text: `~*⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹*~`.trim() },
            footer: { text: `©By MIKEY`.trim() },  
            header: {
                title: `مرحبا يا: @${mentionId.split('@')[0]}`,
                subtitle: `*اختر احد الاوامر من القائمة*`,
                hasMediaAttachment: true,
                imageMessage: joanimiimg.imageMessage,
            },
            nativeFlowMessage: {
  						buttons: [
  							{
  								name: 'single_select',
  						  	buttonParamsJson: JSON.stringify({
  						  		title: '🐾➜⃞「الاوامر」',
  						  		sections: [
  						  			{
  						  				title: 'قوائم الأوامر',
  						  		    rows: [
  						  		    	{
  						  		    		header: 'By MIKEY',
  										      title: 'استدعاء قائمة المجموعات',
  									    	  description: '#قائمة اوامر المجموعات',
  								    		  id:'.المشرفين '
  						  		    	}
  						  		    ]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: '  .الاعضاء ',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.المطور '
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: '.التنزيلات ',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.الادوات. '
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: '.الاسلاميات ',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.التحميل. '
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: '.التحويل',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.الوهمي'
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: '.المطورين ',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.صور'
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: 'استدعاء قائمة الملصقات',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.الملصقات'
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: 'استدعاء قائمة الالعاب',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.الالعاب'
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: 'استدعاء قائمة الاوامر الدينية',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.الاسلام'
  						  		    	}
  						  				]
  						  			},
  						  			{
  						  				rows: [
  						  					{
  						  		    		header: 'By MIKEY',
  										      title: 'استدعاء قائمة التصاميم',
  									    	  description: '𝙰𝚈𝙰𝙽𝙾𝙺𝙾𝚄𝙹𝙸 𝙱𝙾𝚃',
  								    		  id: '.التصاميم'
  						  		    	}
  						  				]
  						  			}
  						  		]
  						  	})
  							},
                              {
                                  name: 'cta_url',
                                  buttonParamsJson: JSON.stringify({
                                      display_text: '⚠️مجموعة البوت⚠️',
                                      url: 'https://chat.whatsapp.com/BkH3QQ6K4eV4nRJYuwzMZP',
                                      merchant_url: ''
                                  })
                              },
                              {
                                  name: 'cta_url',
                                  buttonParamsJson: JSON.stringify({
                                      display_text: '👨🏻‍💻قناه البوت👨🏻‍💻',
                                      url: 'https://whatsapp.com/channel/0029VaZThPH2UPBBFmyXPf1o',
                                      merchant_url: 'https://whatsapp.com/channel/0029VaZThPH2UPBBFmyXPf1o'
                                  })
                              }
  			  		],
                messageParamsJson: ''
            }
        };        

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m })
        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        conn.sendFile(m.chat, 'JoAnimi•Error.jpg', m);      
    }    
};
handler.help = ['imgboton'];
handler.tags = ['For Test'];
handler.command = ['الاوامر','اوامر'];
export default handler;
