const gallery = document.querySelector ('.js');
const filtres = document.querySelector('.filtres');
const login = document.querySelector('.login');
const modifier = document.querySelector('.modifier');
const modifier1 = document.querySelector('.modifier1');
const topbar = document.querySelector('.topbar');
const modal = document.querySelector('.modaljs');
const mark = document.querySelector('.markjs');
const galleryModal= document.querySelector('.gallery-modaljs');
const modal2 = document.querySelector('.modal2js');
const mark2 = document.querySelector('.mark2js');
const suppr = document.querySelector('.suppr');

let number= -1;
let photos= document.createElement ("div");

photos.classList.add('gallery');

gallery.appendChild(photos);



//DISTINCTION ENTRE USER ET ADMIN-------------------------------------------------------------------------------------------

console.log(localStorage.getItem('token'));

if (localStorage.getItem('token')){
        modifier.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        modifier1.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        topbar.innerHTML='<div class="edition"><span class="white"><i class="fa-regular fa-pen-to-square "></i> Mode édition </span><span class="publier">publier les changements</button> </span> '
}
else {  
        filtres.innerHTML= '<button class="filtre id0 " > Tous </button>';
        let run1= funcFiltres(0);
        const tous = document.querySelector('.id0');
        tous.addEventListener('click', () => 
                {console.log('yo');
                    let run= worksAll(0)});
}


// AFFICHAGE DE TOUTES LES PHOTOS AU DEMARRAGE ET DANS LA MODAL---------------------------------------------------------------------------------------------------


function worksAll (num) {(fetch('http://localhost:5678/api/works')
    .then( res => res.json())
    .then ( data => {  
        let numero=num ;
        while (data[numero]){ 
            let set  = new Set ;
            set.add (data[numero].title );
            set.add(data[numero].imageUrl);
            set.add ('id'+data[numero].categoryId ); 
            photos.innerHTML += '<figure class="photos"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'" class ="work'+[numero]+'"></img> <figcaption> '+ data[numero].title +'</figcaption> </figure>';
            galleryModal.innerHTML += '<figure class="photos-modal"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'" class="binimg'+[numero]+'"><i class="fa-solid fa-trash-can foreach bin'+[numero]+'" id="'+[numero]+'"></i></img> <figcaption> éditer </figcaption> </figure>';
            numero++;
 
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
            filtres.innerHTML += '<button class="filtre id'+data[n].id+' " id="'+data[n].id+'"> ' +data[n].name+ ' </button>';   
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


//-----------------------------------------------MODALE OPEN/CLOSE---------------------------------------------------------------

function modalOpen () {
        modal.classList.add('on');
        mark.addEventListener('click',() => modalClose ());
        modal.addEventListener('click', () => modalClose());
        modal.querySelector('.modal-contentjs').addEventListener('click' ,(e) => e.stopPropagation())
};


function modalClose () {
        modal.classList.remove('on');
        mark.removeEventListener('click',() => modalClose ());
        modal.removeEventListener('click', () => modalClose());
        modal.querySelector('.modal-contentjs').removeEventListener('click' ,(e) => e.stopPropagation())
};



modifier.addEventListener('click', () => {
        modalOpen();

        let bintrash = document.querySelectorAll('.foreach');
        let n=0
        while(n < bintrash.length){
            let bin = document.querySelector('.bin'+n+'');
            bin.addEventListener('click', () => {
                deleteWorks(bin.id);

    });     n++ }







        let ajouter = document.querySelector('.ajout');
        ajouter.addEventListener('click',()=> {
            modal2Open();
            modalClose();

})

      //  ; let rooo =deleteWorks()             
});

suppr.addEventListener('click', ()=> {
    let bintrash = document.querySelectorAll('.foreach');
    let n=0
    while(n < bintrash.length){
            let bin = document.querySelector('.bin'+n+'');
             bin.click

;     n++}});


//----------------------------------------------------------------------------------------------------
//     let array =[];
//     let ray=[];
//     let bintrash = document.querySelectorAll('.foreach');
//     let nuuu =0;

//     for (var i = 0; i < bintrash.length; i++) {
//     ray.push (i);
//     console.log(ray);
//     var self = document.querySelector(`.bin${i}`);
//     array.push (self);
//      console.log(array);
//      array[i].addEventListener('click' ,() => console.log(array[i]))
//      nuuu++
//     console.log(self);
//     self.addEventListener('click', function (event) {  
//         event.preventDefault();
//        console.log(self)})

//     } false;
// })




//------------------------------------------------------------------------------------
      // let bintrash = document.querySelectorAll('.foreach');

// for (var i = 0; i < bintrash.length; i++) {
//     let num=0;
//     var self = document.querySelector(`.bin${i}`);
//     console.log(self);
//     self.addEventListener('click', function (event) {  
//         event.preventDefault();
//        console.log(self);

//     }, false);
// }


// });


//---------------------SUPPRESSION DE TRAVAUX DEPUIS LA MODALE-------------------------------------------------------------------
console.log(localStorage["token"]);
 
function deleteWorks (id) 
 { 
     fetch(`http://localhost:5678/api/works/${id}`, { 
         method: 'DELETE', 
         headers:{ 
              Authorization: `Bearer ${localStorage["token"]}`, 
         } 
     }) 
     .then(res => { 
         if(res.ok) { 
            let work = document.querySelector(`work${id}`);
            let binwork = document.querySelector(`binimg${id}`);
            let bin = document.querySelector(`bin${id}`);
            work.classList.add('off');
            binwork.classList.add('off');
            bin.classList.add('off');
            console.log(work);
         } 
     }) 
     .catch((error) => {console.log(error)}); 
 }





 
// function deleteWorks () {
//         const trash= document.querySelectorAll('.fa-trash-can');
//         console.log(trash);
//         trash.forEach( function each () {
//             const bin = document.querySelector('.foreach');
//             bin.addEventListener('click', ()=> trry(0));
//             bin.classList.remove('foreach');

//         }
//     );
// }

// function trry(id) {
//     fetch(`http://localhost:5678/api/works/${id}`)
//     .then (res => res.json ())
//     .then (data => console.log(data[id]))
// }



// function deleteEach () {
//         fetch('http://localhost:5678/api/works', {
//             method: 'DELETE',
//             headers: 
//         })
// }

// const trash= document.querySelectorAll('.fa-trash-can');


// trash.forEach( function  (item, idx){
//     console.log(item);
// item.addEventListener('click', ()=> {console.log('ok')})});


// function tryyyyy(id){
//     let t = document.querySelector(`.binimg${id}`)
//     console.log(t);
// }


// bintrash.forEach( function  (item, idx){
//     console.log(item);
// item.addEventListener('click', ()=> {console.log('ok')})});


//------------------------------------------MODAL 2 ---------------------------------------------------------------------------------

function modal2Open () {
    console.log(modal2);
    modal2.classList.add('on');
    mark2.addEventListener('click',() => modal2Close ());
    modal2.addEventListener('click', () => modal2Close());
    modal2.querySelector('.modal2-contentjs').addEventListener('click' ,(e) => e.stopPropagation())
};


function modal2Close () {
    modal2.classList.remove('on');
    mark2.removeEventListener('click',() => modalClose ());
    modal2.removeEventListener('click', () => modalClose());
    modal2.querySelector('.modal2-contentjs').removeEventListener('click' ,(e) => e.stopPropagation())
};








