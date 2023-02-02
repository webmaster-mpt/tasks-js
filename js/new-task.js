let btnSelected = document.querySelector('.search-form__form-selector')
    formBox = document.querySelector('.search-form__form-box')
    formItem = document.querySelectorAll('.search-form__form-item')
    formSelected = document.querySelector('.search-form__form-item--selected')
    formContainer = document.querySelectorAll('.form-findBox__item--container')
    searchInput = document.querySelector('#searchField')
    toggle = true
    itemClick = 0;


btnSelected.addEventListener('click', showSelect);//категории

searchInput.oninput = function () { //поисковик
    let val = this.value.trim();
    if (val != '') {
        for (let i = 0; i < formItem.length; i++){
            if(formItem[i].classList == 'search-form__form-item selected'){
                let slug = formItem[i].attributes.slug.value;
                formContainer.forEach(function (elC) {
                    let term = elC.attributes.term.value;
                    if (elC.innerText.search(val) != -1 && slug == term) {
                        elC.classList.remove('hidden');
                    } else {
                        elC.classList.add('hidden');
                    }
                });
            }
        }
    } else {
        formContainer.forEach(function (el) {
            el.classList.add('hidden');
        });
    }
}


function showSelect() {
    // показываем/скрываем список категорий
    let checkClick = toggle ? formBox.style.display = 'block' : formBox.style.display = 'none';
    toggle = !toggle;

    //удаляем всё выбранное в поиске при выборе новой категории
    searchInput.value = null;
    formContainer.forEach(function (el) {
        el.classList.add('hidden');
    });

    checkSelected();
}

function checkSelected() {//функция смены категории
    for (let i = 0; i < formItem.length; i++) {
        formItem[i].addEventListener('click', function () {
            formItem.forEach(function (el, key) {
                if (el.classList == 'search-form__form-item selected') {
                    el.classList.remove('selected');
                }
            });
            formItem[i].classList.add('selected');
            formSelected.textContent = formItem[i].textContent;
        });
    }
}