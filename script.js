const accessKey = 'XGA10RXH2p5iDrLxE-a9t7zoP1ZZzk33r5xTs_l55v8'

const formEl = document.querySelector("form")
const searchInput = document.getElementById("search-input")
const searchResult = document.querySelector(".results")
const showMoreBtn = document.querySelector("show-more-btn")

let inputData = ""
let page = 1

async function searchImages() {
    inputData = searchInput.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()  
    
    const results = data.results
    
    if(page === 1) {
        searchResult = ""
    }

    results.map(result => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.link.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        imageWrapper.appendChild(imageWrapper)

        page++

        if(page > 1) {
            showMoreBtn.style.display = "block"
        }
    })
}

formEl.addEventListener("submit", eve => {
    eve.preventDefault()
    page = 1
    searchImages()
})


showMoreBtn.addEventListener("click", eve => {
    eve.preventDefault()
    page = 1
    searchImages()
})