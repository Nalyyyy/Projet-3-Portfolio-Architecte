const gallery = document.querySelector ('.js');
const filtres = document.querySelector('.filtres');
const login = document.querySelector('.login');
const logout = document.querySelector('.logout');
const modifier = document.querySelector('.modifier');
const modifier1 = document.querySelector('.modifier1');
const topbar = document.querySelector('.topbar');
const modal = document.querySelector('.modaljs');
const mark = document.querySelector('.markjs');
const galleryModal= document.querySelector('.gallery-modaljs');
const modal2 = document.querySelector('.modal2js');
const mark2 = document.querySelector('.mark2js');
const suppr = document.querySelector('.suppr');
const ajoutplus = document.querySelector('.ajoutplus');
const file = document.getElementById('file');
const upload = document.querySelector('.upload');
const categorie= document.getElementById('categorie');
const p = document.getElementById('jpg.png');
const imageicon =document.querySelector('.image');
const arrow = document.querySelector('.arrow');
const title = document.getElementById('titre');
const postForm= document.querySelector('.postform')
const category = document.getElementById('categorie')
const valider = document.querySelector('.valider')

let urlImage;
let titleImage;
let categoryImage;
let number= -1;
let photos= document.createElement ("div");
let numberBin = 0;
// let tryy;

photos.classList.add('gallery');

gallery.appendChild(photos);

const tous = document.querySelector('.tous');
tous.addEventListener('click',()=>{
        worksAll (0) ;
        photos.innerHTML= '<div class="nothing"></div>';
})


//DISTINCTION ENTRE USER ET ADMIN-------------------------------------------------------------------------------------------


if (localStorage.getItem('token')){
        modifier.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        modifier1.innerHTML='<i class="fa-regular fa-pen-to-square"></i> modifier';
        topbar.innerHTML='<div class="edition"><span class="white"><i class="fa-regular fa-pen-to-square "></i> Mode édition </span><span class="publier">publier les changements</button> </span> ';
        tous.classList.add('off')
        categorieModal(0);
        login.classList.add('off');
        logout.addEventListener('click', ()=> {
                localStorage.removeItem('token');
                location.reload()
        })
}
else {  
        logout.classList.add('off')
        funcFiltres(0);
       
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
                        photos.innerHTML += '<figure class="photos work'+data[numero].id+'"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'"></img> <figcaption> '+ data[numero].title +'</figcaption> </figure>';
                        galleryModal.innerHTML += '<figure class="photos-modal binimg'+data[numero].id+'"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'" ><i class="fa-solid fa-trash-can foreach bin'+[numero]+'" id="'+data[numero].id+'"></i></img> <figcaption> éditer </figcaption> </figure>';
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
                };   
                n= 0 ;
                
                while(data[n]){
                        let point = document.querySelector('.id'+data[n].id+'');
                        point.addEventListener('click', () => {
                                point.id--;
                                photos.innerHTML= '<div class="nothing"></div>'; //reset les images
                                let run3 = works (point.id);
                                point.id++
                        });     
                        n++ 
                }
                
                
        })
)};

//FILTRE DES IMAGES PAR LEUR CATEGORIES-------------------------------------------------------------------------------------

function works (num) {(fetch('http://localhost:5678/api/works')
        .then( res => res.json())
        .then ( data => {  
                let numero=0;
                let number= num
                number++
                while (data[numero]){ 
                        let set  = new Set ;
                        set.add (data[numero].title );
                        set.add(data[numero].imageUrl);
                        set.add ('id'+data[numero].categoryId );
                        if  ( set.has ('id'+number+'') ){ 
                                const filtre = document.querySelectorAll('.filtre');
                                filtre.forEach(element => { element.classList.remove('clicked')});
                                let find = document.querySelector('.id'+ number+'');
                                find.classList.add('clicked');
                                photos.innerHTML += '<figure class="photos"><img  src= "' + data[numero].imageUrl+'"alt="'+data[numero].title+'"></img> <figcaption> '+ data[numero].title +'</figcaption> </figure>';
                        }                   
                        numero++
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
                        console.log('yo');
                        deleteWorks(bin.id);
                });     
                n++ 
        }



        let ajouter = document.querySelector('.ajout');
        ajouter.addEventListener('click',()=> {
            modal2Open();
            modalClose();

})
          
});



suppr.addEventListener('click', ()=> {
        let bintrash = document.querySelectorAll('.foreach');
        let n=0
        while(n < bintrash.length){
                    let bin = document.querySelector('.bin'+n+'');
                    bin.click();
                    n++
        }
});





