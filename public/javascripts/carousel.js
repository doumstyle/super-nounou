const carouselElement = document.getElementById("carousel");
const img = carouselElement.querySelector(".img");

const btns = carouselElement.querySelectorAll(".btn");

const imgs = ["https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427168/84_zstpqh.jpg",
"https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427166/52_yifjrn.jpg",
"https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/62_bu6hcb.jpg"
];

let count = 0;

const handleClick = (event) => {
    const btn = event.target;

    if(btn.id === "btn-prev") {
        count = count === 0 ? imgs.length - 1 : count - 1;
    } else {
        count += 1;
        if (count === imgs.length) count = 0;
    }
    img.src = `./imgs/${imgs[count]}`;
}

btns.forEach(btn => btn.onclick = handleClick);


