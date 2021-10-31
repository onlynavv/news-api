/**
 * json data contains all the category names, their urls and their icons
 */

const newsCategory = [
    {
        name: 'all',
        url: 'https://inshortsapi.vercel.app/news?category=all',
        icon: '<i class="fas fa-burn"></i>'
    },
    {
        name: 'science',
        url: 'https://inshortsapi.vercel.app/news?category=science',
        icon: '<i class="fas fa-microscope"></i>'
    },
    {
        name: 'national',
        url: 'https://inshortsapi.vercel.app/news?category=national',
        icon: '<i class="far fa-flag"></i>'
    },
    {
        name: 'business',
        url: 'https://inshortsapi.vercel.app/news?category=business',
        icon: '<i class="fas fa-briefcase"></i>'
    },
    {
        name: 'sports',
        url: 'https://inshortsapi.vercel.app/news?category=sports',
        icon: '<i class="fas fa-running"></i>'
    },
    {
        name: 'world',
        url: 'https://inshortsapi.vercel.app/news?category=world',
        icon: '<i class="fas fa-globe"></i>'
    },
    {
        name: 'politics',
        url: 'https://inshortsapi.vercel.app/news?category=politics',
        icon: '<i class="fas fa-landmark"></i>'
    },
    {
        name: 'technology',
        url: 'https://inshortsapi.vercel.app/news?category=technology',
        icon: '<i class="fas fa-microchip"></i>'
    },
    {
        name: 'startup',
        url: 'https://inshortsapi.vercel.app/news?category=startup',
        icon: '<i class="far fa-building"></i>'
    },
    {
        name: 'entertainment',
        url: 'https://inshortsapi.vercel.app/news?category=entertainment',
        icon: '<i class="fas fa-film"></i>'
    },
    {
        name: 'miscellaneous',
        url: 'https://inshortsapi.vercel.app/news?category=miscellaneous',
        icon: '<i class="fas fa-info-circle"></i>'
    },
    {
        name: 'hatke',
        url: 'https://inshortsapi.vercel.app/news?category=hatke',
        icon: '<i class="fas fa-hand-holding-usd"></i>'
    },
    {
        name: 'automobile',
        url: 'https://inshortsapi.vercel.app/news?category=automobile',
        icon: '<i class="fas fa-car-alt"></i>'
    },
]

const mainSection = document.createElement('section')
document.body.append(mainSection)

const containerDiv = document.createElement('div')
mainSection.append(containerDiv)
containerDiv.setAttribute('class','container-fluid')

const nameRow = document.createElement('div')
nameRow.setAttribute('class','row name-row')

const mainRow = document.createElement('div')
mainRow.setAttribute('class','row main-row')
containerDiv.append(nameRow,mainRow)

nameRow.innerHTML = `
    <h4>Inshorts News</h4>
`

const categoryDiv = document.createElement('div')
categoryDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 category-div')
const categoryRow = document.createElement('div')
categoryRow.setAttribute('class','row category-row')
categoryDiv.append(categoryRow)

const newsDiv = document.createElement('div')
newsDiv.setAttribute('class','col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 news-div')

const latestDiv = document.createElement('div')
latestDiv.setAttribute('class', 'col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 latest-div')

mainRow.append(categoryDiv, newsDiv, latestDiv)

const sportsRow = document.createElement('div')
sportsRow.setAttribute('class','latest-row')

latestDiv.append(sportsRow)

const pageUp = document.createElement('div')
pageUp.setAttribute('class', 'page-up')
document.body.append(pageUp)
pageUp.innerHTML = `
    <p><i class="fas fa-chevron-up"></i></p>
`

/**
 * rendering the categories based on the json data
 * on clicking the categories it will call the function getNews and send url as arguement
 */
newsCategory.map((category)=>{
    const {name, url, icon} = category
    categoryRow.innerHTML += `
        <div class="btnCategory">
            <button onclick='getNews(\"${url}\")' class="category-buttons">${icon} ${name}</button>
        </div>
    `
})

/**
 * 
 * @param {string} url api url to fetch the data
 * here the function takes a default parameter when no arguements is passed, and then they fetch the data based on the category 
 * is selected
 * function will be called on onclick event and called once at initial render when no arguement is passed
 * it is a async function , where we are fetching the data from external api, so to handle with promises we have used
 * async function, and await will make the funciton to wait untill the promise gets resolved, await can be used only in
 * async function
 */
const getNews = async(url = 'https://inshortsapi.vercel.app/news?category=all') => {
    newsDiv.innerHTML = ''
    /**
     * try catch block -> to handle errors
     */
    try {
        const resp = await fetch(url)
        const newsData = await resp.json()
        newsData.data.map((item)=>{
            /**
             * destructuring an object, so that we can use them without dot notation
             */
            const {author, content, date, imageUrl, readMoreUrl, time, title} = item
            /**
             * rendering the news list based on the category got selected
             */
            newsDiv.innerHTML += `
                <div class="row news-row">
                    <div class="col-12">
                        <div class="card card-black-bg mb-5">
                            <img src=${imageUrl} alt=${title}>
                            <div class="card-body card-body-ht">
                                <h5 class="card-title mb-3">${title}</h5>
                                <p class="card-text author-info"><b>short</b> by ${author} / ${time} on ${date}</p>
                                <p class="card-text">${content}</p>
                                <a href=${readMoreUrl} target='_blank'>read more at external site</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {string} catItem category name to fetch the data
 * here the function will be called whenever the window is loaded, takes arguements and based on that it will fetch the data
 * this is to render gist of news on the right side
 */

const latestNews = async(catItem) => {

    try {
        const resp = await fetch(`https://inshortsapi.vercel.app/news?category=${catItem}`)
        const sportsData = await resp.json()
        sportsRow.innerHTML += `
            <div class="col-12 latest-heading">
                <h4>${sportsData.category}</h4>
            </div>
        `
        /**
         * the fetched data has lot of objects, so to use only few news list, slice is used so to slice some part of the array
         * slice takes index into consideration, start index and stop index, where the stop index won't be taken into consideration
         */
        const displaySports = sportsData.data.slice(0,3)
        displaySports.map((item)=>{
            const {author, imageUrl, time, title, url} = item

            sportsRow.innerHTML += `
            <div class="col-12 latest-div">
                <div class="row latestNewsRow">
                    <div class="col-8 latestRowUrl">
                        <a href=${url} target="_blank"><p>${despTruncate(title,50)}</p></a>
                        <div>
                            <p class="latest-author">${author} . ${time}</p>
                        </div>
                    </div>
                    <div class="col-4 latestImg">
                        <img  src=${imageUrl} alt=${title}>
                    </div>
                </div>
            </div>
        `
        })
    } catch (error) {
        console.log(error)
    }

}

/**
 * function calls to fetch data for respective categories, categories name are sent as parameters
 */
latestNews('sports')
latestNews('politics')
latestNews('entertainment')

/**
 * function call for initial render to fetch the data for the first time when the window gets loaded
 */
getNews()

/**
 * an event listener is added and a callback function is given to scroll to the top of the page, triggerd when clicked
 */
document.querySelector('.page-up').addEventListener('click', ()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

/**
 * 
 * @param {string} string news title is passed as an arguement
 * @param {number} n  number is mentioned as an arguement to truncate the title length
 * @returns truncated string
 * it truncates the string if it exceeds the given limit, if not returns the same title
 */
const despTruncate = (string, n) => {
    return string?.length > n ? string.substr(0,n-1) + '...' : string
}