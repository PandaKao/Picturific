const buttonEl = document.querySelector('button');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownToggleEl = document.querySelector('.dropdown-toggle');
const submitEl = document.querySelector('#tagSearch');
const addPictureEl = document.querySelector('#addPicture');
const clearEl = document.querySelector('#clearButton');
const modalTagListEl = document.querySelector('.modalTagsList');
const modalSubmitEl = document.querySelector('#modalSubmit');
const uploadEl = document.querySelector('#upload');

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
        checkboxEl.setAttribute("id", tag);

        labelTag.appendChild(checkboxEl);
        labelTag.appendChild(labelText);
        liTag.appendChild(labelTag);
        dropdownMenu.appendChild(liTag);
    })
}

function createModalTagsList(tags) {
    tags.forEach(function (tag) {
        const liTag = document.createElement('li');

        const labelTag = document.createElement('label');
        labelTag.classList.add('dropdown-item');
        let labelText = document.createTextNode(` ${tag}`);

        const checkboxEl = document.createElement('input');
        checkboxEl.onchange = function (event) {
            validateModal(event);
        }
        checkboxEl.type = 'checkbox';
        checkboxEl.value = tag;
        checkboxEl.setAttribute("id", tag);


        labelTag.appendChild(checkboxEl);
        labelTag.appendChild(labelText);
        liTag.appendChild(labelTag);
        modalTagListEl.appendChild(liTag);
    })
}

//displays selected tags
function updateSelectedTags() {
    selectedTags = [];
    const checkboxesEl = document.querySelectorAll('input[type="checkbox"]');

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
    const checkboxesEl = document.querySelectorAll('input[type="checkbox"]');
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
    event.preventDefault();
    const displayTagsEl = document.querySelector('#selectedTags');
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
    const displayTagsEl = document.querySelector('#selectedTags');
    const errorEl = document.querySelector('#errorTags');

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

addPictureEl.addEventListener('input', validateModal)

function validateModal(event) {
    event.preventDefault();
    const urlEl = document.querySelector('#srcUrl')
    const submitTagsError = document.querySelector('#submitTagsError');
    updateSelectedTags();
    validateTagSelection(submitTagsError);
    if (validateTagSelection(submitTagsError) && urlEl.value !== '') {
        modalSubmitEl.disabled = false;
    } else {
        modalSubmitEl.disabled = true;
    }

}


addPictureEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const urlEl = document.querySelector('#srcUrl')
    let image = {
        src: urlEl.value,
        tags: selectedTags,
    }
    updateSelectedTags();
    storeImage(image);
    creationAndReset();
    urlEl.value = '';
});



//jQuery to run on startup
$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
    createDropdown(tags);
    createModalTagsList(tags);
    updateTagHistory();
});