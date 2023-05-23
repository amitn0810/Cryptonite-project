async function getAPIcoins() {
    const results = []
    const Coins = await fetch("https://api.coingecko.com/api/v3/coins/list")
    const result = await Coins.json()
    for (let index = 1120; index < 1220; index++) {
        results.push(result[index])
    }
    return results
}


async function getAPIcoinsbyId(id) {
    const Coins = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const result = await Coins.json()
    return result
}


async function getcurrentconvert(arreytoggle) {
    const Coins = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${arreytoggle}&tsyms=USD`)
    const result = await Coins.json()
    return result
}


