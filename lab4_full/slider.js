class Slider {
    constructor(element, auto = false) {
        if (!element) {
            throw new Error(`Element not found`);
        }

        this._initVariables(element, auto);

        this._initDOM();

        this._setupSlides();

        this._bindEvents();

        this.changeSlide(0);

        if (this.auto) {
            this._startAutoPlay();
        }
    }

    _initVariables(element, auto) {
        this.container = element;
        this.auto = auto;
        this.currentSlide = { id: 0, element: undefined };
        this.slides = [];
        this.containerHeight = 0;
        this.slideCooldown = 300; // ms
        this.timeoutHandler = undefined;
        this.timerProgress = 0;
        this.autoChangeTime = 8000; // ms
        this.timerInterval = undefined;
    }

    _initDOM() {
        this.content = this.container.querySelector(".quote-slider__content");
        this.timerBar = this.container.querySelector(".quote-slider__timer-bar");
        this.slides = this.container.querySelectorAll(".quote-slider__item");
        this.btnCtrlNext = this.container.querySelector(".quote-slider__control--next");
    }

    _setupSlides() {
        this.slides.forEach(slide => {
            const height = slide.getBoundingClientRect().height;
            slide.style.height = `${height}px`;

            if (this.containerHeight < height) {
                this.containerHeight = height;
            }

            setTimeout(() => {
                slide.classList.add("quote-slider__item--ready");
                this.content.style.height = `${this.containerHeight}px`;
            }, 0);
        });
    }

    _bindEvents() {
        if (this.btnCtrlNext) {
            this.btnCtrlNext.onclick = () => this.changeSlide(this.currentSlide.id + 1);
        }
    }

    _startAutoPlay() {
        this.timerInterval = setInterval(() => {
            if (!this.timerBar) return;

            if (this.timerProgress < 1) {
                this.timerProgress += 1 / (this.autoChangeTime / 10);
                this.timerBar.style.width = `${this.timerProgress * 100}%`;
            } else {
                this.changeSlide(this.currentSlide.id + 1);
                this.timerProgress = 0;
                this.timerBar.style.width = 0;
            }
        }, 10);
    }

    changeSlide(n) {
        clearTimeout(this.timeoutHandler);

        let nextId = n;
        if (nextId > this.slides.length - 1) {
            nextId = 0;
        }

        if (this.currentSlide.element) {
            this.currentSlide.element.classList.remove("quote-slider__item--active");
        }

        const prevSlide = this.currentSlide.element;

        this.currentSlide.id = nextId;
        this.currentSlide.element = this.slides[this.currentSlide.id];

        const current = this.currentSlide.element;
        current.classList.remove("quote-slider__item--prev");
        current.classList.add("quote-slider__item--active");


        this.timeoutHandler = setTimeout(() => {
            if (prevSlide) {
                prevSlide.classList.add("quote-slider__item--prev");
                prevSlide.style.left = "-150%";
                current.style.left = "150%";
            }
        }, this.slideCooldown);
    }
}