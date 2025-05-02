const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const app = express();
const port = 3000;

// Discord Bot Token และ Guild ID ให้ใส่ในตัวแปร
const BOT_TOKEN = 'MTM2NzgzODYyNzc2NTI4OTA1Mw.GudP58.3hNf6vU8E3ypHEKTF4LoD5ei5p4iiGbzIVRxMw';
const GUILD_ID = '997205757009330216';
const ROLE_ID = '1266074140738195599';

// เชื่อมต่อ Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

// ใช้ Token ที่ใส่ในตัวแปรโดยตรง
client.login(BOT_TOKEN); // ใส่ token ตรงนี้

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')());

// รับ POST จากฟอร์ม
app.post('/vip', async (req, res) => {
  const { discordName } = req.body;

  if (!discordName) {
    return res.status(400).json({ error: 'Discord name is required' });
  }

  try {
    const guild = await client.guilds.fetch(GUILD_ID); // ใช้ GUILD_ID ตรงนี้
    await guild.members.fetch(); // โหลดสมาชิกทั้งหมด

    const member = guild.members.cache.find(
      m => m.user.tag === discordName
    );

    if (!member) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้นี้ในเซิร์ฟเวอร์' });
    }

    await member.roles.add(ROLE_ID); // แอดยศ
    return res.json({ success: true, message: `เพิ่มยศให้ ${discordName} เรียบร้อย` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🌐 Server is running on http://localhost:${port}`);
});
