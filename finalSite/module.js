function chooseState() {
    var States = ["Kansas", "California", "Florida", "Mississippi" ]
    var a = Math.floor(Math.random(1, 5)-1)
    var curr_state = States[a]
    urlState = "//api.weatherstack.com/current?access_key=Y2e71b02e0ee0a4b67a2f59d993e09e25&query=" + curr_state
    return urlState


async function getState() {
    urlUse = chooseState()
    const result = await axios({
        method: 'get',
        url: urlUse,
        withCredentials: true,
    })

const data = result.data
return data
}
export { chooseState, getState }