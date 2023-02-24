const gallery = document.querySelector ('.js');
const filtres = document.querySelector('.filtres');
const login = document.querySelector('.login');
const modifier = document.querySelector('.modifier')
const modifier1 = document.querySelector('.modifier1')
const topbar = document.querySelector('.topbar')
const modal = document.querySelector('.modal')
const mark = document.querySelector('.mark')
const galleryModal= document.querySelector('.gallery-modal')

let number= -1;
let photos= document.createElement ("div")

photos.classList.add('gallery')

gallery.appendChild(photos)



//DISTINCTION ENTRE USER ET ADMIN-------------------------------------------------------------------------------------------

console.log(localStorage.getItem('token'));

if (localStorage.getItem('token')){
        modifier.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        modifier1.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        topbar.innerHTML='<div class="edition"><span class="white"><i class="fa-regular fa-pen-to-square "></i> Mode édition </span><span class="publier">publier les changements</button> </span> '
}
else {  
        filtres.innerHTML= '<button class="filtre id0" > Tous </button>';
        let run1= funcFiltres(0);
        const tous = document.querySelector('.id0');
        tous.addEventListener('click', () => 
                {let run= worksAll(0); console.log('yo')});
}


// AFFICHAGE DE TOUTES LES PHOTOS AU DEMARRAGE ET DANS LA MODAL+ AU CLIC DU FILTRE TOUS  ----------------------------------------------------------------------------------------------------


function worksAll (num) {(fetch('http://localhost:5678/api/works')
    .then( res => res.json())
    .then ( data => {  
        let numero=num ;
        while (data[numero]){ 
            let set  = new Set ;
            set.add (data[numero].title );
            set.add(data[numero].imageUrl);
            set.add ('id'+data[numero].categoryId ); 
            photos.innerHTML += '<figure class="photos"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'"></img> <figcaption> '+ data[numero].title +'</figcaption> </figure>';
            galleryModal.innerHTML += '<figure class="photos-modal"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'"><i class="fa-solid fa-trash-can"></i></img> <figcaption> éditer </figcaption> </figure>';
            numero++
}
        const filtre = document.querySelectorAll('.filtre');
        filtre.forEach(element => { element.classList.remove('clicked');
        let find = document.querySelector('.id0');
        find.classList.add('clicked');
})
})
)};


let run = worksAll(0);  //Affiche toutes les photos au démarrage


//CREATION DES FILTRES-------------------------------------------------------------------------------------------------

function funcFiltres (n) {(fetch('http://localhost:5678/api/categories')
    .then (res => res.json())
    .then (data => {
        while (data[n]){
            filtres.innerHTML += '<div class="filtre id'+data[n].id+' " id="'+data[n].id+'"> ' +data[n].name+ ' </div>';   
            n++
};   n= 0 ;
    while(data[n]){
        let point = document.querySelector('.id'+data[n].id+'');
        point.addEventListener('click', () => {
            point.id--;
            photos.innerHTML= '<div class="nothing"></div>'; //reset les images
            let run3 = works (point.id);
            point.id++
});     n++ 
}
})
)};

//FILTRE DES IMAGES PAR LEUR CATEGORIES-------------------------------------------------------------------------------------

function works (num) {(fetch('http://localhost:5678/api/works')
    .then( res => res.json())
    .then ( data => {  
        let numero=num
        while (data[numero]){ 
            let set  = new Set ;
            set.add (data[numero].title );
            set.add(data[numero].imageUrl);
            set.add ('id'+data[numero].categoryId );
            if  ( set.has ('id'+data[num].id+'') ){ 
                const filtre = document.querySelectorAll('.filtre');
                filtre.forEach(element => { element.classList.remove('clicked')});
                let find = document.querySelector('.id'+ data[num].id+'');
                find.classList.add('clicked');
                photos.innerHTML += '<figure class="photos"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'"></img> <figcaption> '+ data[numero].title +'</figcaption> </figure>';
}           numero++
}
})
)};



// --------------------------------------------------------LOGIN -----------------------------------------------

login.addEventListener('click', ()=>
    window.location.href= 'index-login.html');


//-----------------------------------------------MODALE---------------------------------------------------------------

function modalOpen () {
        modal.classList.add('on');
        mark.addEventListener('click',() => modalClose ());
        modal.addEventListener('click', () => modalClose());
        modal.querySelector('.modal-content').addEventListener('click' ,(e) => e.stopPropagation())
};


function modalClose () {
        modal.classList.remove('on')
};



modifier.addEventListener('click', () => modalOpen());











