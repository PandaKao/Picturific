// swiper button click using swiper js
const buttonEl = document.querySelector('button');
const dropdownMenu = document.querySelector('.dropdown-menu');
const displayTagsEl = document.querySelector('#selectedTags');
const errorEl = document.querySelector('#errorTags');
const submitEl = document.querySelector('#submitButton');

const maxTags = 3;
let selectedTags = [];

function createDropdown(tags) {
    tags.forEach(function (tag) {
        const liTag = document.createElement('li');

        const labelTag = document.createElement('label');
        labelTag.classList.add('dropdown-item');
        let labelText = document.createTextNode(` ${tag}`);

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.value = tag;

        labelTag.appendChild(checkboxEl);
        labelTag.appendChild(labelText);
        liTag.appendChild(labelTag);
        dropdownMenu.appendChild(liTag);
    })
}

//displays selected tags
function updateSelectedTags() {
    let selectedTags = [];
    let counter = 0;
    const checkboxesEl = document.querySelectorAll('.dropdown-menu input[type="checkbox"]');

    //checks each checkbox if filled
    checkboxesEl.forEach(function (checkbox) {
        if (checkbox.checked) {
            //adds checkbox value to selectedTags array
            selectedTags.push(checkbox.value);
            counter++;
        }
    });

    //alerts user to select up to maxTags
    if (counter > maxTags) {
        errorEl.textContent = 'Please select only up 3 tags.';
    } else {
        errorEl.textContent = '';
    }

    //dynamically updates tags selected
    if (counter === 0) {
        displayTagsEl.textContent = '';
    } else {
        displayTagsEl.textContent = 'Selected Tags: ' + selectedTags.join(', ');
    }
}

//event listener every time a checkbox is changed
dropdownMenu.addEventListener('change', function (event) {
    updateSelectedTags();
})

//event listener for form submission
submitEl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (selectedTags.length > maxTags) {
        errorEl.textContent = 'Please select only up to 3 tags.';
    } else {
        errorEl.textContent = '';
        //shows images when tags are submitted
        buildCarousel(imagesWithTags(selectedTags)); //need Stephen's function
    }
})

//jQuery to run on startup
$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
    createDropdown(tags);
});