const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // เพิ่มการใช้งาน dotenv เพื่อโหลดค่าตัวแปรจาก .env

const app = express();
const port = 3000;

// เชื่อมต่อ Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,  // เพิ่ม intent สำหรับ GuildMessages หากต้องการเข้าถึงข้อความ
  ],
});

client.once('ready', () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

// ใช้ token จาก GitHub Secrets (ผ่าน environment variables)
client.login(process.env.DISCORD_BOT_TOKEN) // ใช้ token ที่ตั้งใน .env หรือ GitHub Secrets

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
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    await guild.members.fetch(); // โหลดสมาชิกทั้งหมด

    const member = guild.members.cache.find(
      m => m.user.tag === discordName
    );

    if (!member) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้นี้ในเซิร์ฟเวอร์' });
    }

    await member.roles.add(process.env.ROLE_ID); // แอดยศ
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
