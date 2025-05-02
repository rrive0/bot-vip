<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>VIP สมัคร</title>
  <link rel="shortcut icon" href="https://img5.pic.in.th/file/secure-sv1/51_20250419035319.png" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="particles-js"></div>
<style>
    body {
      margin: 0;
      height: 100vh;
      background: radial-gradient(circle at 50% 50%, #000000 0%, #1a1a1a 60%, #ffd700 100%); /* พื้นหลังมีการไล่สีจากดำไปทอง */
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Arial', sans-serif;
      overflow: hidden;
      position: relative;
      background-size: 300% 300%;
      animation: gradientMove 15s ease infinite; /* การเคลื่อนไหวของพื้นหลัง */
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

  .lightbox {
    display: none;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
  }

  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    border: 4px solid #ffd700;
    border-radius: 15px;
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
  }

  /* Modal Announcement Styles */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
background-color: #2d2d2d;
color: white;
padding: 20px; /* ลด padding จาก 30px เหลือ 20px */
border-radius: 15px;
text-align: center;
max-width: 400px; /* ลดจาก 600px เหลือ 400px */
width: 90%; /* ยังคง responsive */
box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
}



  .modal h2 {
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
    color: #ffd700;
  }

  .modal p {
    margin: 10px 0;
    font-size: 0.8em;
    line-height: 1; /* เพิ่มระยะห่างระหว่างบรรทัด */
    text-align: left; /* จัดข้อความให้เริ่มจากซ้าย */
    white-space: pre-line; /* ทำให้สามารถใช้การขึ้นบรรทัดใหม่ในข้อความ */
    word-wrap: break-word; /* ให้ข้อความยาวๆ ไม่ล้นออกจากขอบกล่อง */
  }

  .modal img {
    max-width: 100%;
    height: auto;
    margin: 20px 0;
    border-radius: 10px;
    border: 3px solid #ffd700;
  }

  .close-btn {
    background-color: #ffd700;
    color: #000;
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }

  .close-btn:hover {
    background-color: #ffcc00;
  }
</style>
  <div class="container">
    <h1>ส่งข้อมูล VIP</h1>
    <form id="vipForm">
      <label for="discordName">ชื่อ Discord</label>
      <input type="text" id="discordName" required>

      <label for="image">อัปโหลดรูปสลิป (.jpg .png)</label>
      <input type="file" id="image" accept="image/*" required>

      <button type="submit">ส่งข้อมูล</button>
    </form>
    <div id="preview"></div>
  </div>
  <div class="lightbox" id="lightbox">
    <img id="lightbox-img" src="" alt="Full Image">
  </div>

  <!-- First Modal Announcement -->
  <div class="modal" id="announcement-modal-1">
    <div class="modal-content">
      <h2>วิธีการส่งรูปสลีปเงิน</h2>
      <p>1. กดที่โปรไฟล์ตัวเอง0</p>
      <img src="https://img5.pic.in.th/file/secure-sv1/v2a2820251f2af90b3.png" alt="Announcement Image 1">
      <button class="close-btn" id="close-modal-1">ปิดข่้อความ</button>
    </div>
  </div>
  <script>
  document.getElementById('vipForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const discordName = document.getElementById('discordName').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('discordName', discordName);
    formData.append('image', image);

    try {
      const response = await fetch('https://bot-vip-de3u.onrender.com/vip', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('✅ ส่งข้อมูลสำเร็จแล้ว!');
        document.getElementById('vipForm').reset();
      } else {
        alert('❌ เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch (err) {
      console.error(err);
      alert('❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  });
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll(".qr-box img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    // Modal Announcement 1 functionality
    const announcementModal1 = document.getElementById("announcement-modal-1");
    const closeModalButton1 = document.getElementById("close-modal-1");

    // Modal Announcement 2 functionality
    const announcementModal2 = document.getElementById("announcement-modal-2");
    const closeModalButton2 = document.getElementById("close-modal-2");

    // Show both modals on page load
    window.onload = function() {
      setTimeout(() => {
        announcementModal1.style.display = "flex";
        announcementModal2.style.display = "flex";
      }, 500);  // Delay to make the modals appear after 500ms
    };

    // Close the first modal when the close button is clicked
    closeModalButton1.addEventListener("click", () => {
      announcementModal1.style.display = "none";
    });

    // Close the second modal when the close button is clicked
    closeModalButton2.addEventListener("click", () => {
      announcementModal2.style.display = "none";
    });
  </script>
  <!-- scripts -->
  <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
  <script src="particles-config.js"></script>
  <script src="script.js"></script>
</body>
</html>
