/*
Base Whatsapp Bot  -  v1.0.1  (case type)
By DanuZz

Commands: csong, ping, menu
*/
require('./config');
const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');
const axios = require('axios');
const { execFile } = require('child_process');
const { ytdl } = require('./lib/ytdl');

const execFileP = util.promisify(execFile);

// ffmpeg: use the bundled binary (ffmpeg-static) if present, else the system one
let FFMPEG = 'ffmpeg';
try { FFMPEG = require('ffmpeg-static') || 'ffmpeg'; } catch {}

function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const mi = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return (
        (d ? d + (d === 1 ? ' day, ' : ' days, ') : '') +
        (h ? h + (h === 1 ? ' hour, ' : ' hours, ') : '') +
        (mi ? mi + (mi === 1 ? ' minute, ' : ' minutes, ') : '') +
        (s ? s + (s === 1 ? ' second' : ' seconds') : '')
    ) || '0 seconds';
}

module.exports = async (Dxz, m) => {
    try {
        const prefix = global.prefix;
        const body = m.text || '';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(/\s+/).shift().toLowerCase() : '';
        const args = body.trim().split(/\s+/).slice(1);
        const text = args.join(' ');

        const senderNumber = (m.sender || '').split('@')[0].split(':')[0];
        const owners = (global.owner || []).map((v) => String(v).replace(/[^0-9]/g, ''));
        const isOwner = m.fromMe || owners.includes(senderNumber);

        const react = (emoji) => Dxz.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});

        //~~~~~ Case Features ~~~~~//
        switch (command) {

            // ───────────── csong ─────────────
            case 'csong': {
                if (!isOwner) return m.reply('❌ *Only for owner!*');
                if (!text) return m.reply(`❗ Example: ${prefix}csong <channelJid> <song name or YouTube link>`);

                const channelJid = args[0];
                const query = args.slice(1).join(' ');
                if (!channelJid.includes('@')) return m.reply('❗ Please provide a valid channel JID (e.g. 120363xxxx@newsletter).');
                if (!query) return m.reply('❗ Please enter the song name or YouTube link.');

                await react('🎵');
                const tmp = [];
                try {
                    // 1. search + get mp3 link (scraper)
                    const { info, downloadUrl } = await ytdl(query, 'mp3');

                    // 2. download mp3
                    const mp3 = await axios.get(downloadUrl, { responseType: 'arraybuffer', timeout: 120000 });
                    const tempMp3 = path.join(os.tmpdir(), `${Date.now()}_input.mp3`);
                    const tempOpus = path.join(os.tmpdir(), `${Date.now()}_output.opus`);
                    tmp.push(tempMp3, tempOpus);
                    fs.writeFileSync(tempMp3, Buffer.from(mp3.data));

                    // 3. convert to opus (voice-note style); fall back to plain mp3 if ffmpeg fails
                    let audioBuffer, audioMime = 'audio/ogg; codecs=opus', asPtt = true, ext = 'opus';
                    try {
                        await execFileP(FFMPEG, [
                            '-y', '-i', tempMp3,
                            '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10',
                            tempOpus,
                        ]);
                        audioBuffer = fs.readFileSync(tempOpus);
                    } catch (e) {
                        console.error('ffmpeg failed, sending mp3 instead:', e.message);
                        audioBuffer = fs.readFileSync(tempMp3);
                        audioMime = 'audio/mpeg'; asPtt = false; ext = 'mp3';
                    }

                    // 4. thumbnail
                    let thumbBuffer = null;
                    try {
                        const t = await axios.get(info.thumb, { responseType: 'arraybuffer', timeout: 15000 });
                        thumbBuffer = Buffer.from(t.data);
                    } catch {}

                    // 5. caption (edit me!)
                    const caption =
`*🪸 ${global.namabot}*

> _*🧃 Title*_ : \`${info.title}\`
> _*🎤 Channel*_ : \`${info.channel || 'Unknown'}\`
> _*🪺 Duration*_ : \`${info.duration || 'Unknown'}\`
> _*Thanks For Checking Our Bot!! 😌✨*_`;

                    // 6. send to channel: preview image, then audio
                    await Dxz.sendMessage(channelJid, {
                        image: thumbBuffer || { url: info.thumb },
                        caption,
                    });
                    await Dxz.sendMessage(channelJid, {
                        audio: audioBuffer,
                        mimetype: audioMime,
                        ptt: asPtt,
                        fileName: `${info.title}.${ext}`,
                    });

                    await react('✅');
                    await m.reply(`✅ Sent *${info.title}* to channel successfully!`);
                } catch (error) {
                    console.error(error);
                    await react('❌');
                    await m.reply('⚠️ Error: ' + (error.message || 'unknown error'));
                } finally {
                    for (const f of tmp) { try { fs.unlinkSync(f); } catch {} }
                }
                break;
            }

            // ───────────── ping ─────────────
            case 'ping': {
                const start = Date.now();
                await react('⚡');
                const end = Date.now();
                await m.reply(`Pong! ⚡\nSpeed: ${end - start}ms\nRuntime: ${runtime(process.uptime())}`);
                break;
            }

            // ───────────── menu ─────────────
            case 'menu': {
                await react('🧋');
                const menu =
`╭━━━〔 *${global.namabot}* 〕━━━⬣
┃ 👑 Owner   : ${global.namaown}
┃ 🔖 Version : v${global.version}
┃ ⌗ Prefix  : ${prefix}
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 *COMMANDS* 〕━━⬣
┃ 🎵 *${prefix}csong* <channelJid> <song>
┃     ↳ send a song to a channel
┃ ⚡ *${prefix}ping*
┃     ↳ check bot speed & uptime
┃ 🧋 *${prefix}menu*
┃     ↳ show this menu
╰━━━━━━━━━━━━━━━━⬣

${global.footer}`;
                await m.reply(menu);
                break;
            }

            default:
        }
    } catch (err) {
        console.log(util.format(err));
    }
};

//~~~~~ Hot reload ~~~~~//
const file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});