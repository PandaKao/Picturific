const buttonEl = document.querySelector('button');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownToggleEl = document.querySelector('.dropdown-toggle');
const displayTagsEl = document.querySelector('#selectedTags');
const errorEl = document.querySelector('#errorTags');
const submitEl = document.querySelector('#tagSearch');

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
    selectedTags = [];
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
        errorEl.textContent = 'Please select only up to 3 tags.';
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

function clearCheckboxes() {
    const checkboxesEl = document.querySelectorAll('.dropdown-menu input[type="checkbox"]');
    checkboxesEl.forEach(function (checkbox) {
        checkbox.checked = false;
    });
}

//like/dislike counter 


//event listener every time a checkbox is changed
dropdownMenu.addEventListener('change', function (event) {
    updateSelectedTags();
})

//event listener for form submission
submitEl.addEventListener('submit', function (event) {
    event.preventDefault();
    //syncs up selectedTags array with user selections
    updateSelectedTags();
    errorEl.textContent = '';

    if (selectedTags.length > maxTags) {
        errorEl.textContent = 'Please select only up to 3 tags.';
    } else if (selectedTags.length === 0) {
        errorEl.textContent = 'Please select at least 1 tag.';
    } else {
        localStorage.setItem('userTags', JSON.stringify(selectedTags));

        //clears text in errorEl and displayTagsEl
        errorEl.textContent = '';
        displayTagsEl.textContent = '';

        //shows images when tags are submitted
        buildCarousel(imagesWithTags(JSON.parse(localStorage.getItem('userTags'))));

        //clears checkboxes after submission
        clearCheckboxes();
    }

    //collapse dropdown if active
    if (dropdownToggleEl.classList.contains('show')) {
        dropdownToggleEl.classList.remove('show');
        dropdownMenu.classList.remove('show');
        dropdownToggleEl.setAttribute('aria-expanded', 'false');
    }
})

//jQuery to run on startup
$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
    createDropdown(tags);
});