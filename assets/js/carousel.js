const swiperContainerEl = document.querySelector('swiper-container');
const prevsBtnEl = document.querySelector('#prevsBtn');

prevsBtnEl.addEventListener('click', prevsBtnClick);
function prevsBtnClick(event) {
    event.preventDefault();
    if (tagHistory.length > 0) {
        // if there is a tag history, pop the last tag(s) and store in current tags 
        // build carousel and save current tags in local store
        let previousTags = tagHistory.pop();
        currentTagList = previousTags;
        localStorage.setItem('userTags', JSON.stringify(currentTagList));

        updateTagHistory();
        buildCarousel(imagesWithTags(currentTagList));
    } else {
        // else no history so clear current tags and local store and display all images in carousel
        currentTagList = '';
        localStorage.removeItem('userTags');

        updateTagHistory();
        buildCarousel(loadImages());
    }
}

//Global array to store history of clicked tags
let tagHistory = [];
let currentTagList = JSON.parse(localStorage.getItem('userTags'));;

function loadImages() {
    // Load all images from image store
    let storedImages = JSON.parse(localStorage.getItem('imageStore'));
    if (storedImages === null) {
        // If no images found in localStorage, store default
        storeImages(images);
        return images;
    }
    return storedImages;
}

function storeImage(image) {
    // Add an image to the image store
    let images = loadImages();
    images.unshift(image);
    storeImages(images);
}

function storeImages(images) {
    // Store all images to the image store
    localStorage.setItem('imageStore', JSON.stringify(images));
}

function buildCarousel(images) {
    // Build the image carousel with an array of images
    // Clear swipe-container first
    swiperContainerEl.replaceChildren();
    if (images.length === 0) {
        return;
    }
    for (let i = 0; i < images.length; i++) {
        let swiperSlideEl = document.createElement('swiper-slide');
        let tagSlideEl = document.createElement('div');
        for (j = 0; j < images[i].tags.length; j++) {
            let tagEl = document.createElement('button');
            tagEl.classList.add('btn');
            tagEl.classList.add('btn-md');
            tagEl.classList.add('btn-primary');
            tagEl.setAttribute('type', 'submit');
            tagEl.textContent = images[i].tags[j];
            tagSlideEl.appendChild(tagEl);
        }
        let imgEl = document.createElement('img');
        // changing to 100% seems to have fixed sizing issues?
        imgEl.alt = images[i].tags.toString();
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.src = images[i].src;
        swiperSlideEl.appendChild(imgEl);
        swiperSlideEl.appendChild(tagSlideEl);
        swiperContainerEl.appendChild(swiperSlideEl);
        tagSlideEl.addEventListener('click', tagClicker);
    }
    swiperContainerEl.swiper.slideTo(0);
}

function tagClicker(event) {
    event.preventDefault();
    const clickedTag = event.target.textContent;

    // if there are current tags, push them to history
    if (currentTagList) {
        tagHistory.push(currentTagList);
    }
    // set current tag to clicked tag and save in local store
    currentTagList = [clickedTag];
    localStorage.setItem('userTags', JSON.stringify(currentTagList));

    updateTagHistory();
    buildCarousel(imagesWithTag(clickedTag));
}

function updateTagHistory() {
    const tagHistoryList = document.querySelector('#tagHistory ul');
    const curTagEl = document.querySelector('#curTag');
    const userSearch = JSON.parse(localStorage.getItem('userTags'));
    // clears existing tags
    tagHistoryList.replaceChildren();
    curTagEl.replaceChildren();
    if (tagHistory.length >= 1) {
        //if there is a tag history build tag history elements
        for (let i = 0; i < tagHistory.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = tagHistory[i];
            tagHistoryList.appendChild(listItem);
        }
    }


    // if there is a current tag, build current tag element
    if (currentTagList) {
        //create current tag header
        const currentTags = document.createElement('h2');
        currentTags.textContent = 'Current Tag(s): ' + currentTagList;
        curTagEl.appendChild(currentTags);
    }
}

function addImageTag(src, tag) {
    // Add tag to image in the image store
    let images = loadImages();
    if (images.length === 0) {
        return;
    }
    let image = images.find((element) => element.src === src);
    // Make sure image exists in image store
    if (image) {
        // Don't add tag if already there
        if (!image.tags.includes(tag)) {
            image.tags.unshift(tag);
            storeImages(images);
        }
    }
}

function removeImageTag(src, tag) {
    // Remove tag from image in the image store
    let images = loadImages();
    if (images.length === 0) {
        return;
    }
    let image = images.find((element) => element.src === src);
    // Make sure image exsits in image store
    if (image) {
        let index = image.tags.findIndex((element) => element === tag);
        if (index >= 0) {
            image.tags.splice(index, 1);
            storeImages(images);
        }
    }
}

function imagesWithTag(tag) {
    // Return all images with tag from the image store
    let images = loadImages();
    let taggedImages = [];
    for (let i = 0; i < images.length; i++) {
        if (images[i].tags.includes(tag)) {
            taggedImages.push(images[i]);
        }
    }
    return taggedImages;
}

function imagesWithTags(tagArray) {
    // Return all images that match all of the tags from the image store
    let images = loadImages();
    let taggedImages = [];
    if ((tagArray !== null) && (tagArray.length > 0)) {
        for (let i = 0; i < images.length; i++) {
            if (tagArray.every((tag) => images[i].tags.includes(tag))) {
                taggedImages.push(images[i]);
            }
        }
        return taggedImages;
    } else {
        // return all images if tag array is empty
        return images;
    }
}


//initial cube page load
buildCarousel(imagesWithTags(JSON.parse(localStorage.getItem('userTags'))));