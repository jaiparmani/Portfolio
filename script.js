// ================================  LOADER  ====================================== //

setTimeout(() => {
	const loader = document.querySelector(".loader");
	loader.style.opacity = "0";
	loader.style.backgroundColor = "transparent";
	setTimeout(() => {
		loader.style.display = "none";
		document.body.style.overflow = "visible";
	}, 1000);

}, 1000);

function typeWriterEffect(text, i, speed) {
	if (i < text.length) {
		document.querySelector(".type-writer-text").innerHTML += text.charAt(i);
		i++;
		setTimeout(function () {
			typeWriterEffect(text, i, speed);
		}, speed);
	}
	else{
		window.location = "./terminal/index.html"

	}
}

// Text to display with typewriter effect
var textToType = "Loading.....";

// Start the typewriter effect after a delay of 1 second (1000 milliseconds)
setTimeout(function () {
	 typeWriterEffect(textToType, 0, 100); // Adjust speed (in milliseconds) here

}, 6000);


// =======================================  NAVIGATE ====================================== //

const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const bgOverlay = document.querySelector(".overlay");

if (burgerMenu && bgOverlay) {
	burgerMenu.addEventListener("click", () => {
		navbarMenu.classList.add("is-active");
		bgOverlay.classList.toggle("is-active");
	});

	bgOverlay.addEventListener("click", () => {
		navbarMenu.classList.remove("is-active");
		bgOverlay.classList.toggle("is-active");
	});
}

// close on click
document.querySelectorAll(".menu-link").forEach((link) => {
	link.addEventListener("click", () => {
		navbarMenu.classList.remove("is-active");
		bgOverlay.classList.remove("is-active");
	});
});

// search toggle
const searchBlock = document.querySelector(".search-block");
const searchToggle = document.querySelector(".search-toggle");
const searchCancel = document.querySelector(".search-cancel");

if (searchToggle && searchCancel) {
	searchToggle.addEventListener("click", () => {
		searchBlock.classList.add("is-active");
	});

	searchCancel.addEventListener("click", () => {
		searchBlock.classList.remove("is-active");
	});
}

window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		header.style.height = "4.5rem";
		header.style.backgroundColor = "hsla(240, 15%, 10%, .5)";
		header.style.backdropFilter = "blur(20px)";
		header.style.borderBottomColor = "hsla(240, 10%, 80%, .2)";
	} else {
		header.style.height = "8rem";
		header.style.backgroundColor = "hsla(240, 8%, 8%, 0)";
		header.style.backdropFilter = "blur(0px)";
		header.style.borderBottomColor = "hsla(240, 15%, 12%, 0)";
	}
});

// =============================  CAROUSEL  ============================ //

const carouselList = document.querySelector(".carousel__list");
const carouselItems = document.querySelectorAll(".carousel__item");
const elems = Array.from(carouselItems);
let intervalId;
carouselList.addEventListener("click", function (event) {
	var newActive = event.target;
	var isItem = newActive.closest(".carousel__item");

	if (!isItem || newActive.classList.contains("carousel__item_active")) {
		return;
	}
	update(newActive);
	resetInterval();
});

function update(newActive) {
	const newActivePos = newActive.dataset.pos;

	const current = elems.find(function (elem) {
		return elem.dataset.pos == 0;
	});
	const prev = elems.find(function (elem) {
		return elem.dataset.pos == -1;
	});
	const next = elems.find(function (elem) {
		return elem.dataset.pos == 1;
	});
	const first = elems.find(function (elem) {
		return elem.dataset.pos == -2;
	});
	const last = elems.find(function (elem) {
		return elem.dataset.pos == 2;
	});

	current.classList.remove("carousel__item_active");

	[current, prev, next, first, last].forEach(function (item) {
		var itemPos = item.dataset.pos;

		item.dataset.pos = getPos(itemPos, newActivePos);
	});
}

function getPos(current, active) {
	const diff = current - active;

	if (Math.abs(current - active) > 2) {
		return -current;
	}
	return diff;
}
function resetInterval() {
	clearInterval(intervalId);
	intervalId = setInterval(autoChangeSlide, 20000);
}
function autoChangeSlide() {
	const current = elems.find(function (elem) {
		return elem.dataset.pos == 0;
	});
	const next = elems.find(function (elem) {
		return elem.dataset.pos == 1;
	});
	if (next) {
		update(next);
	} else {
		update(elems[0]);
	}
}
function handleKeyDown(event) {
	if (event.key === "ArrowLeft") {
		const current = elems.find(function (elem) {
			return elem.dataset.pos == 0;
		});
		const prev = elems.find(function (elem) {
			return elem.dataset.pos == -1;
		});
		if (prev) {
			update(prev);
			resetInterval();
		}
	} else if (event.key === "ArrowRight") {
		const current = elems.find(function (elem) {
			return elem.dataset.pos == 0;
		});
		const next = elems.find(function (elem) {
			return elem.dataset.pos == 1;
		});
		if (next) {
			update(next);
			resetInterval();
		}
	}
}
document.addEventListener("keydown", handleKeyDown);
resetInterval();

// ==============================  HERO SPARKLE TEXT  ============================= //

let index = 0,
	interval = 1000;
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const animate = (star) => {
	star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
	star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
	star.style.animation = "none";
	star.offsetHeight;
	star.style.animation = "";
};
for (const star of document.getElementsByClassName("magic-star")) {
	setTimeout(() => {
		animate(star);
		setInterval(() => animate(star), 1000);
	}, index++ * (interval / 3));
}

// =============================== Particles =============================== //

particlesJS("particles-js", {
	particles: {
		number: {
			value: 400,
			density: {
				enable: true,
				value_area: 2800
			}
		},
		color: {
			value: "#FFFFFF"
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0.5,
				color: "#152166"
			},
			image: {
				src: "",
				width: 1,
				height: 1
			}
		},
		opacity: {
			value: 1,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false
			}
		},
		size: {
			value: 2,
			random: true,
			anim: {
				enable: true,
				speed: 2,
				size_min: 0,
				sync: false
			}
		},
		line_linked: {
			enable: false,
			distance: 80,
			color: "#3c2876",
			opacity: 0,
			width: 0
		},
		move: {
			enable: true,
			speed: 0.1,
			direction: "none",
			random: true,
			straight: true,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 1000,
				rotateY: 2200
			}
		}
	}
});
// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
	// Add event listener for mouseover on elements with class "tricky"
	document.querySelectorAll('.tricky').forEach(function (element) {
		element.addEventListener('mouseover', function () {
			// Set random left and top positions using inline styles
			element.style.left = (Math.random() * 90 ) + '%';
			element.style.top = Math.random() * 90 + 200 + '%';
		});
	});

	// Add event listener for hover on elements with class "btn-wrap"
	document.querySelectorAll('.btn-wrap').forEach(function (element) {
		element.addEventListener('mouseenter', function () {
			// Toggle the "active" class
			element.classList.add('active');
		});
		element.addEventListener('mouseleave', function () {
			// Toggle the "active" class
			element.classList.remove('active');
		});
	});

	// Add touchstart event for elements with class "tricky"
	document.querySelectorAll('.tricky').forEach(function (element) {
		element.addEventListener('touchstart', function () {
			// Set random left and top positions using inline styles
			element.style.left = Math.random() * 90 + '%';
			element.style.top = Math.random() * 90 + '%';
		});
	});
});
