const swiperContainerEl = document.querySelector('swiper-container');

function loadImages() {
    let images = JSON.parse(localStorage.getItem('imageStore'));
    if (images === null) {
        return [];
    }
    return images;
}

function storeImage(image) {
    let images = loadImages();
    images.push(image);
    localStorage.setItem('imageStore', JSON.stringify(images));
};

function buildCarousel(images) {
    if (images.length === 0) {
        return;
    }
    for (let i = 0; i < images.length; i++) {
        let swiperSlideEl = document.createElement('swiper-slide');
        let imgEl = document.createElement('img');
        imgEl.style.width = '600px';
        imgEl.style.height = '600px';
        imgEl.src = images[i].src;
        swiperSlideEl.appendChild(imgEl);
        swiperContainerEl.appendChild(swiperSlideEl);
    }
}

let images = loadImages();
buildCarousel(images);

// let image = {
//     src: "https://placedog.net/400/445?id=68",
// };
// storeImage(image);

// image = {
//     src: "https://placedog.net/400/541?id=54",
// };
// storeImage(image);

// image = {
//     src: "https://placedog.net/400/532?id=118",
// };
// storeImage(image);
// image = {
//     src: "https://placedog.net/400/542?id=8",
// };
// storeImage(image);
// image = {
//     src: "https://placedog.net/400/507?id=22",
// };
// storeImage(image);
// image = {
//     src: "https://placedog.net/400/549?id=222",
// };
// storeImage(image);
// image = {
//     src: "https://placedog.net/400/493?id=113",
// };
// storeImage(image);

// image = {
//     src: "https://placedog.net/400/517?id=219",
// };
// storeImage(image);
