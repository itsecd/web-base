class Slider {
    constructor(
        element,
        auto
    ) {
        this.currentSlide = {
            id: 0,
            element: undefined
        };
        this.slides = [];
        this.container = element;
        this.content = undefined;
        this.containerHeight = 0;
        this.slideCooldown = 300; // ms
        this.timeoutHandler = undefined;
        this.auto = auto;
        this.timerBar = undefined;
        this.timerProgress = 0; // from 0 to 1
        this.autoChangeTime = 8000 // ms

        const changeSlide = (n) => {
            clearTimeout(this.timeoutHandler);

            if (n > this.slides.length - 1) {
                this.currentSlide.id = 0;
            } else {
                this.currentSlide.id = n;
            }

            // this check is just to check
            // whether the Slider was just initialized
            // or not (e.g. on the page fresh restart)
            if (this.currentSlide.element !== undefined) {
                this.currentSlide.element.classList.remove("quote-slider__item--active");
            }

            const prevSlide = this.currentSlide.element;
            this.currentSlide.element = this.slides[this.currentSlide.id];
            this.currentSlide.element.classList.remove("quote-slider__item--prev");
            this.currentSlide.element.classList.add("quote-slider__item--active");
            this.currentSlide.element.style.left = "150%";

            this.timeoutHandler = setTimeout(() => {
                if (prevSlide) {
                    prevSlide.classList.add("quote-slider__item--prev");
                    prevSlide.style.left = "-150%";
                }
            }, this.slideCooldown);
        }

        if (element) {
            this.content = element.querySelector(".quote-slider__content");
            this.timerBar = element.querySelector(".quote-slider__timer-bar");
            const slides = element.querySelectorAll(".quote-slider__item");
            const btnCtrlNext = element.querySelector(".quote-slider__control--next");
            
            this.slides = slides;

            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                const height = slide.getBoundingClientRect().height;
                slide.style.height = `${height}px`;
                if (this.containerHeight < height) this.containerHeight = height;

                // the zero-timeout is a small workaround
                // in order to prevent the sudden shrinking
                // of the slide item, triggered by an application
                // of an "absolute" position. so we wait until the
                // processing thread is freed.
                // poggers
                setTimeout(() => {
                    slide.classList.add("quote-slider__item--ready");
                    this.content.style.height = `${this.containerHeight}px`;
                }, 0);
            }

            if (this.auto) {
                setInterval(() => {
                    if (this.timerBar) {
                        if (this.timerProgress < 1) {
                            this.timerProgress += 1 / (this.autoChangeTime / 10);
                            this.timerBar.style.width = `${this.timerProgress * 100}%`;
                        }
                        if (this.timerProgress >= 1) {
                            changeSlide(this.currentSlide.id + 1);
                            this.timerProgress = 0;
                            this.timerBar.style.width = 0;
                        }
                    }
                }, 10);
            }

            changeSlide(0);

            btnCtrlNext.onclick = () => changeSlide(this.currentSlide.id + 1);
        } else {
            throw new Error(`The provided element ${element} does not exist.`);
        }
    }
}