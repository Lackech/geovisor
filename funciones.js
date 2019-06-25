// Initialize greeting function
function greet() {
    console.log("Hello, World!");
}

function menu(){
    var element = window.document.getElementById("menu-grande");
    console.log("Hello, World!");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
        element.classList.add("oculta");
    }else{
        element.classList.add("muestra");
        element.classList.remove("oculta");
    }
}

function mostrar1() {      
    var element = window.document.getElementById("menucito1");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar2() {      
    var element = window.document.getElementById("menucito2");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar3() {      
    var element = window.document.getElementById("menucito3");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar4() {      
    var element = window.document.getElementById("menucito4");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar5() {      
    var element = window.document.getElementById("menucito5");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar6() {      
    var element = window.document.getElementById("menucito6");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar7() {      
    var element = window.document.getElementById("menucito7");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 

function mostrar8() {      
    var element = window.document.getElementById("menucito8");
    console.log("click");
    if(element.classList.contains('muestra')){
        element.classList.remove("muestra");
    }else{
        element.classList.add("muestra");
    }
} 



// Invoke the function
var col = window.document.getElementById("dropdownMenu1");
col.addEventListener("click", menu);


// Menucito 1
var op1 = window.document.getElementById("mostrar1");
op1.addEventListener("click", mostrar1);

// Menucito 2
var op2 = window.document.getElementById("mostrar2");
op2.addEventListener("click", mostrar2);

// Menucito 3
var op3 = window.document.getElementById("mostrar3");
op3.addEventListener("click", mostrar3);

// Menucito 4
var op4 = window.document.getElementById("mostrar4");
op4.addEventListener("click", mostrar4);

// Menucito 5
var op5 = window.document.getElementById("mostrar5");
op5.addEventListener("click", mostrar5);

// Menucito 6
var op6 = window.document.getElementById("mostrar6");
op6.addEventListener("click", mostrar6);

// Menucito 7
var op7 = window.document.getElementById("mostrar7");
op7.addEventListener("click", mostrar7);

// Menucito 8
var op8 = window.document.getElementById("mostrar8");
op8.addEventListener("click", mostrar8);