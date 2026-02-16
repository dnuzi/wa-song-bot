/*
Base Whatsapp Bot
By DanuZz
 
Site: https://www.movanest.xyz
*/

//~~~~~Setting Global~~~~~//

global.session_id = "DanuXxxii=XxxxxxXxXXxXxXXX" //session id 
global.prefix = '.' // bot prefix
global.owner = ["9476xxxxxx"] // Owner number
global.bot = "9476xxxxxxxx" // Bot number
global.namabot = "Base-Dxz" // Bot name
global.namaown = "DanuZz" // Bot owner

//~~~~~Status Updated~~~~~//
let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
