document.querySelector('.feedback-form').addEventListener('submit', e => {
    e.preventDefault();
    const form = document.querySelector('.feedback-form');
    const nameTest = /[a-zа-яё]+$/i;
    const phoneTest = /\+7\(\d{3}\)\d{3}-\d{4}$/i;
    const mailTest = /[a-z0-9\.\-]+@mail.ru$/i;

    if (!nameTest.test(`${form.querySelector('#name-input').value}`) || form.querySelector('#name-input').value === '') {
        form.querySelector('[for="name-input"]').classList.remove('invisible');
        form.querySelector('#name-input').style.border = '2px solid darkred';
        form.querySelector('[for="name-input"]').textContent = 'Имя должно содержать только буквы.';
    } else {
        form.querySelector('[for="name-input"]').classList.add('invisible');
        form.querySelector('#name-input').style.border = '';
    }

    if (!phoneTest.test(`${form.querySelector('#phone-input').value}`)) {
        form.querySelector('[for="phone-input"]').classList.remove('invisible');
        form.querySelector('#phone-input').style.border = '2px solid darkred';
        form.querySelector('[for="phone-input"]').textContent = 'Номер телефона должен быть следующего вида:' +
            ' +7(xxx)xxx-xxxx';
    } else {
        form.querySelector('[for="phone-input"]').classList.add('invisible');
        form.querySelector('#phone-input').style.border = '';
    }

    if (!mailTest.test(`${form.querySelector('#mail-input').value}`)) {
        form.querySelector('[for="mail-input"]').classList.remove('invisible');
        form.querySelector('#mail-input').style.border = '2px solid darkred';
        form.querySelector('[for="mail-input"]').textContent = 'email должен быть следующего вида: yourmail@mail.ru';
    } else {
        form.querySelector('[for="mail-input"]').classList.add('invisible');
        form.querySelector('#mail-input').style.border = '';
    }

    if (form.querySelector('#text-input').value === '') {
        form.querySelector('[for="text-input"]').classList.remove('invisible');
        form.querySelector('#text-input').style.border = '2px solid darkred';
        form.querySelector('[for="text-input"]').textContent = 'Введите сообщение.';
    } else {
        form.querySelector('[for="text-input"]').classList.add('invisible');
        form.querySelector('#text-input').style.border = '';
    }
});