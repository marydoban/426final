/*
// const highScoresList = document.querySelector("#highScoresList")
// const highScores = JSON.parse(localStorage.getItem('highScores')) || []
// highScoresList.innerHtml = 
// highScores.map(score => {
//     return '<li class = "high-score"> ${score.name} - {score.score}</li>'
// }).join(" ")*/
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
        console.log(this)

	}
});

xhr.open("GET", "https://healthruwords.p.rapidapi.com/v1/quotes/?id=731&size=medium&maxR=1&t=Wisdom");
xhr.setRequestHeader("x-rapidapi-key", "97570cb704mshb66709b67f0718bp117926jsn2847dee4eeb6");
xhr.setRequestHeader("x-rapidapi-host", "healthruwords.p.rapidapi.com");

xhr.send(data);


    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://healthruwords.p.rapidapi.com/v1/quotes/?id=731&size=medium&maxR=1&t=Wisdom",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "97570cb704mshb66709b67f0718bp117926jsn2847dee4eeb6",
    //         "x-rapidapi-host": "healthruwords.p.rapidapi.com"
    //     }
    // };
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });


