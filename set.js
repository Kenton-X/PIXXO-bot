const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEtGYjEzeEpyajJJc1JLQzFqYndYZHV1YkM1N2MzZmRrNm8wclNqNS9FUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianB6a0tqTmtqR0x5a1ZzZmp2Smk0UW5vZEViWGwyVVlEY3pwTXV0Tk9Gcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTVRyL1Y4cVc3cHVxcXpYN0tJYzZRdkY3VStrRks5a1hiSEpEUDVOQ1YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0ZE8xOTJsVHo3NWNXVDNEYncrVmlheXl5QXBZcWdhNFpTZWd2amdBWW5jPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNJRTdnM2hETWxVWDVnMkE0OVNVU1pXVEI2TmJmd3VDV2NXbEk0ZFp2R3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImROSzEvd3dMNTVYclhEcXEzRkFjVndCOUU3TUY4aEc0YnptbXZ0Z1dVdzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUs3ZnBDajJuSWhSbDV4SkYrZGhoSC9xNW1ueTdjK3JVNXlxVG8vWFNHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDZNMlpJSVVLaXJJVDd6akNlUEdoSk9CNnhQckIySndoYlVaTit1Uk9oWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdRTkRtOXdWcE9xMk1nZFc5cWJTRVZiZEpSSGZVbXZvL0ZsK0V4TEovRFNBdlByVDFPSXVTSEMvOE9DVnlNK2s4V05sakE5OU5LV1hFeC9WYlBCMUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiIwd2dWaWozTFhPL3ByYnE4NEw1NHRjbHZhOGN3Nm9Jai9hTFJxNGQrQ2RnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2MXpiQnBpalM4NlltRmVtWGFqSEJRIiwicGhvbmVJZCI6IjFhM2Y5NWU0LTg0YTUtNDA4MC04NTU1LWNlNDVlZDBkNDcwOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzQk9NY2xkZEdhWkF3b1M5Z29udG5DR2RpVWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHNtRFFyRU53T092Rkt1L3UwOC9TRzh0a1JZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE5RDlWWDVUIiwibWUiOnsiaWQiOiIyNjM3ODk0MzI5NDA6NjFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0orV3ppVVEvNjZtdWdZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkR3aDNHSXhsWlU3am1FK0NscnhTMDVLNHFCOThSMFpwZ09HQzNuTUE0Z1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkFMMTR6NDFMS3BJdDFsaDQ0bFhSbVNjRFZyRkZDdi9DaG9ZUUwxWUlWZndkcnhlTnUzRUZXZjl0VVpoczM3VEg1Zk1rdG5oVE90TEtPSk1jOUVVTEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3NWFVTTNRNjFMYWJ1Ym1rMm5TSXJEZk0wemlacHpmRmlsZDVMZFFmTnRIc1JrQWNJcFRjcDM4c2RvNVpINlhHK2Voa3pubW1KLzhwMXJCazZyUEJDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTQzMjk0MDo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJROElkeGlNWldWTzQ1aFBncGE4VXRPU3VLZ2ZmRWRHYVlEaGd0NXpBT0lFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyODc2MTczfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DARK-PARD",
    NUMERO_OWNER : process.env.OWNER_NUM || "263789432940",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'PIXXO bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://PIXXO:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/KENTON-X" : "postgresql://PIXXO:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/KENTON-X",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
