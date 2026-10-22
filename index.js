/*
Base Whatsapp Bot  -  v1.0.1
By DanuZz
*/
require('./config');

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const pino = require('pino');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const { Boom } = require('@hapi/boom');

const SESSION_DIR = path.join(__dirname, 'session');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ask = (q) =>
    new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(q, (a) => { rl.close(); resolve(a); });
    });

// '@dnuzi/baileys' is loaded with dynamic import() so it works whether it is ESM or CommonJS
let B;
async function loadBail() {
    const ns = await import('@dnuzi/baileys');

    // Works for both module shapes:
    //  - CommonJS build : ns.default = module.exports (an object), ns.default.default = makeWASocket
    //  - ESM build      : ns.default = makeWASocket (a function), named exports on ns
    const cjs = ns.default && typeof ns.default === 'object' ? ns.default : {};
    const pick = (name) => ns[name] ?? cjs[name];

    let makeWASocket = typeof ns.default === 'function' ? ns.default : cjs.default;
    if (typeof makeWASocket !== 'function') makeWASocket = pick('makeWASocket');
    if (typeof makeWASocket !== 'function' && cjs.default && typeof cjs.default.default === 'function') {
        makeWASocket = cjs.default.default;
    }
    if (typeof makeWASocket !== 'function') {
        throw new Error('Could not find makeWASocket in "@dnuzi/baileys". Exports: ' + Object.keys({ ...cjs, ...ns }).join(', '));
    }

    B = {
        makeWASocket,
        useMultiFileAuthState: pick('useMultiFileAuthState'),
        makeCacheableSignalKeyStore: pick('makeCacheableSignalKeyStore'),
        DisconnectReason: pick('DisconnectReason'),
        fetchLatestBaileysVersion: pick('fetchLatestBaileysVersion'),
        getContentType: pick('getContentType'),
        jidNormalizedUser: pick('jidNormalizedUser'),
        jidDecode: pick('jidDecode'),
    };
}

// ───────────── message serializer (small & simple) ─────────────
function smsg(conn, mek) {
    const m = mek;
    m.chat = m.key.remoteJid;
    m.fromMe = !!m.key.fromMe;
    m.isGroup = m.chat.endsWith('@g.us');
    m.sender = m.fromMe
        ? B.jidNormalizedUser(conn.user.id)
        : (m.isGroup ? (m.key.participantAlt || m.key.participant) : (m.key.remoteJidAlt || m.chat)) || '';

    // unwrap ephemeral / view-once wrappers
    let msg = m.message;
    for (let i = 0; i < 3; i++) {
        const t = B.getContentType(msg);
        if (t === 'ephemeralMessage' || t === 'viewOnceMessage' || t === 'viewOnceMessageV2' || t === 'documentWithCaptionMessage') {
            msg = msg[t].message;
        } else break;
    }
    m.message = msg;
    m.mtype = B.getContentType(msg);
    const c = msg[m.mtype];

    m.text =
        (m.mtype === 'conversation' && msg.conversation) ||
        (m.mtype === 'extendedTextMessage' && c.text) ||
        (['imageMessage', 'videoMessage', 'documentMessage'].includes(m.mtype) && c.caption) ||
        (m.mtype === 'buttonsResponseMessage' && c.selectedButtonId) ||
        (m.mtype === 'templateButtonReplyMessage' && c.selectedId) ||
        (m.mtype === 'listResponseMessage' && c.singleSelectReply?.selectedRowId) ||
        '';

    m.reply = (text, opts = {}) => conn.sendMessage(m.chat, { text, ...opts }, { quoted: m });
    return m;
}

