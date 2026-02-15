/*
Base Whatsapp Bot
By DanuZz

Site: https://www.movanest.xyz
*/
require('./config');
const { default: makeWASocket, DisconnectReason, makeInMemoryStore, jidDecode, proto, getContentType, useMultiFileAuthState, downloadContentFromMessage } = require("bail")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const readline = require("readline");
const PhoneNumber = require('awesome-phonenumber')
const chalk = require('chalk')
const { File } = require("megajs")
const mega = require("megajs")
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

const question = (text) => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); return new Promise((resolve) => { rl.question(text, resolve) }) };

// ----------------- Config / Global -----------------
const SESSION_DIR = "./session";           // ← matches your useMultiFileAuthState("session")
const SESSION_FILE = `${SESSION_DIR}/creds.json`;

// ~~~~~Making Connection~~~~~//
async function StartDxzArchive() {
    // Make sure session folder exists
    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR, { recursive: true });
        console.log(chalk.cyan("→ Created session directory"));
    }

    // ─── Session from Mega.nz if creds.json is missing ───
    if (!fs.existsSync(SESSION_FILE)) {
        if (global.session_id && global.session_id.includes("=")) {
            console.log(chalk.yellow("→ No local session found. Trying to download from Mega.nz..."));

            try {
                const fileKey = global.session_id.replace("DanuXxxii=", "").trim();
                const file = File.fromURL(`https://mega.nz/file/${fileKey}`);

                await new Promise((resolve, reject) => {
                    file.download((err, data) => {
                        if (err) return reject(err);

                        fs.writeFileSync(SESSION_FILE, data);
                        console.log(chalk.green("→ Session file downloaded successfully ✓"));
                        resolve();
                    });
                });
            } catch (err) {
                console.error(chalk.red("Mega download failed:"), err.message);
                console.log(chalk.yellow("→ Falling back to pairing code..."));
            }
        } else {
            console.log(chalk.dim("→ No session_id provided → will use pairing code"));
        }
    } else {
        console.log(chalk.green("→ Found existing session → connecting automatically..."));
    }

    // ────────────────────────────────────────────────
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);

    const shouldRequestPairing = !state.creds.registered;

    const Dxz = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    // Pairing code only if still not registered (and download didn't succeed)
    if (shouldRequestPairing) {
        console.log(chalk.yellow("No valid session after download attempt. Starting pairing..."));
        const phoneNumber = await question(chalk.cyan('Enter Bot Number (with country code, e.g. 94712345678):\n'));
        
        let code = await Dxz.requestPairingCode(phoneNumber.trim());
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        
        console.log(chalk.green("Your Pairing Code:"), chalk.bold.white(code));
        console.log(chalk.gray("→ Enter this code in WhatsApp → Linked Devices → Link with phone number"));
    }

    // ─── Rest of your code remains the same ───
    store.bind(Dxz.ev);

Dxz.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!Dxz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(Dxz, mek, store)
require("./wa")(Dxz, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

Dxz.sendContact = async (jid, kon, desk = "Developer Bot", quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: namaown,
  vcard: 'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    `N:;${namaown};;;\n` +
    `FN:${namaown}\n` +
    'ORG:null\n' +
    'TITLE:\n' +
    `item1.TEL;waid=${i}:${i}\n` +
    'item1.X-ABLabel:Ponsel\n' +
    `X-WA-BIZ-DESCRIPTION:${desk}\n` +
    `X-WA-BIZ-NAME:${namaown}\n` +
    'END:VCARD'
})
}
Dxz.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
}
    
