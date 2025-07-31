# 📦 Sari-Sari Barcode Item List Manager

A simple, mobile-friendly web app for managing inventory using manual input and barcode scanning. Built with **vanilla HTML, CSS, and JavaScript**, this app is perfect for sari-sari stores, kiosks, or any small retail business that wants to digitize item tracking.

🌐 **Live Demo**: [https://sarisari-barcode.netlify.app](https://sarisari-barcode.netlify.app)

---

## ✨ Features

- ✅ Add items manually with name, price, stock, barcode, and image
- 📷 Scan barcodes via webcam using [ZXing](https://github.com/zxing-js/library)
- 🔍 Find items by barcode
- 🗃️ View and manage item list
- ✏️ Edit or delete existing items
- 💾 Saves data locally using `localStorage`
- 📱 **Mobile-friendly** design with responsive modals and video scanner

---

## 🚀 Getting Started

To run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sarisari-barcode-manager.git
   cd sarisari-barcode-manager
   ```

2. **Open `index.html` in your browser**
   ```bash
   open index.html
   # or double-click it
   ```

✅ No build tools, frameworks, or dependencies needed!

---

## 📁 Project Structure

```
├── index.html        # Main HTML file
├── style.css         # Styling
├── main.js           # App logic (scan, render, save)
├── /docs             # (Optional) Screenshot assets for README
```

---

## 🛠 Built With

- [ZXing JS](https://github.com/zxing-js/library) – Barcode scanner
- HTML5, CSS3, JavaScript (ES6)
- ❤️ Designed to work offline and on mobile

---

## 📲 To-Do / Improvements

- [ ] Edit modal instead of using `prompt()`
- [ ] Export/Import to JSON or CSV
- [ ] Add search by item name
- [ ] Add stock adjustment (+/-) mode
- [ ] Print barcode stickers (future)

---

## 📄 License

MIT – Feel free to use, modify, and share this project.

---

## 🙌 Acknowledgments

Thanks to [ZXing JS](https://github.com/zxing-js/library) and Netlify for hosting.

---

Made with 💻 by Karl Kangleon x ChatGPT 4o
