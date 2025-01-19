// Json - Javascript Object Notation
// chiamata sincrona - fetch()

// .fetch() ci permette di collegarci ad un json e di prenderne i dati sottoforma di Promise per poi utilizzarli.
// .then() - Metodo che ci permette di convertire la Promise in dato stutturale e di utilizzarlo come vogliamo 

// API - Application Programming Interface - Sono chiavi che ci permettono di collegarci ad un database e di prenderne i dati

// PASSI DA FARE -------
//  1. .fetch() Mi collego al json e ottengo una Promise (Database - API - o file online)
//  2. .then() Converto la Promise in un dato (oggetto) strutturato
//  3. .then() Utilizzo il dato ottenuto come voglio


// .json() - Metodo che ci permette di convertire la Promise in un oggetto strutturato

fetch('./annunci.json').then( (response)=> response.json() ).then( (data)=> {
    data.sort( (a,b) => a.price - b.price );
    

let radioWrapper = document.querySelector('#radioWrapper'); // lista radio button
let cardWrapper = document.querySelector('#cardWrapper'); // lista prodotto


// Set() è una classe che ci permette di creare un array con elementi unici
// Array.from() - Metodo che ci permette di creare un array da un oggetto Array-like o da un oggetto iterable

function radioCreate() {
    let categories = data.map( (annuncio)=> annuncio.category  );
    let uniqueCategory = Array.from( new Set(categories) );

    //render dei radio button

    uniqueCategory.forEach( (category)=> {
        let div = document.createElement('div');
        div.classList.add('form-check');
        div.innerHTML = `
            <input type="radio" class="form-check-input" name="categories" id="${category}" value="${category}">
            <label class="form-check-label" for="${category}">${category}</label>
            `; 

        radioWrapper.appendChild(div);

        let label = document.createElement('label');
         
    } );
    
}

radioCreate();



///--------------------------- crea


function truncateWords(stringa){
    
    if ( stringa.length > 15 ){
        return stringa.split(' ')[0]+'...';
    } else {
        return stringa;
    }

}



function showCards(array){
    cardWrapper.innerHTML="";
    array.forEach( (annuncio,i)=> {
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML=`
        <img src="https://picsum.photos/${300 +i}" title="${annuncio.name}" class="img-fluid img-custom"> 
         <p class="h2" title="${annuncio.name}">${truncateWords(annuncio.name)}</p>
         <p class="h4">${annuncio.category}</p>
         <p class="lead"> € ${annuncio.price}</p>
        `;
        cardWrapper.appendChild(div);
    } ); 
}

showCards(data);

///--------------------------- filtra le categorie

let radioButtons = document.querySelectorAll('.form-check-input');

function filterByCategory(array){

    // cercare la categoria su tutti i radiobuttons che abbia l'attributo "checked"

    let category = Array.from(radioButtons).find( (button)=> button.checked ).id;

    if (category != "All") {
        let filtered = array.filter( (annuncio)=> annuncio.category == category  );
        // showCards(filtered);
        return filtered;
        
    } else {

        return array;

    }

}


radioButtons.forEach( (button)=>{
    button.addEventListener('click', ()=>{
        globalFilter();

    });
});



///--------------------------- RANGE PREZZO

let prezzo = document.querySelector("#prezzo");
let priceValue = document.querySelector("#priceValue");


function setPriceInput() {
    let prices = data.map( (annuncio)=> Number(annuncio.price) );
    prices.sort( (a,b)=> a-b);
    prezzo.max = Math.ceil (prices.pop() );
    prezzo.value = prezzo.max ;
    priceValue.innerHTML= `${prezzo.max}`;

}
setPriceInput(); 


function filterByPrice(array) {
    let filtered = array.filter(  (annuncio)=> +annuncio.price <= +prezzo.value);
    // showCards(filtered);
    return filtered;
    
}

prezzo.addEventListener('input', ()=>{
    priceValue.innerHTML= prezzo.value;
    globalFilter();

}  );



// RICERCA PER PAROLA ----------------
let wordInput = document.querySelector('#wordInput'); // parola da cercare
 
function filterByWords(array) {
    let filtered = array.filter( (annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) );
    return filtered;   
}

wordInput.addEventListener('input', ()=> {
    globalFilter();
});



// abbiamo bisogno che scattano tutti e tre i filtri ma che non sia applicata su data ma che siano concatenati tra loro

function globalFilter(){
    let filterByC = filterByCategory(data);
    

    let filterByP = filterByPrice(filterByC);
    let filterByW = filterByWords(filterByP);

    showCards (filterByW);

}




} ); // FINE FETCH