Dxz.ev.on('call', async (user) => {
if (!global.anticall) return
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await Dxz.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Sorry, I’m going to block you because the bot owner has enabled the *Anticall* feature.\nIf it was an accident, please contact the owner immediately to lift this block.`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {showAdAttribution: true, thumbnail: fs.readFileSync("./media/warning.jpg"), title: "｢ CALL DETECTED ｣ ❤️‍🩹", previewType: "PHOTO"}}}, {quoted: null})
Dxz.sendContact(ff.from, [owner], "Developer WhatsApp Bot", sendcall)
await sleep(10000)
await Dxz.updateBlockStatus(ff.from, "block")
}}
}})
    
Dxz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

Dxz.getName = (jid, withoutContact= false) => {
id = Dxz.decodeJid(jid)
withoutContact = Dxz.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = Dxz.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === Dxz.decodeJid(Dxz.user.id) ?
Dxz.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

Dxz.public = true

Dxz.serializeM = (m) => smsg(Dxz, m, store);

// ~~~~~ Checking Connection ~~~~~
Dxz.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    // Theme colors (defined once)
    const info      = chalk.cyan.bold;
    const success   = chalk.green.bold;
    const warn      = chalk.yellow.bold;
    const error     = chalk.red.bold;
    const dim       = chalk.gray;
    const highlight = chalk.magentaBright;

    if (connection === 'close') {
        // Safely get status code (protect against undefined error)
        const boom = new Boom(lastDisconnect?.error);
        const statusCode = boom?.output?.statusCode ?? null;
        const reasonName = DisconnectReason[statusCode] || 'UNKNOWN';

        console.log(
            error('❌ Connection lost'),
            dim('→'),
            warn(reasonName),
            dim(`(${statusCode ?? '??'})`)
        );

        // ─── Cases where we should automatically try to reconnect ───
        if ([
            DisconnectReason.badSession,
            DisconnectReason.connectionClosed,
            DisconnectReason.connectionLost,
            DisconnectReason.connectionReplaced,
            DisconnectReason.restartRequired,
            DisconnectReason.timedOut,
        ].includes(statusCode)) {

            console.log(warn('↻ Reconnecting in 3 seconds...'));
            setTimeout(() => {
                console.log(warn('↻ Reconnect attempt starting...'));
                StartDxzArchive();
            }, 3000); // small delay helps stability

        }
        // ─── Logged out case ───
        else if (statusCode === DisconnectReason.loggedOut) {
            console.log(
                error('🚫 SESSION LOGGED OUT'),
                dim('→ Delete the "session" folder and restart the bot to pair again.')
            );
            console.log(warn('Bot will NOT auto-reconnect in this state.'));
            // Optional: you can add fs.rmSync('./session', { recursive: true, force: true }) if you want auto-clean
            // But most people prefer manual control here
        }
        // ─── Everything else = serious / unknown issue ───
        else {
            console.log(
                error('💥 CRITICAL DISCONNECT'),
                dim('| Reason:'),
                error(`${statusCode ?? '??'} | ${reasonName}`)
            );
            console.log(warn('Bot is stopping. Restart manually after checking logs/network.'));
            Dxz.end(`Critical disconnect → ${statusCode ?? 'unknown'} | ${reasonName}`);
        }
    }

    // ─── Successfully connected ───
    else if (connection === 'open') {
        const jid = Dxz.user?.id;
        const number = jid?.split(':')?.[0] || '—';

        // Fancy box
        console.log(success('╔════════════════════════════════════════════╗'));
        console.log(success('║          CONNECTED SUCCESSFULLY            ║'));
        console.log(success('╚════════════════════════════════════════════╝'));

        console.log(info('• Connected as    : ') + highlight(`+${number}`));
        console.log(info('• Bot name        : ') + highlight(Dxz.user?.name || '—'));
        console.log(info('• Connected at    : ') + dim(new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })));
        console.log('');

        // Self notification message
        const teksnotif = `
╭──❍˚｡🌐₊˚⊹
│ 𓂃 💫 *DanuXxxii Botz* ᯓ★
│ ✦ Connected as: 『 +${number} 』
│ 🧠 Status     : Active & Ready to Serve
│ ⌗ Started at  : ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' })}
╰─────⌲ system online ·˚₊
        `.trim();

        Dxz.sendMessage(Dxz.user.id, { text: teksnotif })
            .then(() => {
                console.log(success('✓ Self-notification sent to owner'));
            })
            .catch(err => {
                console.log(
                    warn('⚠ Failed to send self-notification'),
                    dim('→'),
                    err.message || err
                );
            });
    }
});

//~~~~~Saving Session~~~~~//
Dxz.ev.on('creds.update', saveCreds)

Dxz.sendText = (jid, text, quoted = '', options) => Dxz.sendMessage(jid, { text: text, ...options }, { quoted })

Dxz.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

return Dxz
}

StartDxzArchive()

function smsg(Dxz, m, store) {
    if (!m) return m

    let M = proto.WebMessageInfo

    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id?.startsWith('BAE5') && m.id?.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat?.endsWith('@g.us')
        m.sender = Dxz.decodeJid(
            m.fromMe && Dxz.user.id ||
            m.participant ||
            m.key.participant ||
            m.chat ||
            ''
        )
        if (m.isGroup) m.participant = Dxz.decodeJid(m.key.participant) || ''
    }

    if (m.message) {
        m.mtype = getContentType(m.message)

        // Extract inner message for viewOnce
        m.msg =
            m.mtype === 'viewOnceMessage'
                ? m.message[m.mtype]?.message?.[getContentType(m.message[m.mtype]?.message)]
                : m.message[m.mtype]

        // Safe body extraction (this is the main crash fix)
        m.body =
            m.message?.conversation ||
            m.msg?.caption ||
            m.msg?.text ||
            m.msg?.description ||
            m.msg?.hydratedTemplate?.hydratedContentText ||           // template messages
            m.msg?.extendedTextMessage?.text ||
            (m.mtype === 'listResponseMessage' && m.msg?.singleSelectReply?.selectedRowId) ||
            (m.mtype === 'buttonsResponseMessage' && m.msg?.selectedButtonId) ||
            (m.mtype === 'templateButtonReplyMessage' && m.msg?.selectedId) ||
            (m.mtype === 'interactiveResponseMessage' && m.msg?.body?.text) ||
            (m.mtype === 'viewOnceMessage' && m.msg?.caption) ||
            m.text ||
            ''

        let quoted = m.quoted = m.msg?.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []

        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]

            // Handle productMessage nesting (rare)
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted)
                m.quoted = m.quoted[type]
            }

            // If quoted is still string → normalize
            if (typeof m.quoted === 'string') {
                m.quoted = { text: m.quoted }
            }

            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo?.stanzaId
            m.quoted.chat = m.msg.contextInfo?.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id?.startsWith('BAE5') && m.quoted.id?.length === 16
            m.quoted.sender = Dxz.decodeJid(m.msg.contextInfo?.participant)
            m.quoted.fromMe = m.quoted.sender === Dxz.decodeJid(Dxz.user.id)

            // Safe quoted text
            m.quoted.text =
                m.quoted?.text ||
                m.quoted?.caption ||
                m.quoted?.conversation ||
                m.quoted?.contentText ||
                m.quoted?.selectedDisplayText ||
                m.quoted?.title ||
                m.quoted?.description ||
                m.quoted?.hydratedTemplate?.hydratedContentText ||
                ''

            m.quoted.mentionedJid = m.msg.contextInfo?.mentionedJid || []

            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted?.id) return false
                // Note: 'conn' is not defined here → you probably need to pass Dxz or rename
                let q = await store.loadMessage(m.chat, m.quoted.id)
                return smsg(Dxz, q, store)   // recursive call with same smsg
            }

            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            m.quoted.delete = () => Dxz.sendMessage(m.quoted.chat, { delete: vM.key })
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
                Dxz.copyNForward(jid, vM, forceForward, options)
            m.quoted.download = () => Dxz.downloadMediaMessage(m.quoted)
        }
    }

    if (m.msg?.url) m.download = () => Dxz.downloadMediaMessage(m.msg)

    // Another safe text fallback
    m.text =
        m.msg?.text ||
        m.msg?.caption ||
        m.message?.conversation ||
        m.msg?.contentText ||
        m.msg?.selectedDisplayText ||
        m.msg?.title ||
        ''

    m.reply = (text, chatId = m.chat, options = {}) =>
        Buffer.isBuffer(text)
            ? Dxz.sendMedia(chatId, text, 'file', '', m, { ...options })
            : Dxz.sendText(chatId, text, m, { ...options })

    m.copy = () => smsg(Dxz, M.fromObject(M.toObject(m)), store)

    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
        Dxz.copyNForward(jid, m, forceForward, options)

    return m
}

//~~~~~Status Updated~~~~~//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