// ───────────── main ─────────────
async function start() {
    fs.mkdirSync(SESSION_DIR, { recursive: true });

    const { state, saveCreds } = await B.useMultiFileAuthState(SESSION_DIR);
    const logger = pino({ level: 'silent' });

    let version;
    try { ({ version } = await B.fetchLatestBaileysVersion()); } catch {}

    const conn = B.makeWASocket({
        ...(version ? { version } : {}),
        logger,
        auth: {
            creds: state.creds,
            keys: B.makeCacheableSignalKeyStore(state.keys, logger),
        },
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        markOnlineOnConnect: true,
        syncFullHistory: false,
        generateHighQualityLinkPreview: true,
    });

    conn.ev.on('creds.update', saveCreds);

    const mode = String(global.login_mode || 'qr').toLowerCase();
    let pairRequested = false;

    // ── login: pair-code mode ──
    async function requestPair() {
        if (pairRequested || conn.authState.creds.registered) return;
        pairRequested = true;
        let number = String(global.bot || '').replace(/[^0-9]/g, '');
        if (!number || /x/i.test(String(global.bot))) {
            number = (await ask(chalk.cyan('Enter bot number with country code (e.g. 94712345678):\n'))).replace(/[^0-9]/g, '');
        }
        try {
            await sleep(1500);
            let code = await conn.requestPairingCode(number);
            code = code?.match(/.{1,4}/g)?.join('-') || code;
            console.log(chalk.green('\nYour Pairing Code: ') + chalk.bold.white(code));
            console.log(chalk.gray('→ WhatsApp → Linked Devices → Link with phone number → enter the code\n'));
        } catch (e) {
            console.log(chalk.red('Failed to get pairing code:'), e?.message || e);
            pairRequested = false;
        }
    }

    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // ── login: QR mode ──
        if (qr) {
            if (mode === 'pair') await requestPair();
            else {
                console.log(chalk.yellow('\nScan this QR → WhatsApp → Linked Devices → Link a device\n'));
                qrcode.generate(qr, { small: true });
            }
        }

        if (connection === 'open') {
            const num = (conn.user?.id || '').split(':')[0].split('@')[0];
            console.log(chalk.green('\n╔════════════════════════════════════════╗'));
            console.log(chalk.green('║        CONNECTED SUCCESSFULLY ✅        ║'));
            console.log(chalk.green('╚════════════════════════════════════════╝'));
            console.log(chalk.cyan('• Bot      : ') + chalk.white(global.namabot));
            console.log(chalk.cyan('• Number   : ') + chalk.white('+' + num));
            console.log(chalk.cyan('• Version  : ') + chalk.white('v' + global.version));
            console.log(chalk.cyan('• Prefix   : ') + chalk.white(global.prefix) + '\n');

            conn.sendMessage(B.jidNormalizedUser(conn.user.id), {
                text: `✅ *${global.namabot}* connected!\n🔖 Version: v${global.version}\n⌗ Prefix: ${global.prefix}\n\n${global.footer}`,
            }).catch(() => {});
        }

        if (connection === 'close') {
            const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (code === B.DisconnectReason.loggedOut) {
                console.log(chalk.red('Logged out. Delete the "session" folder and restart to log in again.'));
                return;
            }
            console.log(chalk.yellow(`Connection closed (${code ?? 'unknown'}) → reconnecting in 3s...`));
            try { conn.ev.removeAllListeners(); } catch {}
            setTimeout(() => start().catch((e) => console.error('Reconnect failed:', e)), 3000);
        }
    });

    // ── messages → wa.js (case handler) ──
    conn.ev.on('messages.upsert', async ({ messages, type }) => {
        try {
            if (type !== 'notify') return;
            const mek = messages[0];
            if (!mek?.message || mek.key.remoteJid === 'status@broadcast') return;
            const m = smsg(conn, mek);
            require('./wa')(conn, m);
        } catch (e) {
            console.log(e);
        }
    });

    return conn;
}

process.on('uncaughtException', (e) => console.error('Uncaught exception:', e));
process.on('unhandledRejection', (e) => console.error('Unhandled rejection:', e));

(async () => {
    console.log(chalk.cyan(`
╭──────────────────────────────╮
│   Base-Dxz  •  v${global.version}          │
│   by DanuZz                  │
│   login mode: ${String(global.login_mode).toUpperCase().padEnd(14)} │
╰──────────────────────────────╯
`));
    await loadBail();
    await start();
})();