document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentPosition = 0;
    const cardWidth = 340; // Ширина карточки
    const maxPosition = 1700; // Устанавливаем максимальную позицию в 1700 пикселей

    let containerWidth = container.parentElement.offsetWidth;
    let visibleCards = Math.floor(containerWidth / cardWidth);

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
