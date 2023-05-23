const DOM = {
    Homeb: document.querySelector("#Home"),
    content: document.querySelector("#content"),
    Live: document.querySelector("#Live"),
    chart: document.querySelector("#Chart"),
    about: document.querySelector("#About"),
    inputs: document.querySelector(".inputs2"),
    button: getbuttonsearch(),
    input: getinput(),
    time: null,
    info: document.querySelector("#info"),
    credit: document.querySelector("#credit"),
}
const CHECHE = JSON.parse(localStorage.getItem("cheche")) || []
const coinsfromlocal = JSON.parse(localStorage.getItem("coins")) || []
const arreytoggle = []
const arreytogglevalues = []
function initHome() {
    drewfromlocalorapi()
    gettime()
    console.log(DOM.time)
    DOM.about.addEventListener("click", getmyinfo)
    DOM.Homeb.addEventListener("click", getallcoinsfromlocal)
    DOM.Live.addEventListener("click", getvaluesfromcoins)

}
function drewfromlocalorapi() {
    if (!Array.isArray(coinsfromlocal)) return
    if (coinsfromlocal.length > 0) {
        getallcoinsfromlocal()
    }
    else {
        getallcoins()
    }
}

function drewcoins(coins) {
    if (!Array.isArray(coins)) return
    const AllCoins = coins.map((coin) => {
        const divcard = document.createElement("div")
        const divcardbody = document.createElement("div")
        const h5 = document.createElement("h5")
        const p = document.createElement("p")
        const maindiv = document.createElement("div")
        const buttoninfo = document.createElement("button")
        const updiv = document.createElement("div")
        const toggle = gettogglebutton(coin)
        divcard.id = "divcard"
        maindiv.id = "maindiv"
        buttoninfo.id = coin.id
        updiv.id = "divtoggle"
        divcardbody.classList.add("card-body")
        divcard.classList.add("card", "text-white")
        h5.classList.add("card-title")
        p.classList.add("card-text")
        buttoninfo.classList.add("buttoninfo")
        p.innerText = coin.name
        h5.innerText = coin.symbol.toUpperCase()
        buttoninfo.innerText = "More Info"
        buttoninfo.style.marginBottom = "3px"
        maindiv.style.display = "none"
        buttoninfo.addEventListener("click", function (e) {
            console.log(DOM.time)
            if (!Array.isArray(CHECHE) || !DOM.time === 'number') return
            const findchech = CHECHE.find((c) => {
                return (c.id === e.target.id)
            })
            if (findchech && DOM.time < 120) {
                collapse(maindiv)
                getfromlocal(e.target.id, maindiv)
                DOM.time = 0
            }
            else if (DOM.time >= 120) {
                collapse(maindiv)
                getinfocoinsbyidfromAPI(e.target.id, maindiv)
                DOM.time = 0
            }
            else {
                collapse(maindiv)
                getinfocoinsbyidfromAPI(e.target.id, maindiv)
            }
        })
        updiv.append(h5, toggle)
        divcardbody.append(updiv, p, buttoninfo, maindiv)
        divcard.append(divcardbody)
        return divcard
    })
    DOM.content.append(...AllCoins)

}

async function getallcoins() {
    if (!Array.isArray(arreytoggle)) return
    try {
        homebutton()
        clean()
        DOM.inputs.append(DOM.input, DOM.button)
        DOM.content.append(showLoader())
        const coins = await getAPIcoins()
        coinsfromlocal.push(coins)
        localStorage.setItem("coins", JSON.stringify(coinsfromlocal))
        search(coins)
        drewcoins(coins)
        DOM.credit.append(drewcredit())
    } catch (error) {
        homebutton()
        DOM.content.append(errorH1(error))
    }
    finally {
        removeLoader()
    }
}

function getallcoinsfromlocal() {
    homebutton()
    clean()
    DOM.inputs.append(DOM.input, DOM.button)
    search(coinsfromlocal[0])
    drewcoins(coinsfromlocal[0])
    DOM.credit.append(drewcredit())

}

function homebutton() {
    DOM.Homeb.classList.remove("btn-outline-primary")
    DOM.Homeb.classList.add("btn-primary")
    DOM.Live.classList.remove("btn-primary")
    DOM.Live.classList.add("btn-outline-primary")
    DOM.about.classList.remove("btn-primary")
    DOM.about.classList.add("btn-outline-primary")
}

