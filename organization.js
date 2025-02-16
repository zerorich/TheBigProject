document.getElementById("menu-button").onclick = function () {
    document.querySelector("body").style.overflow = "hidden"
    document.getElementById("menu-425").classList.remove('hidden')
    document.getElementById("menu-425").classList.add('absolute', 'z-[99]', 'h-screen', "top-0")
}
document.getElementById("menu-default").onclick = function () {
    // Убираем классы, которые делают меню видимым
    document.getElementById("menu-425").classList.remove('absolute', 'z-[99]', 'h-screen', "top-0");
    // Добавляем класс 'hidden', чтобы скрыть меню
    document.getElementById("menu-425").classList.add('hidden');

    // Если нужно, можно также восстановить overflow для body
    document.querySelector("body").style.overflow = "auto"; // Показываем прокрутку
}

document.querySelectorAll(".menu-toggle").forEach((button) => {
    const menuIcon = button.querySelector(".menu-icon");

    button.addEventListener("click", function () {
        const dropdown = button.closest(".menu-item").querySelector(".dropdown-menu");

        // Переключение видимости меню
        if (dropdown.classList.contains("opacity-0")) {
            dropdown.classList.remove("opacity-0", "invisible");
            dropdown.classList.add("opacity-100", "visible");
        } else {
            dropdown.classList.add("opacity-0", "invisible");
            dropdown.classList.remove("opacity-100", "visible");
        }

        // Анимация иконки
        menuIcon.classList.toggle("rotate-180");
    });
});

// Закрытие всех меню при клике вне
document.addEventListener("click", function (e) {
    document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        const menuItem = dropdown.closest(".menu-item");
        const toggleButton = menuItem.querySelector(".menu-toggle");

        if (!dropdown.contains(e.target) && !toggleButton.contains(e.target)) {
            dropdown.classList.add("opacity-0", "invisible");
            dropdown.classList.remove("opacity-100", "visible");

            // Убираем вращение иконки
            const menuIcon = toggleButton.querySelector(".menu-icon");
            menuIcon.classList.remove("rotate-180");
        }
    });
});
document.addEventListener("click", function (e) {
    document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        const menuItem = dropdown.closest(".menu-item");
        const toggleButton = menuItem.querySelector(".menu-toggle");

        // Проверяем, кликнули ли мы вне меню и кнопки
        if (!dropdown.contains(e.target) && !toggleButton.contains(e.target)) {
            // Скрываем дропдаун
            dropdown.classList.add("opacity-0", "invisible");
            dropdown.classList.remove("opacity-100", "visible");

            // Находим иконку и сбрасываем её вращение
            const menuIcon = toggleButton.querySelector(".menu-icon");
            if (menuIcon) {
                menuIcon.classList.remove("rotate-180"); // Возвращаем иконку в исходное положение
            }
        }
    });
});
document.getElementById("submitBtn").addEventListener("click", async function (event) {
    event.preventDefault(); // Остановить стандартную отправку формы

    let isValid = true;
    let inputs = document.querySelectorAll(".input-field");

    // Проверка всех полей
    inputs.forEach(input => {
        let errorSpan = input.nextElementSibling;
        if (input.value.trim() === "") {
            input.style.border = "2px solid red"; // Красная рамка
            errorSpan.textContent = "Заполните это поле!";
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "14px";
            isValid = false;
        } else {
            input.style.border = "1px solid #A1A1A1"; // Вернуть серую рамку
            errorSpan.textContent = "";
        }
    });

    if (!isValid) return; // Если есть ошибки - не отправлять

    // Данные из формы
    let formData = {
        Имя: document.querySelectorAll(".input-field")[0].value,
        Фамилия: document.querySelectorAll(".input-field")[1].value,
        Отчество: document.querySelectorAll(".input-field")[2].value,
        "Место Учёбы/Работы": document.querySelectorAll(".input-field")[3].value,
        "Номер телефона": document.querySelectorAll(".input-field")[4].value,
        "Серия и Номер Паспорта": document.querySelectorAll(".input-field")[5].value,
        "Кем Выдан": document.querySelectorAll(".input-field")[6].value,
        "Когда Выдан": document.querySelectorAll(".input-field")[7].value,
    };

    let message = `📩 *Новая заявка!*\n\n` +
        `👤 *Имя:* ${formData.Имя}\n` +
        `👤 *Фамилия:* ${formData.Фамилия}\n` +
        `👤 *Отчество:* ${formData.Отчество}\n` +
        `🏫 *Место Учёбы/Работы:* ${formData["Место Учёбы/Работы"]}\n` +
        `📞 *Номер телефона:* ${formData["Номер телефона"]}\n` +
        `🆔 *Паспорт:* ${formData["Серия и Номер Паспорта"]}\n` +
        `📌 *Кем Выдан:* ${formData["Кем Выдан"]}\n` +
        `📅 *Когда Выдан:* ${formData["Когда Выдан"]}`;

    let botToken = "7915125873:AAEvXOF43h_OfIVfLFkExxqJt3ixwcL54vY"; // Токен бота
    let chatIds = ["5879096855", "6394479272"]; // Список ID получателей

    let url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Отправляем сообщение каждому получателю
    for (let chatId of chatIds) {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        });
    }

    alert("✅ Заявка успешно отправлена!");
    inputs.forEach(input => input.value = ""); // Очистить поля после успешной отправки
});

// Убираем ошибку при вводе данных
document.querySelectorAll(".input-field").forEach(input => {
    input.addEventListener("input", function () {
        let errorSpan = this.nextElementSibling;
        this.style.border = "1px solid #A1A1A1"; // Вернуть стандартную рамку
        errorSpan.textContent = ""; // Убрать ошибку
    });
});