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
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitBtn = document.getElementById("submitBtn");
    const inputs = document.querySelectorAll(".input-field");
    const radioButtons = document.querySelectorAll("input[name='SD']");
    const errorMessage = document.querySelector(".error-message");

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Остановить стандартную отправку формы

        let isValid = true;

        // Проверка всех текстовых полей
        inputs.forEach(input => {
            let errorSpan = input.nextElementSibling;
            if (!errorSpan || input.type === "radio") return; // Пропускаем радиокнопки

            if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                errorSpan.textContent = "Заполните это поле!";
                errorSpan.style.color = "red";
                errorSpan.style.fontSize = "14px";
                isValid = false;
            } else {
                input.style.border = "1px solid #A1A1A1";
                errorSpan.textContent = "";
            }
        });

        // Проверка радиокнопок
        let checked = Array.from(radioButtons).some(radio => radio.checked);
        if (!checked) {
            errorMessage.classList.remove("hidden");
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "14px";
            isValid = false;
        } else {
            errorMessage.classList.add("hidden");
        }

        if (!isValid) return; // Если есть ошибки - не отправляем форму

        // Данные из формы
        let formData = {
            Имя: inputs[0].value,
            Фамилия: inputs[1].value,
            Отчество: inputs[2].value,
            "Место Учёбы/Работы": inputs[3].value,
            "Номер телефона": inputs[4].value,
            "Серия и Номер Паспорта": inputs[5].value,
            "Кем Выдан": inputs[6].value,
            "Когда Выдан": inputs[7].value,
            "СД": checked ? document.querySelector("input[name='SD']:checked").value : "Не указано"
        };

        if (formData["СД"] == "one") {
            formData["СД"] = "Первый тип";
        } else if (formData["СД"] == "two") {
            formData["СД"] = "Второй тип";
        } else if (formData["СД"] == "no") {
            formData["СД"] = "Не болеет Сахарным Диабетом";
        }

        // Отправляем данные
        try {
            let response = await fetch("https://thebigproject-production.up.railway.app/api/sendData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            

            if (!response.ok) throw new Error("Ошибка при отправке данных");

            console.log("✅ Данные успешно сохранены");

            alert("✅ Заявка успешно отправлена!");

            // Очистка формы
            inputs.forEach(input => input.value = "");
            radioButtons.forEach(radio => radio.checked = false);
        } catch (error) {
            console.error("❌ Ошибка:", error);
            alert("❌ Ошибка при отправке данных. Попробуйте снова.");
        }
    });

    // Убираем ошибку при вводе данных
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let errorSpan = this.nextElementSibling;
            if (!errorSpan || this.type === "radio") return;
            this.style.border = "1px solid #A1A1A1";
            errorSpan.textContent = "";
        });
    });

    // Убираем ошибку при выборе радиокнопок
    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            errorMessage.classList.add("hidden");
        });
    });
});
