const swiperContainerEl = document.querySelector('swiper-container');

//Global array to store history of clicked tags
let tagHistory = [];

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

    tagHistory.push(clickedTag);
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


    if (tagHistory.length > 1) {
        //creates tag history
        for (let i = 0; i < tagHistory.length - 1; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = tagHistory[i];
            tagHistoryList.appendChild(listItem);
        }
    //creates tag history for first tag click
    } else if (tagHistory.length === 1) {
        tagHistory.unshift(userSearch);
        listItem = document.createElement('li');
        listItem.textContent = userSearch.join(', ');
        tagHistoryList.appendChild(listItem);
    }

    //creates current tag header
    currentTags = document.createElement('h2');
    if (tagHistory.length > 0) {
        currentTags.textContent = 'Current Tag(s): ' + tagHistory[tagHistory.length - 1];
    } else {
        currentTags.textContent = 'Current Tag(s): ' + userSearch.join(', ');
    }
    curTagEl.appendChild(currentTags);
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
    // Don't search if tag array is empty
    if ((tagArray !== null) && (tagArray.length > 0)) {
        for (let i = 0; i < images.length; i++) {
            if (tagArray.every((tag) => images[i].tags.includes(tag))) {
                taggedImages.push(images[i]);
            }
        }
        return taggedImages;
    } else {
        return images;
    }
}


//initial cube page load
buildCarousel(imagesWithTags(JSON.parse(localStorage.getItem('userTags'))));
