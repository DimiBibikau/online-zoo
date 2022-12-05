const renderOnlineZoo = () => {
    // BURGER MENU FOR MOBILE
    const burgerIcon = document.querySelector('.navigation__burger');
    const burgerMenu = document.querySelector('.burger__menu');
    const dimmerDiv = document.querySelector('.dimmer');
    const navigationItem = document.querySelectorAll('.navigation__item');
    const buttonClose = document.querySelector('.button__close-round');

    burgerIcon.addEventListener('click', () => {
        burgerMenu.classList.add('active');
        dimmerDiv.classList.add('active');
        document.querySelector('body').style.overflow = 'hidden';
        burgerIcon.style.display = 'none';
        dimmerDiv.addEventListener('click', () => {
            document.querySelector('body').style.overflow = 'visible';
            dimmerDiv.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerIcon.style.display = 'block';
        })
        buttonClose.addEventListener('click', () => {
            document.querySelector('body').style.overflow = 'visible';
            dimmerDiv.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerIcon.style.display = 'block';
        })
    })

    // POP-UP TESTIMONIALS
    const elementFactory = (tag, className, parentNode, index = 0) => {
        const element = document.createElement(tag);
        element.classList.add(className);
        document.querySelectorAll(parentNode)[index].append(element);
    }

    // CREATE TESTIMONIALS AND POP-UPs
    const testimonialFactory = (testimonial, data, parentNode) => {
        // CREATE TESTIMONIALS
        elementFactory('div', 'testimonials__item__border', parentNode);
        elementFactory('div', 'testimonials__item', '.testimonials__item__border', testimonial);
        elementFactory('div', 'testimonials__item__header', '.testimonials__item', testimonial);
        elementFactory('img', 'avatar', '.testimonials__item__header', testimonial);
        elementFactory('div', 'testimonials__item__header__text', '.testimonials__item__header', testimonial);
        elementFactory('div', 'testimonials__item__header__intro', '.testimonials__item__header__text', testimonial);
        elementFactory('p', 'name', '.testimonials__item__header__intro', testimonial);
        elementFactory('div', 'testimonials__item__header__intro__coordinates', '.testimonials__item__header__intro', testimonial);
        elementFactory('p', 'locality', '.testimonials__item__header__intro', testimonial);
        elementFactory('p', 'testimonial-text', '.testimonials__item', testimonial);
        elementFactory('p', 'testimonial-text', '.testimonials__item', testimonial);
        // POPULATE TESTIMONIALS
        document.querySelectorAll('.testimonials__item')[testimonial].id = [testimonial];
        document.querySelectorAll('.avatar')[testimonial].src = data[testimonial].imageLink;
        document.querySelectorAll('.avatar')[testimonial].alt = data[testimonial].name;
        document.querySelectorAll('.name')[testimonial].innerHTML = data[testimonial].name;
        document.querySelectorAll('.locality')[testimonial].innerHTML = data[testimonial].locality;
        document.querySelectorAll('.testimonial-text')[testimonial].innerHTML = data[testimonial].testimonial_text_json;
        // CREATE POP-UPS
        elementFactory('div', 'pop-up__border', parentNode);
        elementFactory('div', 'testimonials__pop-up', '.pop-up__border', testimonial);
        elementFactory('div', 'pop-up__header', '.testimonials__pop-up', testimonial);
        elementFactory('img', 'pop-up__avatar', '.pop-up__header', testimonial);
        elementFactory('div', 'pop-up__header__text', '.pop-up__header', testimonial);
        elementFactory('div', 'pop-up__header__intro', '.pop-up__header__text', testimonial);
        elementFactory('button', 'button-close__pop-up', '.pop-up__header', testimonial);
        elementFactory('p', 'pop-up__name', '.pop-up__header__intro', testimonial);
        elementFactory('div', 'pop-up__header__intro__coordinates', '.pop-up__header__intro', testimonial);
        elementFactory('p', 'pop-up__locality', '.pop-up__header__intro', testimonial);
        elementFactory('p', 'pop-up__text', '.testimonials__pop-up', testimonial);
        elementFactory('p', 'pop-up__text', '.testimonials__pop-up', testimonial);
        // POPULATE POP-UPS
        document.querySelectorAll('.testimonials__pop-up')[testimonial].id = [testimonial];
        document.querySelectorAll('.button-close__pop-up')[testimonial].innerHTML = '✗';
        document.querySelectorAll('.pop-up__avatar')[testimonial].src = data[testimonial].imageLink;
        document.querySelectorAll('.pop-up__avatar')[testimonial].alt = data[testimonial].name;
        document.querySelectorAll('.pop-up__name')[testimonial].innerHTML = data[testimonial].name;
        document.querySelectorAll('.pop-up__locality')[testimonial].innerHTML = data[testimonial].locality;
        document.querySelectorAll('.pop-up__text')[testimonial].innerHTML = data[testimonial].testimonial_text_json;
        // ACTIONS ON THE POP-UPS
        const testimonialItems = document.querySelectorAll('.testimonials__item');
        const popUpButtons = document.querySelectorAll('.button-close__pop-up');

        for(let [index, testimonial] of testimonialItems.entries()) {
            testimonial.addEventListener('click', () => {
                if(window.innerWidth < 1200) {
                    document.querySelectorAll('.testimonials__pop-up')[index].classList.add('active');
                dimmerDiv.classList.add('active');
                document.querySelector('body').style.overflow = 'hidden';
                dimmerDiv.addEventListener('click', () => {
                    document.querySelectorAll('.testimonials__pop-up')[index].classList.remove('active');
                    dimmerDiv.classList.remove('active');
                    document.querySelector('body').style.overflow = 'visible';
                })
                }
            })
        }

        for (let [index, button] of popUpButtons.entries()) {
            button.addEventListener('click', () => {
                document.querySelectorAll('.testimonials__pop-up')[index].classList.remove('active');
                dimmerDiv.classList.remove('active');
                document.querySelector('body').style.overflow = 'visible';
            })
        }
    }
    // FETCHING TESTIMONIALS
    fetch('./testimonials.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for(let testimonial in data) {
                testimonialFactory(testimonial, data, '.testimonials__content_deck');
            }
        })
    // ACTIONS ON SLIDER
    const sliderEcho = document.querySelector('input[type="range"');
    const testimonialsList = document.querySelectorAll('.testimonials__item');
    const sliderValue = () => {
        const newSliderValue = sliderEcho.value;
    }
    sliderEcho.addEventListener('input', sliderValue);
}

renderOnlineZoo()
