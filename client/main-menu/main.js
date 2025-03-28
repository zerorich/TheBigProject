document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentPosition = 0;
    let cardWidth = 340; // Ширина карточки

    let maxPosition = 1000; // Изначальное значение maxPosition

    let containerWidth = container.parentElement.offsetWidth;
    let visibleCards = Math.floor(containerWidth / cardWidth);

    // Функция для изменения maxPosition в зависимости от ширины устройства
    function updateMaxPosition() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1920) {
            maxPosition = 0;
        } else if (screenWidth <= 1920 && screenWidth > 1440) {
            maxPosition = 0
            if (screenWidth <= 1600 && screenWidth > 1500) {
                maxPosition = 0;
                if (screenWidth <= 1520 && screenWidth > 1500) {
                    maxPosition = 10;
                }
            } else if (screenWidth <= 1500 && screenWidth > 1440) {
                maxPosition = 130;
            }
        } else if (screenWidth <= 1440 && screenWidth > 1024) {
            if (screenWidth <= 1440 && screenWidth > 1300) {
                maxPosition = 170;
                if (screenWidth <= 1378 && screenWidth > 1300) {
                    maxPosition = 210
                }
            } else if (screenWidth <= 1300 && screenWidth > 1200) {
                maxPosition = 220;
                if (screenWidth <= 1215 && screenWidth > 1200) {
                    maxPosition = 300;
                }
            } else if (screenWidth <= 1200 && screenWidth > 1100) {
                maxPosition = 350;
                if (screenWidth <= 1140 && screenWidth > 1100) {
                    maxPosition = 370;
                }
            } else if (screenWidth <= 1100 && screenWidth > 1024) {
                maxPosition = 440;
            }

        } else if (screenWidth <= 1024 && screenWidth > 768) {
            if (screenWidth <= 1024 && screenWidth > 900) {
                maxPosition = 520;
                if (screenWidth <= 950 && screenWidth > 900) {
                    maxPosition = 550;
                }
            }
            else if (screenWidth <= 900 && screenWidth > 800) {
                maxPosition = 620
                if (screenWidth <= 840 && screenWidth > 800) {
                    maxPosition = 650
                }
            } else if (screenWidth <= 800 && screenWidth > 768) {
                maxPosition = 720
            }
        }
        else if (screenWidth <= 768 && screenWidth > 425) {
            if (screenWidth <= 768 && screenWidth > 700) {
                maxPosition = 860;
            } else if (screenWidth <= 700 && screenWidth > 600) {
                maxPosition = 920;
            } else if (screenWidth <= 600 && screenWidth > 500) {
                maxPosition = 940;
                if (screenWidth <= 556 && screenWidth > 524) {
                    maxPosition = 965;
                } else if (screenWidth <= 524 && screenWidth > 500) {
                    maxPosition = 985
                }
            }
        }
        else if (screenWidth <= 425 && screenWidth > 375) {
            maxPosition = 1030
        } else {
            maxPosition = 1045
            cardWidth = 345
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
        adviceElement.textContent = "У Вас нет риска развития диабета. Вам нужно вести здоровый образ жизни: - правильно питаться; - регулярно заниматься физическими упражнениями или пешими прогулками (по 30 минут каждый день); - не курить и не злоупотреблять алкоголь.";
    } else if (score <= 11) {
        adviceElement.textContent = "У вас небольшой риск развития диабета. Регулярно проверяйте уровень сахара в крови, занимайтесь физическими упражнениями и исключите вредные продукты из рациона.";
    } else if (score <= 14) {
        adviceElement.textContent = "Если входите в эту группу риска, Вам необходимо обратиться к эндокринологу в Эндокринологический диспансер для полного обследования и получить нужные рекомендации. Контролируйте свой сахар в крови каждые 3 месяца и ведите здоровый образ жизни. ";
    } else if (score <= 20) {
        document.getElementById("form-id").classList.remove("h-[600px]")
        document.getElementById("form-id").classList.add("h-[800px]")
        adviceElement.textContent = "СИТУАЦИЯ СЕРЬЁЗНАЯ! Вы входите в группу высоко риска развития диабета в течении 10 лет. Вам необходимо срочно не откладывая обратиться в эндокринологический диспансер для прохождения  полного обследования на диабет. Каждый 1 месяц  контролируйте  свой сахар в крови натощак и через 2 часа после еды. Следуйте рекомендациям эндокринолога и ведите здоровый образ жизни. ";
    } else {
        document.getElementById("form-id").classList.remove("h-[600px]")
        document.getElementById("form-id").classList.add("h-[800px]")
        adviceElement.textContent = "У вас скорее всго уже диагностирован 2 тип сахарного диабета! Вам нужно срочно обратиться к эндокринологу в эндокринологический диспансер, где Вы должны пройти полное обследование и получить амбулаторное или стационарное лечение. Пройти осмотр в кабинетах “Диабет глаза” и “Диабетическая стопа”, а также пройти обучение самоконтролю в кабинете “Школа диабета” при эндокринологическом диспансере.  ";
    }


    document.getElementById('result').classList.remove('hidden');
});
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
// document.addEventListener("DOMContentLoaded", () => {
//     const questions = document.querySelectorAll(".question");
//     let currentIndex = 0;