function Livebutton() {
    DOM.Live.classList.remove("btn-outline-primary")
    DOM.Live.classList.add("btn-primary")
    DOM.Homeb.classList.remove("btn-primary")
    DOM.Homeb.classList.add("btn-outline-primary")
    DOM.about.classList.remove("btn-primary")
    DOM.about.classList.add("btn-outline-primary")
}
function aboutbutton() {
    DOM.about.classList.remove("btn-outline-primary")
    DOM.about.classList.add("btn-primary")
    DOM.Homeb.classList.remove("btn-primary")
    DOM.Homeb.classList.add("btn-outline-primary")
    DOM.Live.classList.remove("btn-primary")
    DOM.Live.classList.add("btn-outline-primary")
}

function drewcoinsinfo(infocoins) {
    const div = document.createElement("div")
    const img = getImg(infocoins.image.small)
    const ul = document.createElement("ul")
    const liusd = document.createElement("li")
    const lieur = document.createElement("li")
    const liILS = document.createElement("li")
    div.id = "divinfo"
    ul.id = "uldivinfo"
    ul.innerText = "Current Price To:"
    liusd.innerText = `USD:${infocoins.market_data.current_price.usd}$`
    lieur.innerText = `EUR:${infocoins.market_data.current_price.eur}€`
    liILS.innerText = `ILS:${infocoins.market_data.current_price.ils}₪`
    ul.append(liusd, lieur, liILS)
    div.append(img, ul)
    return div
}

function collapse(maindiv) {
    if (maindiv.style.display === "none") {
        maindiv.style.display = "block";
        maindiv.innerHTML = ""
    } else {
        maindiv.innerHTML = ""
        maindiv.style.display = "none";
    }
    return maindiv
}
async function getinfocoinsbyidfromAPI(id, maindiv) {
    try {
        maindiv.append(showLoader())
        const result = await getAPIcoinsbyId(id)
        CHECHE.push(result)
        localStorage.setItem("cheche", JSON.stringify(CHECHE))
        maindiv.append(drewcoinsinfo(result))
    } catch (error) {
        DOM.content.append(errorH1(error))
        homebutton()
    }
    finally {
        removeLoader()
    }

}

function getfromlocal(id, maindiv) {
    const findid = CHECHE.find((i) => {
        return (i.id === id)
    })
    maindiv.append(drewcoinsinfo(findid))

}

