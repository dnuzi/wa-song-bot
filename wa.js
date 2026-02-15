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
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) ? (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) : '';

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
        
case 'csong': {
    const fetch = require('node-fetch');
    const yts = require('yt-search');
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    const { exec } = require('child_process');

    Dxz.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });

    if (!text) return m.reply("❗ Example: .csong <channelJid> <song name>");
    
    let args = text.split(" ");
    let channelJid = args[0];
    let query = args.slice(1).join(" ");

    if (!channelJid.includes("@")) return m.reply("❗ Please provide a valid channel JID.");
    if (!query) return m.reply("❗ Please enter the song name.");

    try {
        // 🔍 Search YouTube
        const search = await yts(query);
        if (!search.videos.length) return m.reply("❌ No results found on YouTube.");
        
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

        m.reply("✅ Sent to channel successfully! (playable Opus audio)");

    } catch (error) {
        console.error(error);
        m.reply("⚠️ Error: " + (error.message || "unknown error"));
    }
    break;
}
        
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
                await m.reply(`Pong! ⚡\nSpeed: ${end - start}ms\nRuntime: ${runtime(process.uptime())}`);
                break;

default:
}
} catch (err) {
console.log(util.format(err))
}
}

//~~~~~Status Diperbarui~~~~~//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
