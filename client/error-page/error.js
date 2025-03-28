document.getElementById("menu-button").onclick = function () {
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("menu-425").classList.remove('hidden')
    document.getElementById("menu-425").classList.add('absolute', 'z-[99]', 'h-screen', "top-0")
}
document.getElementById("menu-default").onclick = function () {
    // Убираем классы, которые делают меню видимым
    document.getElementById("menu-425").classList.remove('absolute', 'z-[99]', 'h-screen', "top-0");
    // Добавляем класс 'hidden', чтобы скрыть меню
    document.getElementById("menu-425").classList.add('hidden');

    // Если нужно, можно также восстановить overflow для body
    document.getElementById("body").style.overflow = "auto"; // Показываем прокрутку
}
document.getElementById("menu-img").addEventListener("click", function () {
    const dropdown = document.getElementById("drop");

    // Переключение классов для видимости
    if (dropdown.classList.contains("opacity-0")) {
        dropdown.classList.remove("opacity-0", "invisible");
        dropdown.classList.add("opacity-100", "visible");
    } else {
        dropdown.classList.add("opacity-0", "invisible");
        dropdown.classList.remove("opacity-100", "visible");
    }
});
document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("drop");
    const button = document.getElementById("menu-img");

    // Проверяем, кликнули ли мы вне кнопки или выпадающего списка
    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
        dropdown.classList.add("opacity-0", "invisible");
        dropdown.classList.remove("opacity-100", "visible");
    }
});
const menuButton = document.getElementById("menu-img");
const menuIcon = menuButton.querySelector("img");

menuButton.addEventListener("click", () => {
    menuIcon.classList.toggle("rotate-180");
});
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