function gettogglebutton(c) {
    if (!c.id === 'string' || !Array.isArray(arreytoggle)) return
    const labeltoggle = document.createElement("label")
    const inputtoggle = document.createElement("input")
    const spantoggle = document.createElement("span")
    const spantoggle2 = document.createElement("span")
    labeltoggle.classList.add("rocker", "rocker-small")
    spantoggle.classList.add("switch-left")
    spantoggle2.classList.add("switch-right")
    inputtoggle.type = "checkbox"
    inputtoggle.id = c.symbol
    inputtoggle.value = c.id
    spantoggle.innerText = "ON"
    spantoggle2.innerText = "OFF"
    inputtoggle.addEventListener("click", function (e) {
        if (inputtoggle.checked) {
            arreytoggle.push(e.target.id)
            arreytogglevalues.push(e.target.value)
        }
        else {
            const findid = arreytoggle.findIndex((f) => {
                return f === e.target.id
            })
            arreytoggle.splice(findid, 1)
            arreytogglevalues.splice(findid, 1)
        }
        console.log(arreytoggle, arreytogglevalues)
    })
    arreytogglevalues.filter((e) => {
        if (inputtoggle.value === e) {
            inputtoggle.checked = true
        }
    })

    labeltoggle.append(inputtoggle, spantoggle, spantoggle2)
    return labeltoggle
}
async function getvaluesfromcoins() {
    try {
        Livebutton()
        clean()
        DOM.content.append(showLoader())
        if (arreytoggle.length > 5) {
            arreytoggle.length = 5
            arreytogglevalues.length = 5
            getallcoinsfromlocal(coinsfromlocal)
            alert("You Can Choose Only 5 Coins Or Less")
        }
        else if (arreytoggle.length === 0) {
            getallcoinsfromlocal(coinsfromlocal)
            alert("You Did Not Choose A Coin")
        }
        else {
            const values = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${arreytoggle}&tsyms=USD`)
            const result = await values.json()
            getChart(result)


        }

    }
    catch (error) {
        DOM.chart.append(errorH1(error))
        Livebutton()

    }
    finally {
        removeLoader()
    }

}

function getChart(result) {
    const objvaluesarrey = []
    const ArrayKEYS = []
    const ArrayVALUES = []
    ArrayVALUES.push(Object.values(result))
    ArrayKEYS.push(Object.keys(result))
    const chart = new CanvasJS.Chart("Chart", {
        animationEnabled: true,
        title: {
            text: "Converts Coins To Usd"
        },
        axisX: {
            valueFormatString: `HH:mm:ss`
        },
        axisY: {
            title: "USD",
            suffix: "$"
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries,
        },
        toolTip: {
            shared: true
        },
        data: [{
            name: ArrayKEYS[0][0] || "NOT FOUND",
            type: "spline",
            yValueFormatString: "0.#######$",
            showInLegend: true,
            dataPoints: [{ x: new Date(), y: ArrayVALUES[0][0]?.USD }]


        },
        {
            name: ArrayKEYS[0][1] || "NOT FOUND",
            type: "spline",
            yValueFormatString: "0.#######$",
            showInLegend: true,
            dataPoints: [{ x: new Date(), y: ArrayVALUES[0][1]?.USD }],

        },
        {
            name: ArrayKEYS[0][2] || "NOT FOUND",
            type: "spline",
            yValueFormatString: "0.#######$",
            showInLegend: true,
            dataPoints: [{ x: new Date(), y: ArrayVALUES[0][2]?.USD }],

        },
        {
            name: ArrayKEYS[0][3] || "NOT FOUND",
            type: "spline",
            yValueFormatString: "0.#######$",
            showInLegend: true,
            dataPoints: [{ x: new Date(), y: ArrayVALUES[0][3]?.USD }],

        },

        {
            name: ArrayKEYS[0][4] || "NOT FOUND",
            type: "spline",
            yValueFormatString: "0.#######$",
            showInLegend: true,
            dataPoints: [{ x: new Date(), y: ArrayVALUES[0][4]?.USD }]


        }]
    });



    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render()
    }
    async function getvalueevery2sec() {
        const Currentvalue = await getcurrentconvert(arreytoggle)
        objvaluesarrey.push(Object.values(Currentvalue))
        chart.data[0].dataPoints.push({ x: new Date(), y: objvaluesarrey[0][0]?.USD || "not found" })
        chart.data[1].dataPoints.push({ x: new Date(), y: objvaluesarrey[0][1]?.USD || "not found" })
        chart.data[2].dataPoints.push({ x: new Date(), y: objvaluesarrey[0][2]?.USD || "not found" })
        chart.data[3].dataPoints.push({ x: new Date(), y: objvaluesarrey[0][3]?.USD || "not found" })
        chart.data[4].dataPoints.push({ x: new Date(), y: objvaluesarrey[0][4]?.USD || "not found" })
        chart.render()
    }

    DOM.Homeb.addEventListener("click", function () {
        objvaluesarrey.splice([0], objvaluesarrey.length)
        DOM.chart.innerHTML = ""
        clearInterval(int)

    })
    const int = setInterval(getvalueevery2sec, 2000)
    chart.render()
}


function getmyinfo() {
    clean()
    aboutbutton()
    DOM.credit.append(drewcredit())
    DOM.info.append(GetMyProfile())



}

function gettime() {
    DOM.time++
    setTimeout(gettime, 1000)
}

function search(coins) {
    if (!Array.isArray(coins)) return
    DOM.button.addEventListener("click", function () {
        const findcoin = coins.filter((c) => {
            return (c?.symbol?.toLowerCase() === DOM.input.value.toLowerCase())
        })
        if (DOM.input.value === "") {
            return
        }
        DOM.content.innerHTML = ""
        drewcoins(findcoin)
    })
}
function clean() {
    DOM.info.innerHTML = ""
    DOM.content.innerHTML = ""
    DOM.chart.innerHTML = ""
    DOM.inputs.innerHTML = ""
    DOM.credit.innerHTML = ""
}
function GetMyProfile() {
    const profilediv = document.createElement("div")
    const h1 = document.createElement("h1")
    const Imgdiv = document.createElement("div")
    const p = document.createElement("p")
    const h3title = document.createElement("h3")
    const pname = document.createElement("p")
    const page = document.createElement("p")
    const pid = document.createElement("p")
    const myimg = getImg("images/myimg.jpg")
    const myimg2 = getImg("images/myimg2.jpg")
    const myimg3 = getImg("images/myimg3.jpg")
    h3title.innerText = "Profile:"
    p.innerText = "The project describes a website of world currencies where you can find out what its current value is live in addition to this there is an option to see what the price of the same currency is when converted to shekels, dollars and euros"
    h1.innerText = "My Project Cryptonite"
    pname.innerText = " Name:Amit Nahmani"
    page.innerText = "Age:23"
    pid.innerText = "ID:314705815"
    h1.id = "h1info"
    Imgdiv.id = "toflex"
    p.className = "Description"
    pname.className = "Description"
    page.className = "Description"
    pid.className = "Description"
    profilediv.className = "profilediv"
    Imgdiv.append(myimg, myimg2, myimg3)
    profilediv.append(h1, h3title, pname, page, pid, Imgdiv, p)
    return profilediv
}
initHome()




