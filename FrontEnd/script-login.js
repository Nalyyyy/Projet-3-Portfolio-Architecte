const email = document.getElementById('email2');
const password = document.getElementById('password');
const form = document.querySelector('.loginform')

localStorage.removeItem('token');

function login () { fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email : email.value ,
        password : password.value
})
})
    .then(res => res.json())
    .then( data =>{
        console.log(data)
        if (data.token ){
            console.log('ok');
            localStorage.setItem('token', data.token);
            window.location.href= 'index.html';
            console.log(localStorage.getItem('token'));
        }       
        else if (data.message){
            alert('Erreur dans l’identifiant ou le mot de passe');;
        }
        else if (data.error){
            alert('Erreur dans l’identifiant ou le mot de passe');
        }
});
}


  
form.addEventListener('submit', (e) => 
  { e.preventDefault() ;
    let run = login()})