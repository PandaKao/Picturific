const buttonEl = document.querySelector('button');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownToggleEl = document.querySelector('.dropdown-toggle');
const submitEl = document.querySelector('#tagSearch');
const clearEl = document.querySelector('#clearButton');
const modalTagListEl = document.querySelector('.modalTagsList');
const displayTagsEl = document.querySelector('#selectedTags');
const errorEl = document.querySelector('#errorTags');
const checkboxesEl = document.querySelectorAll('input[type="checkbox"]');

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
        dropdownMenu.appendChild(liTag.cloneNode(true));
        modalTagListEl.appendChild(liTag);
    })
}

//displays selected tags
function updateSelectedTags() {
    selectedTags = [];

    //checks each checkbox if filled
    checkboxesEl.forEach(function (checkbox) {
        if (checkbox.checked) {
            //adds checkbox value to selectedTags array
            selectedTags.push(checkbox.value)
        }
    });
}

function displaySelectedTags(displayTagsEl) {
    if (selectedTags.length === 0) {
        displayTagsEl.textContent = '';
    } else {
        displayTagsEl.textContent = 'Selected Tags: ' + selectedTags.join(', ');
    }
}

function validateTagSelection(errorEl) {
    const maxTags = 3;
    if (selectedTags.length > maxTags) {
        errorEl.textContent = `Please select only up to ${maxTags} tags.`;
        return false;
    } else if (selectedTags.length === 0) {
        errorEl.textContent = 'Please select at least 1 tag.'
        return false;
    } else {
        errorEl.textContent = '';
        return true;
    }
}

function clearCheckboxes() {
    checkboxesEl.forEach(function (checkbox) {
        checkbox.checked = false;
    });
}

function creationAndReset() {
    localStorage.setItem('currentTags', JSON.stringify(selectedTags));

    //shows images when tags are submitted
    buildCarousel(imagesWithTags(selectedTags));

    // if there are current tags, push them to history
    if (currentTagList.length > 0) {
        tagHistory.push(currentTagList);
        localStorage.setItem('tagHistory', JSON.stringify(tagHistory));
    }

    // store selected tags as current tags
    currentTagList = selectedTags;
    updateTagHistory();
    //clears checkboxes after submission
    clearCheckboxes();
}

//event listener every time a checkbox is changed
dropdownMenu.addEventListener('change', function (event) {
    updateSelectedTags();
    displaySelectedTags(displayTagsEl);
});

//event listener to clear tags
clearEl.addEventListener('click', function (event) {
    event.preventDefault();
    const displayTagsEl = document.querySelector('#selectedTags');
    const errorEl = document.querySelector('#errorTags');

    errorEl.textContent = '';
    clearCheckboxes();
    updateSelectedTags();
    displaySelectedTags(displayTagsEl);
});

//event listener for form submission
submitEl.addEventListener('submit', function (event) {
    event.preventDefault();

    //syncs up selectedTags array with user selections
    updateSelectedTags();
    displaySelectedTags(displayTagsEl);

    if (validateTagSelection(errorEl)) {
        creationAndReset();

        //clears displayTagsEl
        displayTagsEl.textContent = '';
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
    updateTagHistory();
});