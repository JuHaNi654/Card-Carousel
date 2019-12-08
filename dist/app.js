class CarouselAnimation {
    constructor({ elem, size }) {
        this.carousel = elem
        this.size = size
        this.cards = this.carousel.querySelectorAll(".card")
        this.listedStyleNames = []

        // Binding functions
        this.init = this.init.bind(this)
        this.setCardStyle = this.setCardStyle.bind(this)
        this.checkListItem = this.checkListItem.bind(this)
        this.setSelectedStyleClass = this.setSelectedStyleClass.bind(this)
        this.generatePos = this.generatePos.bind(this)
        this.init()
    }


    setCardStyle(card) {
        let startingIndex = $(this.cards).index(card)
        if (this.size === 'small') {
            startingIndex -= 1
        } else if (this.size === 'large') {
            startingIndex -= 2
        }

        for (let i = 0; i < this.listedStyleNames.length; i++) {
            this.setSelectedStyleClass(
                this.checkListItem(startingIndex),
                this.listedStyleNames[i]
            )
            startingIndex += 1
        }

    }

    setSelectedStyleClass(elemIndex, className) {
        let selectedElem = this.carousel.querySelector(`.${className}`)
        if (selectedElem !== null) {
            selectedElem.classList.remove(className)
        }
        this.cards[elemIndex].classList.add(className)
    }

    checkListItem(val) {
        if (val < 0) {
            return this.cards.length - Math.abs(val)
        }
        if (val >= this.cards.length) {
            return val - this.cards.length
        }
        return val
    }

    generatePos() {
        for (let i = 0; i < this.listedStyleNames.length; i++) {
            this.setSelectedStyleClass(i, this.listedStyleNames[i])
        }
    }

    init() {
        const listedClassNames = ['fadePrev', 'prev', 'selected', 'next', 'fadeNext']
        if (this.size === 'small') {
            this.listedStyleNames = listedClassNames.slice(1, 4)
        } else if (this.size === 'large') {
            this.listedStyleNames = listedClassNames

        }
        this.generatePos()
    }
}

const carouselObj = []
let carouselList = document.querySelectorAll(".carousel")


for (let i = 0; i < carouselList.length; i++) {
    let newCarousel = new CarouselAnimation({
        elem: document.getElementById(`${carouselList[i].id}`),
        size: document.getElementById(`${carouselList[i].id}`).dataset.type
    })
    carouselObj.push(newCarousel)
    $(`#${carouselList[i].id} .card`).click(function () {
        carouselObj[i].setCardStyle($(this))
    })
}