//     questions.forEach((question) => {
//         const radios = question.querySelectorAll("input[type='radio']");
//         radios.forEach((radio) => {
//             radio.addEventListener("change", () => {
//                 // Скрываем текущий вопрос
//                 question.classList.add("hidden");

//                 // Показываем следующий вопрос
//                 const nextIndex = currentIndex + 1;
//                 const nextQuestion = document.querySelector(
//                     `.question[data-index="${nextIndex}"]`
//                 );
//                 if (nextQuestion) {
//                     nextQuestion.classList.remove("hidden");
//                     currentIndex = nextIndex;
//                 } else {
//                     // Если вопросов больше нет, активируем кнопку
//                     document.getElementById("submitButton").disabled = false;
//                 }
//             });
//         });
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question");
    let currentIndex = 0;

    // Функция для отображения текущего вопроса
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle("hidden", i !== index);
        });
        updateNextButtonVisibility();
    }

    // Функция для обновления видимости кнопки "Далее"
    function updateNextButtonVisibility() {
        const currentQuestion = questions[currentIndex];
        const inputs = currentQuestion.querySelectorAll('input[type="radio"]');
        const nextButton = currentQuestion.querySelector('.next-button');
        const isAnswered = Array.from(inputs).some(input => input.checked);
        nextButton.classList.toggle("hidden", !isAnswered);
    }

    // Обработчик изменения состояния радиокнопок
    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            input.addEventListener("change", updateNextButtonVisibility);
        });
    });

    // Обработчик нажатия на кнопку "Далее"
    document.querySelectorAll('.next-button').forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение кнопки
            currentIndex++;
            if (currentIndex < questions.length) {
                showQuestion(currentIndex);
            }
            // Скрыть кнопку "Далее", если это последний вопрос
            if (currentIndex === questions.length - 1) {
                button.classList.add("hidden");
            }
            // Показать кнопку "Рассчитать", если все вопросы отвечены
            if (currentIndex === questions.length) {
                document.getElementById("submitButton").classList.remove("hidden");
            }
        });
    });

    // Показать первый вопрос при загрузке
    showQuestion(currentIndex);
});
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question");
    let currentIndex = 0;

    // Функция для отображения текущего вопроса
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle("hidden", i !== index);
        });
        updateNextButtonVisibility();
    }

    // Функция для обновления видимости кнопки "Далее"
    function updateNextButtonVisibility() {
        const currentQuestion = questions[currentIndex];
        const inputs = currentQuestion.querySelectorAll('input[type="radio"]');
        const nextButton = currentQuestion.querySelector('.next-button');
        const isAnswered = Array.from(inputs).some(input => input.checked);
        nextButton.classList.toggle("hidden", !isAnswered);
    }

    // Обработчик изменения состояния радиокнопок
    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            input.addEventListener("change", updateNextButtonVisibility);
        });
    });

    // Обработчик нажатия на кнопку "Далее"
    document.querySelectorAll('.next-button').forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение кнопки
            currentIndex++;
            if (currentIndex < questions.length) {
                showQuestion(currentIndex);
            }
            // Проверка на 8 вопросе
            if (currentIndex === questions.length) {
                const lastQuestionInputs = questions[currentIndex - 1].querySelectorAll('input[type="radio"]');
                const isLastQuestionAnswered = Array.from(lastQuestionInputs).some(input => input.checked);
                if (isLastQuestionAnswered) {
                    document.getElementById("submitButton").classList.remove("hidden");
                    button.classList.add("hidden"); // Скрываем кнопку "Далее"
                } else {
                    alert("Пожалуйста, выберите ответ на последний вопрос.");
                    currentIndex--; // Возвращаемся к последнему вопросу
                    showQuestion(currentIndex);
                }
            } else {
                // Скрыть кнопку "Далее", если это последний вопрос
                if (currentIndex === questions.length - 1) {
                    button.classList.add("hidden");
                }
            }
        });
    });

    // Показать первый вопрос при загрузке
    showQuestion(currentIndex);
});
// console.clear()