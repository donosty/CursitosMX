const objeto = {
    nombre: "",
    email: "",
    mensaje: "",
    edad: "",
    genero: "",
  };
  
  const selectorNombre = document.querySelector("#nombre");
  const selectorEmail = document.querySelector("#email");
  const selectorMensaje = document.querySelector("#mensaje");
  const selectorEdad = document.querySelector("#edad");
  const selectorGenero = document.querySelector("#genero");
  const btnEnviar = document.querySelector('#formulario button[type="submit"]');
  const btnBorrar = document.querySelector('#formulario button[type="reset"]');
  const formulario = document.querySelector('#formulario')
  const contFormulario = document.querySelector(".container--formulario")
  
  eventListeners();
  function eventListeners() {
  
    selectorNombre.addEventListener("input", validar);
    selectorEmail.addEventListener("input", validar);
    selectorMensaje.addEventListener("input", validar);
    selectorEdad.addEventListener("input", comprobarEdad);
    selectorGenero.addEventListener("input", comprobarGenero);

    btnBorrar.addEventListener("click", function(e){

      e.preventDefault();
      resetFormulario();
    })

    btnEnviar.addEventListener("click", function(e){

      e.preventDefault();

      const texto = document.createElement('p');
      texto.textContent = 'Mensaje enviado con exito';
      texto.classList.add("bg-success", "text-light", "text-center", "mt-3", "fs-3");
      formulario.appendChild(texto);

      setTimeout(() =>{

        texto.remove();
        resetFormulario();
      }, 3000);
      
    })
  }

  
  function validar(e) {
  
    if (e.target.value.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      objeto[e.target.name] = '';
      comprobarObjeto();
      return;
    }
  
    if(e.target.id === 'email' && !validarEmail(e.target.value)){
      mostrarAlerta('El email no es valido', e.target.parentElement);
      objeto[e.target.name] = '';
      comprobarObjeto();
      return;
    }
  
    borrarAlerta(e.target.parentElement)
  
    objeto[e.target.name] = e.target.value.trim().toLowerCase();
  
    comprobarObjeto();
  }
  
  function mostrarAlerta(mensaje, e) {
  
    borrarAlerta(e)
  
    const texto = document.createElement("P");
    texto.textContent = mensaje;
    texto.classList.add("bg-danger", "text-light", "text-center", "mt-5", "fs-3");
    e.appendChild(texto);
  }
  
  function borrarAlerta(e){
  
    const alerta = e.querySelector('.bg-danger');
  
    if(alerta){
  
      alerta.remove();
    }
  }
  
  function validarEmail(email){
  
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
          const resultado = regex.test(email);
          return resultado;
  }
  
  function comprobarEdad(e){
  
    convertido = parseFloat(e.target.value)
  
    if(isNaN(convertido) || !convertido){
      
      mostrarAlerta('Debe colocar un numero', e.target.parentElement);
      objeto[e.target.name] = convertido
  
    } else if (convertido < 18 || convertido > 99){
      
      mostrarAlerta('Edad no permitida', e.target.parentElement);
      objeto[e.target.name] = convertido
      
    } else{
  
      borrarAlerta(e.target.parentElement)
      objeto[e.target.name] = convertido
  
    }
  
    comprobarObjeto();
    
  }
  
  function comprobarGenero(e){
  
    if(!e.target.value || e.target.value === 'seleccionar'){
      mostrarAlerta('Debes de elegir un genero', e.target.parentElement.parentElement)
      objeto[e.target.name] = e.target.value.toLowerCase();
  
    } else {
  
      borrarAlerta(e.target.parentElement.parentElement);
      objeto[e.target.name] = e.target.value.toLowerCase();
    }
  
    comprobarObjeto();
  
  }
  
  function resetFormulario(){
  
    objeto.nombre = ""
    objeto.email = ""
    objeto.mensaje = ""
    objeto.edad = ""
    objeto.genero = ""
    formulario.reset();
    comprobarObjeto();
  }
  
  function comprobarObjeto(){
  
    console.log(objeto);
  
    if(Object.values(objeto).includes('') || ((objeto.edad < 18 || objeto.edad > 99)) || isNaN(objeto.edad) || objeto.genero === 'seleccionar'){
  
      btnEnviar.setAttribute('disabled', 'disabled');
      return;
    } 
    
    btnEnviar.removeAttribute('disabled');
  
  }