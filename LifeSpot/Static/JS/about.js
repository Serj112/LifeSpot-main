/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
* 
* */
function getComment() {
    // Создаем объект обычного комментария
    let comment = {}

    // Запросим имя
    comment.author = prompt("Как вас зовут ?")
    if (comment.author == null) {
        return
    }

    // Запросим текст
    comment.text = prompt("Оставьте отзыв")
    if (comment.text == null) {
        return
    }

    // Сохраним текущее время
    comment.date = new Date().toLocaleString()

    // Запросим,, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}

/*
* Запишем отзыв на страницу 
* 
* */
const writeReview = review => {
    let likeCounter = '';

    // Если публикуется отзыв - добавляем ему кнопку с лайками.
    if (review.hasOwnProperty('rate')) {

        // Генерим идентификатор комментария.
        let commentId = Math.random();
        // Для кнопки лайков добавляем: идентификатор, атрибут onclick для передачи идентификатора в функцию, значок лайка, и само значение счётчика отделяем пробелом
        // Также мы добавили стиль, чтобы кнопка смотрелась лучше и не имела рамок
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }
    // Запишем результат 
    document.getElementsByClassName('reviews')[0].innerHTML += ' <div class="review-    text">\n' + `<p> <i> <b>${review['author']}</b> ${review['date']}${likeCounter}</i></p>` + `<p>${review['text']}</p>` + '</div>';
}


function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);

    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ')

    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);

    // Увеличим счётчик
    resultNum += 1

    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`

    // Обновим текст элемента
    element.innerText = array.join(' ')
}


let currentImage = {
    index: 0,
    secondRound: false
};

function showImageBlock(id) {
    let images = document.getElementsByClassName("itc-slider__item");
    for (let image of images) {
        image.style.display = 'none';
    }
    if (id >= images.length) {
        images[0].style.display = 'block';
        currentImage.secondRound = true;
    }
    if (id >= 0 && id < images.length) {
        images[id].style.display = 'block';
        currentImage.secondRound = false;
    }
    if (id < 0) {
        images[2].style.display = 'block';
        currentImage.secondRound = true;
    }
}

function next(currentIndex) {
    //console.log('Next');
    showImageBlock(currentIndex + 1);
    if (currentImage.secondRound)
        currentImage.index = 0;
    else
        currentImage.index++;
}
function previous(currentIndex) {
    //console.log('Previous');
    showImageBlock(currentIndex - 1);
    if (currentImage.secondRound)
        currentImage.index = 2;
    else
        currentImage.index--;
} r = ItcSlider.getInstance(sliderElem);