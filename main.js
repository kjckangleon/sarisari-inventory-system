
// Main logic for barcode scanning + modals + item management
const itemList = document.getElementById('items-ul');
const searchInput = document.getElementById('search-barcode');
const searchResult = document.getElementById('search-result');
const startScanBtn = document.getElementById('start-scan');
const videoElement = document.getElementById('barcode-scanner');
const scanStatus = document.getElementById('scan-status');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const scannedForm = document.getElementById('scanned-form');
const previewModal = document.getElementById('preview-modal');
const previewClose = document.getElementById('preview-close');
const previewDetails = document.getElementById('preview-details');

let items = JSON.parse(localStorage.getItem('items')) || [];
let codeReader;
let scannedBarcode = '';

function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

function renderItems() {
  itemList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''}
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>Price: ₱${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <p>Barcode: ${item.barcode || 'N/A'}</p>
      </div>
      <button class="edit-btn" onclick="editItem(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
    `;
    itemList.appendChild(li);
  });
}

window.deleteItem = function(index) {
  if (confirm('Are you sure you want to delete this item?')) {
    items.splice(index, 1);
    saveItems();
    renderItems();
  }
};

window.editItem = function(index) {
  const item = items[index];
  const name = prompt('Edit Name:', item.name);
  const price = prompt('Edit Price:', item.price);
  const stock = prompt('Edit Stock:', item.stock);
  const barcode = prompt('Edit Barcode:', item.barcode);
  if (name && price && stock) {
    items[index] = { ...item, name, price: parseFloat(price), stock: parseInt(stock), barcode };
    saveItems();
    renderItems();
  }
};

document.getElementById('manual-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('manual-name').value.trim();
  const price = parseFloat(document.getElementById('manual-price').value);
  const stock = parseInt(document.getElementById('manual-stock').value);
  const barcode = document.getElementById('manual-code').value.trim();
  const imageFile = document.getElementById('manual-image').files[0];
  let imageUrl = '';

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      imageUrl = evt.target.result;
      addItem({ name, price, stock, barcode, image: imageUrl });
    };
    reader.readAsDataURL(imageFile);
  } else {
    addItem({ name, price, stock, barcode, image: '' });
  }

  e.target.reset();
});

function addItem(item) {
  items.push(item);
  saveItems();
  renderItems();
}

async function startCameraScan() {
  scanStatus.textContent = 'Requesting camera access...';
  videoElement.classList.remove('hidden');

  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    const reader = new ZXing.BrowserMultiFormatReader();
    const devices = await reader.getVideoInputDevices();
    const backCamera = devices.find(device => device.label.toLowerCase().includes('back')) || devices[0];
    if (!backCamera) throw new Error('No video input devices found');

    codeReader = reader;
    await codeReader.decodeFromVideoDevice(backCamera.deviceId, videoElement, (result, err) => {
      if (result) {
        scannedBarcode = result.getText();
        const found = items.find(i => i.barcode === scannedBarcode);

        codeReader.reset();
        videoElement.classList.add('hidden');
        scanStatus.textContent = '✅ Scan complete';

        if (!found) {
          document.getElementById('scanned-barcode').value = scannedBarcode;
          modal.classList.remove('hidden');
        } else {
          previewDetails.innerHTML = `
            <p><strong>Name:</strong> ${found.name}</p>
            <p><strong>Price:</strong> ₱${found.price}</p>
            <p><strong>Stock:</strong> ${found.stock}</p>
            <p><strong>Barcode:</strong> ${found.barcode}</p>
            ${found.image ? `<img src="${found.image}" style="width: 100px; margin-top: 10px;" />` : ''}
          `;
          previewModal.classList.remove('hidden');
        }
      }
    });

    scanStatus.textContent = 'Scanning...';
  } catch (err) {
    scanStatus.textContent = `❌ Camera access error: ${err.message}`;
    console.error('Camera access error:', err);
  }
}

scannedForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('scanned-name').value.trim();
  const price = parseFloat(document.getElementById('scanned-price').value);
  const stock = parseInt(document.getElementById('scanned-stock').value);
  const barcode = document.getElementById('scanned-barcode').value;

  addItem({ name, price, stock, barcode, image: '' });
  modal.classList.add('hidden');
  scannedForm.reset();
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

previewClose.addEventListener('click', () => {
  previewModal.classList.add('hidden');
});

searchInput.addEventListener('input', function () {
  const query = searchInput.value.trim();
  if (query === '') {
    searchResult.innerHTML = '';
    return;
  }
  const item = items.find(i => i.barcode === query);
  if (item) {
    searchResult.innerHTML = `
      <div class="p-4 border rounded bg-green-50">
        <h3>${item.name}</h3>
        <p>Price: ₱${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <p>Barcode: ${item.barcode}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100px; margin-top: 10px;" />` : ''}
      </div>
    `;
  } else {
    searchResult.innerHTML = '<p style="color: red;">Item not found.</p>';
  }
});

startScanBtn.addEventListener('click', startCameraScan);
renderItems();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
    previewModal.classList.add('hidden');
  }
});