//---------------------SUPPRESSION DE TRAVAUX DEPUIS LA MODALE-------------------------------------------------------------------
 
function deleteWorks (id) { 
     fetch(`http://localhost:5678/api/works/${id}`, { 
             method: 'DELETE', 
             headers:{ 
                     Authorization: `Bearer ${localStorage["token"]}`, 
            } 
     }) 
    .then(res => { 
            if(res.ok) { 
                    let work = document.querySelector(`.work${id}`);
                    let binwork = document.querySelector(`.binimg${id}`);
                    work.classList.add('off');
                    binwork.classList.add('off');
                    console.log('ok');
                    numberBin--
            } 
            else {console.log('bug');}
     }) 
     .catch((error) => {console.log(error)}); 
 }



//------------------------------------------MODAL 2 ---------------------------------------------------------------------------------

function modal2Open () {
        category.value = null;
        modal2.classList.add('on');
        mark2.addEventListener('click',() => modal2Close ());
        modal2.addEventListener('click', () => modal2Close());
        modal2.querySelector('.modal2-contentjs').addEventListener('click' ,(e) => e.stopPropagation());
        
        arrow.addEventListener('click', ()=>{
                modal2Close();
                modalOpen();
        })
};


function modal2Close () {
        modal2.classList.remove('on');
        mark2.removeEventListener('click',() => modalClose ());
        modal2.removeEventListener('click', () => modalClose());
        modal2.querySelector('.modal2-contentjs').removeEventListener('click' ,(e) => e.stopPropagation());
        formSubmit()
};


function categorieModal (n) {(fetch('http://localhost:5678/api/categories')
        .then (res => res.json())
        .then (data => {
                while (data[n]){
                        categorie.innerHTML += '<option class="' +data[n].name+ '" id="'+data[n].id+'" value="'+data[n].id+'"> ' +data[n].name+ ' </option>';   
                        n++
                        numberBin++
                };
        })
)};


//------------------------------------------AJOUT DES TRAVAUX--------------------------------------------------------------------------

ajoutplus.addEventListener('click' ,()=> file.click());

const imgModal = new Image();

file.addEventListener('change', (event)=>{
        const img= event.target.files;
        console.log(img);
        const reader = new FileReader();
        console.log(reader);
	    reader.readAsDataURL(file.files[0])
        console.log(file.files[0]);
        
        reader.addEventListener('load', ()=>{
                const url = reader.result;
                urlImage = file.files[0];
                console.log(url);
                imgModal.src = url;
                upload.appendChild(imgModal)
                ajoutplus.classList.add('off');
                p.classList.add('off');
                imageicon.classList.add('off');
        })
})



document.addEventListener('keydown' ,(e)=>{ 
        if(urlImage && title.value && category.value){
                valider.classList.add('green')
        }else{
                valider.classList.remove('green')
        }
} )





postForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        
        if(urlImage && title.value && category.value){
                dataForm.append("image",urlImage)
                dataForm.append("title", title.value)
                dataForm.append("category", category.value )
                // tryy = new URLSearchParams(dataForm);
                // console.log(Array.from(dataForm));
                // console.log(tryy);
                postWorks()

        }else{
                alert('Veuillez renseigner tout les champs')
        }
})
 
let dataForm = new FormData();



function postWorks () 
 {      
     fetch(`http://localhost:5678/api/works`, { 
             method: 'POST', 
             headers:{ 
                    Authorization: `Bearer ${localStorage["token"]}`, 
            } ,
            body: dataForm
            
     }) .then(res => { 
                if(res.ok) { 
                        console.log('ok');
                        formSubmit()
                        photos.innerHTML += '<figure class="photos"><img  src= "http://localhost:5678/images/' + urlImage.name+'"alt="'+ title.value+'"></img> <figcaption> '+  title.value +'</figcaption> </figure>';
                        galleryModal.innerHTML += '<figure class="photos-modal "><img  src= "http://localhost:5678/images/' + urlImage.name +'"alt="'+title.value+'" ><i class="fa-solid fa-trash-can foreach bin" ></i></img> <figcaption> éditer </figcaption> </figure>';
                        urlImage=null;
                        title.value = null;
                } 
                else {return};

        }).catch((error) => {
                console.log(error);
                console.log('erreur')}); 
 }

function formSubmit() {
       
        category.value = null;
        ajoutplus.classList.remove('off');
        p.classList.remove('off');
        imageicon.classList.remove('off');
        dataForm = null;
        dataForm = new FormData();
        console.log(upload.childElementCount);
        if (upload.childElementCount ==5 ){upload.removeChild(imgModal)}
}

