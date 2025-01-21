document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentPosition = 0;
    const cardWidth = 340; // Ширина карточки

    let maxPosition = 1700; // Изначальное значение maxPosition

    let containerWidth = container.parentElement.offsetWidth;
    let visibleCards = Math.floor(containerWidth / cardWidth);

    // Функция для изменения maxPosition в зависимости от ширины устройства
    function updateMaxPosition() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1920) {
            maxPosition = 500;
        } else if (screenWidth <= 1920 && screenWidth > 1440) {
            maxPosition = 680;
        } else if (screenWidth == 1440) {
            maxPosition = 1000;
        } else if (screenWidth <= 1024 && screenWidth > 768) {
            maxPosition = 1310;
        }
        else if (screenWidth >= 768) {
            maxPosition = 1500;
        } else {
            maxPosition = 1700; // Если меньше 768, значение maxPosition не меняется
        }
    }

    // Функция для скрытия кнопок в зависимости от ширины экрана
    function handleButtonVisibility() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            updateButtons();
        }
    }

    function updateButtons() {
        prevBtn.style.display = currentPosition <= 0 ? 'none' : 'block';
        nextBtn.style.display = currentPosition >= maxPosition ? 'none' : 'block';
    }

    function handleResize() {
        containerWidth = container.parentElement.offsetWidth;
        visibleCards = Math.floor(containerWidth / cardWidth);

        updateMaxPosition(); // Обновляем maxPosition при изменении размера экрана

        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
            container.style.transform = `translateX(-${currentPosition}px)`;
        }

        handleButtonVisibility();
    }

    prevBtn.addEventListener('click', () => {
        currentPosition = Math.max(currentPosition - cardWidth, 0);
        container.style.transform = `translateX(-${currentPosition}px)`;
        updateButtons();
    });

    nextBtn.addEventListener('click', () => {
        currentPosition = Math.min(currentPosition + cardWidth, maxPosition);
        container.style.transform = `translateX(-${currentPosition}px)`;
        updateButtons();
    });

    window.addEventListener('resize', handleResize);
    handleResize();

    // Сенсорное управление для мобильных устройств
    let startX = 0;

    container.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    container.addEventListener('touchmove', (event) => {
        const moveX = event.touches[0].clientX;
        const diffX = startX - moveX;
        // Ограничиваем движение в пределах maxPosition
        let newPosition = currentPosition + diffX;
        newPosition = Math.max(0, Math.min(newPosition, maxPosition));
        container.style.transform = `translateX(-${newPosition}px)`;
    });

    container.addEventListener('touchend', (event) => {
        const moveX = event.changedTouches[0].clientX;
        const diffX = startX - moveX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Сдвигаем вправо
                currentPosition = Math.min(currentPosition + cardWidth, maxPosition);
            } else {
                // Сдвигаем влево
                currentPosition = Math.max(currentPosition - cardWidth, 0);
            }
        }
        container.style.transform = `translateX(-${currentPosition}px)`;
        handleButtonVisibility();
    });
});
const form = document.getElementById('testForm');
const submitButton = document.getElementById('submitButton');

// Enable/disable submit button based on form validation
form.addEventListener('change', function () {
    const questions = document.querySelectorAll('.question');
    let allAnswered = true;

    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        const isAnswered = Array.from(inputs).some(input => input.checked);
        if (!isAnswered) {
            allAnswered = false;
        }
    });

    submitButton.disabled = !allAnswered;
});

// Находим все кнопки для раскрытия подменю
const submenuTogglers = document.querySelectorAll(".submenu-toggler");

submenuTogglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке
        // Находим текущее подменю
        const submenu = toggler.closest("li").querySelector("ul");

        // Переключаем отображение подменю
        submenu.classList.toggle("hidden");

        // Добавляем/убираем класс для поворота стрелки
        toggler.classList.toggle("rotate-180");
    });
});
// Calculate score and show the result
submitButton.addEventListener('click', function () {
    const formData = new FormData(form);
    let score = 0;

    // Calculate total score
    for (let [key, value] of formData.entries()) {
        score += parseInt(value, 10);
    }
    // Display score and advice
    document.getElementById('score').textContent = `Общий балл: ${score}`;
    const adviceElement = document.getElementById('advice');

    if (score < 7) {
        adviceElement.textContent = "У вас нет риска развития диабета 2 типа. Ведите здоровый образ жизни: правильно питайтесь, занимайтесь физическими упражнениями и избегайте вредных привычек.";
    } else if (score <= 11) {
        adviceElement.textContent = "У вас небольшой риск развития диабета. Регулярно проверяйте уровень сахара в крови, занимайтесь физическими упражнениями и исключите вредные продукты из рациона.";
    } else if (score <= 14) {
        adviceElement.textContent = "Вы относитесь к группе среднего риска. Обратитесь в эндокринологический диспансер, регулярно проверяйте уровень сахара в крови и ведите здоровый образ жизни.";
    } else if (score <= 20) {
        adviceElement.textContent = "Серьёзное состояние! Вы в группе высокого риска. Немедленно обратитесь к эндокринологу для обследования и лечения.";
    } else {
        adviceElement.textContent = "У вас уже диагностирован диабет 2 типа. Пройдите лечение и обучение в специализированном медицинском учреждении.";
    }

    document.getElementById('result').classList.remove('hidden');
});
document.getElementById("menu-button").onclick = function() {
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("menu-425").classList.remove('hidden')
    document.getElementById("menu-425").classList.add('absolute', 'z-[99]', 'h-screen', "top-0")
}
document.getElementById("menu-default").onclick = function() {
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
