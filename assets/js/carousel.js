const swiperContainerEl = document.querySelector('swiper-container');

function loadImages() {
    // Load all images from image store
    let images = JSON.parse(localStorage.getItem('imageStore'));
    if (images === null) {
        return [];
    }
    return images;
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
        let imgEl = document.createElement('img');
        imgEl.style.width = '600px';
        imgEl.style.height = '600px';
        imgEl.src = images[i].src;
        // Add tags to alt?
        swiperSlideEl.appendChild(imgEl);
        swiperContainerEl.appendChild(swiperSlideEl);
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
    // Don't search if tag array is empty
    if (tagArray.length > 0) {
        for (let i = 0; i < images.length; i++) {
            if (tagArray.every((tag) => images[i].tags.includes(tag))) {
                taggedImages.push(images[i]);
            }
        }
    }
    return taggedImages;
}

buildTestImageStore();

buildCarousel(loadImages());

// buildCarousel(imagesWithTag('test'));
buildCarousel(imagesWithTags(['remove', 'test']));
removeImageTag("https://placedog.net/400/507?id=22", "remove");


function buildTestImageStore() {
    // Populate image store with some test data
    localStorage.clear();
    let image = {
        src: "https://placedog.net/400/445?id=68",
        tags: [],
    };
    storeImage(image);

    image = {
        src: "https://placedog.net/400/541?id=54",
        tags: [],
    };
    storeImage(image);

    image = {
        src: "https://placedog.net/400/532?id=118",
        tags: [],
    };
    storeImage(image);
    image = {
        src: "https://placedog.net/400/542?id=8",
        tags: [],
    };
    storeImage(image);
    image = {
        src: "https://placedog.net/400/507?id=22",
        tags: [],
    };
    storeImage(image);
    image = {
        src: "https://placedog.net/400/549?id=222",
        tags: [],
    };
    storeImage(image);
    image = {
        src: "https://placedog.net/400/493?id=113",
        tags: [],
    };
    storeImage(image);

    image = {
        src: "https://placedog.net/400/517?id=219",
        tags: [],
    };
    storeImage(image);

    addImageTag("https://placedog.net/400/541?id=54", "test");
    addImageTag("https://placedog.net/400/517?id=219", "test");
    addImageTag("https://placedog.net/400/507?id=22", "test");
    addImageTag("https://placedog.net/400/541?id=54", "test");
    addImageTag("https://placedog.net/400/517?id=219", "test");
    addImageTag("https://placedog.net/400/507?id=22", "test");
    addImageTag("https://placedog.net/400/507?id=22", "remove");
}