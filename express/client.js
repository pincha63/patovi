function internalHandler(u) {
    function pad(n, width = 2, z = 0) {
        wideP = ((n += '').length >= width); // tests if n has enough width
        return wideP ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function d_str(d, m = 28) {
        // gets three values 0..9 for R, G, B and creates a color Hex string like #7A6BDD
        let g = (z) => pad((m * z).toString(16), 2, 0).substring(0, 2);
        let d0 = d % 10;
        let d1 = 0.1 * ((d - d0) % 100);
        let d2 = (Math.floor(d / 100)) % 10;
        let [g0, g1, g2] = [d0, d1, d2].map((z) => g(z)); // pad and display as Hex
        return {color: ("#" + g2 + g1 + g0) , luma: (0.21 * d2 + 0.7 * d1 + 0.11 * d0).toFixed(2)};
    }
    color = d_str(u).color;
    luma = d_str(u).luma;
    document.getElementById("cute").innerHTML = `Client ${u} :: color ${color} luma ${luma}`;
    document.getElementById("cute").style.color = (luma < 3.9) ? "#FFFDFD" : "#000100"
    document.getElementById("cute").style.backgroundColor = color;
}

function externalHandler(myInput, payload) {
    fetch('/tu', {
        method: "POST",
        body: payload,
        headers: {"Content-type": "application/json; charset=UTF-8"}
   })
   .then(response => response.json()) // converts json to javascript object (sic)
   .then(data => {
       console.log(`Parsed data :: ${data.color} :: ${data.luma}`);
       document.getElementById("extr").innerHTML = `Server ${myInput} :: color ${data.color} luma ${data.luma}`;
       document.getElementById("extr").style.backgroundColor = data.color
       document.getElementById("extr").style.color = (data.luma < 3.9) ? "#FFFDFD" : "#000100"
   })
   .catch(err => console.log("Server call error"));
}

function inputHandler() {
    let x = document.getElementById("fname").value;
    let u = parseInt(x.substring(0, 3)); 
    internalInput = ((u < 0) || isNaN(u)) ? Math.floor(1000*Math.random()) : u
    externalInput = ((u < 0) || isNaN(u)) ? Math.floor(1000*Math.random()) : u
    internalHandler(internalInput)
    // let payload = JSON.stringify({ a: externalInput , b: "837" })
    externalHandler(externalInput, JSON.stringify({ a: externalInput , b: "837" }))
}

function randHandler() {
// disable the other listener for the duration, and during the duration...
// call the following one each 1500 msec
    console.log("Start randHandler")
    let fn = document.querySelector("#fname");
    fn.removeEventListener("input" , inputHandler)
    let bui = Math.floor(1000 * Math.random());
    let bue = Math.floor(1000 * Math.random());
    internalHandler(bui)
    externalHandler(bue, JSON.stringify({ a: bue , b: "000" }))
    let i = 0
    let intervalP = setInterval(() => {
        console.log("i = " + i)
        let xui = Math.floor(1000 * Math.random());
        let xue = Math.floor(1000 * Math.random());
        console.log(xui)
        console.log(xue)
        internalHandler(xui)
        externalHandler(xue, JSON.stringify({ a: xue , b: "000" }))
        if (++i === 10) {
            window.clearInterval(intervalP);
            fn.addEventListener("input" , inputHandler);
        }
    }, 1133)    
}

let fn = document.querySelector("#fname");
fn.addEventListener("input" , inputHandler); //  tu is actually http://localhost:3200/tu
let rn = document.querySelector("#randa");
rn.addEventListener("click" , randHandler);
rn.addEventListener("click", () => { console.log("Button was clicked")});
console.log("Setup done")