let navbar = document.querySelector('#navbar' );
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let menuCustom = document.querySelector('#menu-custom');
let collapse = document.querySelector('#collapse');  



let num1 = document.querySelector('#num1');
let num3 = document.querySelector('#num3');
let num2 = document.querySelector('#num2');

let check =false;

let confirm = true;

// console.log(window.innerHeight);
// console.log(window.innerWidth);



window.addEventListener('scroll', ()=> {
let scrolled=window.scrollY;

  if (scrolled>0) {
        navbar.classList.remove('bg-scuro'); 
        navbar.classList.add ('bg-giallo');
        navbar.style.height='70px';

        collapse.classList.remove('bg-scuro'); 
        collapse.classList.add ('bg-giallo');


        links.forEach( (link)=>{
            link.style.color= 'var(--scuro)'; 
          });

        logoNavbar.src ='media/logo-blue.png';
        menuCustom.src='media/menu-black.png';
         

  } else {
    navbar.classList.add('bg-scuro');
    navbar.classList.remove ('bg-giallo');
    navbar.style.height='120px';

    collapse.classList.add('bg-scuro');
    collapse.classList.remove ('bg-giallo');


    links.forEach( (link)=>{
      link.style.color= 'var(--giallo)';
  });

  logoNavbar.src ='media/logo-giallo.png';
  menuCustom.src='media/menu-giallo.png';
  
  }
});


menuCustom.addEventListener('click', ()=> {
  
  if (check==false) {
    menuCustom.style.transform = 'rotate(-90deg)';
    check=true;

  } else { 
    menuCustom.style.transform = 'rotate(0deg)';  
    check=false;
  }
    
});


function createInterval(n,elemento,tempo){

  let counter = 0;

  let ciclo = setInterval( ()=>{

      if (counter<n) {
        counter++;
        elemento.innerHTML = counter;
      } else {
        clearInterval(ciclo);
      }

  },tempo);

  setTimeout(() => {
    confirm = true;
  }, 8000);

}

// Chiamata asincrona
// setInterval() - Crea un loop infinito in cui possiamo gestire il tempo di attesa tra una chiamata e l'altra  
// Vuole dure parametri: una funzione e un intervallo di tempo in millisecondi
 
// La funzione setInterval() restituisce un ID che possiamo usare per fermare il loop con clearInterval()






// Intersection Observer API
// intersectionObserver() - Classe del Browser che ci permette di osservare un elemento e di eseguire una funzione quando questo entra in una determinata porzione di schermo
// Vuole due parametri: un oggetto con le opzioni e una funzione di callback

// new è una parola chiave che ci permette di creare un nuovo oggetto partendo da una Classe

let observer = new IntersectionObserver( (entries)=>{ 

  entries.forEach( (entry)=>{

    if (entry.isIntersecting && confirm) {
       console.log('Elemento visibile');

        createInterval(53,num1,10);
        createInterval(28,num2,20);  
        createInterval(31,num3,90);
        confirm = false;
    }

  });

});

observer.observe(num1);


// SwiperJS


let rewiews = [ 
  { user: "Roberto", description: "Molto Bello questo sito", rank:4},
  { user: "Andrea", description: "Fa davvero schifio. Manca tutto", rank:2},
  { user: "Luca", description: "Mi ha emozionato tantissimo", rank:5},
  { user: "Tonino", description: "Belli i colori, ma non c'è nessun testo", rank:1},


];


// Crea i reviews
let swiperCustom = document.querySelector('.swiper-wrapper');

rewiews.forEach( (recensione)=>{
  let div = document.createElement('div');
  div.classList.add('swiper-slide');
  div.innerHTML = `
    <div class="swiper-slide">
        <div class="card-rewiev">
          <p class="lead text-center">${recensione.description}</p>
          <p class="h4 text-center">${recensione.user}</p>
          <div class="d-flex justify-content-center star">
            
          
          </div>
        </div> 
      </div>
    
  
  `;
  
  swiperCustom.appendChild(div);
});

let stars = document.querySelectorAll('.star');


stars.forEach( (star,index)=>{

  for (let i = 1; i <= rewiews[index].rank; i++) {
     let icon = document.createElement('i');
     icon.classList.add('fa-solid','fa-star');
    star.appendChild(icon);
    }
     
  let differenza = 5 - rewiews[index].rank;

  for (let i = 1; i <= differenza; i++) {
    let icon = document.createElement('i');
    icon.classList.add('fa-regular','fa-star');
   star.appendChild(icon);
   }


});


const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

