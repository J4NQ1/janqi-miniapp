let totalCalories = 0;
let totalProtein = 0;
let totalFats = 0;
let totalCarbs = 0;

function updateDisplay() {
  document.getElementById('calories').innerText = totalCalories;
  document.getElementById('protein').innerText = totalProtein;
  document.getElementById('fats').innerText = totalFats;
  document.getElementById('carbs').innerText = totalCarbs;

  let progress = Math.min((totalCalories / 2500) * 100, 100);
  document.getElementById('progress').style.width = `${progress}%`;
}

// Тестове додавання продукту
function openAddProduct() {
  const calories = prompt("Введи кількість калорій:");
  const protein = prompt("Введи кількість білків (г):");
  const fats = prompt("Введи кількість жирів (г):");
  const carbs = prompt("Введи кількість вуглеводів (г):");

  totalCalories += Number(calories);
  totalProtein += Number(protein);
  totalFats += Number(fats);
  totalCarbs += Number(carbs);

  updateDisplay();
}

function showWeekStats() {
  alert("Тут буде статистика за тиждень (ще допишемо)!");
}

function showDayStats() {
  alert("Тут буде перегляд по днях (ще допишемо)!");
}

// Сканер
function openScanner() {
  const scannerElement = document.getElementById('scanner');
  scannerElement.classList.remove('hidden');
  scannerElement.innerHTML = "";

  const html5QrCode = new Html5Qrcode("scanner");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        scannedCode => {
          html5QrCode.stop();
          scannerElement.classList.add('hidden');
          alert(`Відскановано: ${scannedCode}`);
          // Тут можна автоматично перейти до додавання продукту
          openAddProduct();
        },
        error => {
          console.warn(`Помилка сканування: ${error}`);
        }
      );
    }
  }).catch(err => {
    console.error(`Помилка доступу до камери: ${err}`);
  });
}

// Завантаження
updateDisplay();
