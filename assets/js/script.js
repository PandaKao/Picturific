// swiper button click using swiper js
const swiperEl = document.querySelector('swiper-container');
const buttonEl = document.querySelector('button');
const checkboxesEl = document.querySelectorAll('.dropdown-menu input[type="checkbox"]');
const displayTagsEl = document.querySelector('#selectedTags');
const errorEl = document.querySelector('#errorTags');

const maxTags = 3;

// buttonEl.addEventListener('click', () => {
//     swiperEl.swiper.slideNext();
// });

//initialize bootstrap dropdown
$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
});

//displays selected tags
function updateSelectedTags() {
    let selectedTags = [];
    let counter = 0;

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
        errorEl.textContent = "Please select only up 3 tags.";
    } else {
        errorEl.textContent = "";
    }

    //dynamically updates tags selected
    displayTagsEl.textContent = 'Selected Tags: ' + selectedTags.join(', ');
}

//event listener every time a checkbox is changed
checkboxesEl.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateSelectedTags);
});