const images = document.querySelectorAll('[data-src]');

const options = {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        img.setAttribute('src', src);
        img.removeAttribute('data-src');
        observer.unobserve(img);
        }
    });
}, options);

images.forEach((image) => {
    observer.observe(image);
});
