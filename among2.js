const uno = document.getElementById('uno')
const dos = document.getElementById('dos')
const tres = document.getElementById('tres')
const cuatro = document.getElementById('cuatro')
const cinco = document.getElementById('cinco')
const seis = document.getElementById('seis')
const siete = document.getElementById('siete')
const ocho = document.getElementById('ocho')
const nueve = document.getElementById('nueve')
const unoA = document.getElementById('unoA')
const dosA = document.getElementById('dosA')
const tresA = document.getElementById('tresA')
const cuatroA = document.getElementById('cuatroA')
const cincoA = document.getElementById('cincoA')
const seisA = document.getElementById('seisA')
const sieteA = document.getElementById('sieteA')
const ochoA = document.getElementById('ochoA')
const nueveA = document.getElementById('nueveA')
const c1A = document.getElementById('c1A')
const c2A = document.getElementById('c2A')
const c3A = document.getElementById('c3A')
const c4A = document.getElementById('c4A')
const c5A = document.getElementById('c5A')
const c1 = document.getElementById('c1')
const c2 = document.getElementById('c2')
const c3 = document.getElementById('c3')
const c4 = document.getElementById('c4')
const c5 = document.getElementById('c5')
const btnEmpezar = document.getElementById('btnEmpezar')
const NIVELES = 5

  class Juego {
    constructor() {
      this.inicializar = this.inicializar.bind(this) 
      this.inicializar()              
      this.generarSecuencia()
      setTimeout(() => this.encenderBombilloA(), 500)       
    }

    inicializar() {        
      this.elegirValor = this.elegirValor.bind(this)           
      this.toggleBtnEmpezar()          
      this.nivel=1
      this.subnivel=0
      this.activo=false
      this.contador=0
      this.falla=false         
      this.valores = {
        uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve,
        unoA, dosA, tresA, cuatroA, cincoA, seisA, sieteA, ochoA, nueveA,
        c1, c2, c3, c4, c5, c1A, c2A, c3A, c4A, c5A
      }
    }
    toggleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
      } else{
        btnEmpezar.classList.add('hide')
      }
    }
    generarSecuencia(){
      this.secuencia = new Array(NIVELES).fill(0).map(n => Math.floor(Math.random()*9) + 1)
    }
    transformarNumero(numero){
      switch (numero){
        case 1:
          return 'unoA'
        case 2:
          return 'dosA'
        case 3:
          return 'tresA'
        case 4:
          return 'cuatroA'
        case 5:
          return 'cincoA'
        case 6:
          return 'seisA'
        case 7:
          return 'sieteA'
        case 8:
          return 'ochoA'
        case 9:
          return 'nueveA'
        }
    }
    transformarCasilla(casilla){
      switch (casilla){
        case 'uno':
          return 1
        case 'dos':
          return 2
        case 'tres':
          return 3
        case 'cuatro':
          return 4
        case 'cinco':
          return 5
        case 'seis':
          return 6
        case 'siete':
          return 7
        case 'ocho':
          return 8
        case 'nueve':
          return 9
      }
    }        
    iluminarSecuencia(){
      this.agregarEventosClick()
      for (let i = 0; i< this.nivel; i++){
        let num = this.transformarNumero(this.secuencia[i])                     
        setTimeout(()=>this.iluminarCasilla(num), 1000*i)                   
      }                       
    }
    iluminarCasilla(valor){
      this.valores[valor].classList.add('light')
      setTimeout(() => this.apagarColor(valor), 350)      
    }
    apagarColor(valor){
      this.contador++
      if(this.contador===this.nivel){
        this.activo=true
        this.iluminarRecibir()
      } 
      this.valores[valor].classList.remove('light')
    } 
    siguienteNivel(){
      if(this.nivel<NIVELES){
        this.nivel++
        this.subnivel=0
        this.contador=0
        this.activo=false
        this.apagargameBoard()
        this.encenderBombilloA()                
      }
      else{
        this.iluminarVictoria()
      }
    }
    agregarEventosClick(){
      this.valores.uno.addEventListener('click', this.elegirValor)
      this.valores.dos.addEventListener('click', this.elegirValor)
      this.valores.tres.addEventListener('click', this.elegirValor)
      this.valores.cuatro.addEventListener('click', this.elegirValor)
      this.valores.cinco.addEventListener('click', this.elegirValor)
      this.valores.seis.addEventListener('click', this.elegirValor)
      this.valores.siete.addEventListener('click', this.elegirValor)
      this.valores.ocho.addEventListener('click', this.elegirValor)
      this.valores.nueve.addEventListener('click', this.elegirValor)
    }
    eliminarEventosCLick(){
      this.valores.uno.removeEventListener('click', this.elegirValor)
      this.valores.dos.removeEventListener('click', this.elegirValor)
      this.valores.tres.removeEventListener('click', this.elegirValor)
      this.valores.cuatro.removeEventListener('click', this.elegirValor)
      this.valores.cinco.removeEventListener('click', this.elegirValor)
      this.valores.seis.removeEventListener('click', this.elegirValor)
      this.valores.siete.removeEventListener('click', this.elegirValor)
      this.valores.ocho.removeEventListener('click', this.elegirValor)
      this.valores.nueve.removeEventListener('click', this.elegirValor)
     }
    elegirValor(ev){
      const casilla = ev.target.dataset.casilla          
      const coordenada = this.transformarCasilla(casilla)            
      if(coordenada===this.secuencia[this.subnivel] && this.activo===true){                           
        this.subnivel++         
        this.encenderBombillo()
        this.encenderBotonTocado(casilla)           
        if(this.subnivel===this.nivel){                                                   
          setTimeout(() => this.apagargameBoard(), 350)
          setTimeout(()=>this.siguienteNivel(), 350)
        }
      }
      else{
        this.nivel=1
        this.apagarBombilloA()
        this.iluminarError()           
        setTimeout(() => this.iluminarError(), 700)
        setTimeout(() => this.perdiste(), 1100)                               
      }       
    }
    iluminarError(){ 
      this.valores['uno'].classList.add('lighterror')
      this.valores['dos'].classList.add('lighterror')
      this.valores['tres'].classList.add('lighterror')         
      this.valores['cuatro'].classList.add('lighterror')
      this.valores['cinco'].classList.add('lighterror')
      this.valores['seis'].classList.add('lighterror')
      this.valores['siete'].classList.add('lighterror')
      this.valores['ocho'].classList.add('lighterror')
      this.valores['nueve'].classList.add('lighterror')
      this.valores['c1'].classList.add('lighterror')
      this.valores['c2'].classList.add('lighterror')
      this.valores['c3'].classList.add('lighterror')
      this.valores['c4'].classList.add('lighterror')
      this.valores['c5'].classList.add('lighterror')
      setTimeout(() => this.apagargameBoard(), 350)
    }
    encenderBombilloA(){
      if(this.nivel == NIVELES){
        this.valores['c5A'].classList.add('light')
      }
      else if(this.nivel == (NIVELES - 1)){
        this.valores['c4A'].classList.add('light')
      }
      else if(this.nivel == (NIVELES - 2)){
        this.valores['c3A'].classList.add('light')
      }
      else if(this.nivel == (NIVELES - 3)){
        this.valores['c2A'].classList.add('light')
      }
      else if(this.nivel == (NIVELES - 4)){
        this.valores['c1A'].classList.add('light')
      }
      this.iluminarSecuencia()
    }
    apagarBombilloA(){          
      this.valores['c5A'].classList.remove('light')         
      this.valores['c4A'].classList.remove('light')
      this.valores['c3A'].classList.remove('light')
      this.valores['c2A'].classList.remove('light')
      this.valores['c1A'].classList.remove('light')          
    }
    iluminarRecibir(){          
      this.valores['uno'].classList.add('recibir')
      this.valores['dos'].classList.add('recibir')
      this.valores['tres'].classList.add('recibir')       
      this.valores['cuatro'].classList.add('recibir')
      this.valores['cinco'].classList.add('recibir')
      this.valores['seis'].classList.add('recibir')
      this.valores['siete'].classList.add('recibir')
      this.valores['ocho'].classList.add('recibir')
      this.valores['nueve'].classList.add('recibir')       
    }
    apagargameBoard(){          
      this.valores['uno'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['dos'].classList.remove('lighterror', 'light', 'recibir')         
      this.valores['tres'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['cuatro'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['cinco'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['seis'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['siete'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['ocho'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['nueve'].classList.remove('lighterror', 'light', 'recibir')
      this.valores['c5'].classList.remove('lighterror', 'light')        
      this.valores['c4'].classList.remove('lighterror', 'light')
      this.valores['c3'].classList.remove('lighterror', 'light')
      this.valores['c2'].classList.remove('lighterror', 'light')
      this.valores['c1'].classList.remove('lighterror', 'light')
    }
    encenderBombillo(){  
      if(this.subnivel==1){
        this.valores['c1'].classList.add('light')
      }
      if(this.subnivel==2){
        this.valores['c2'].classList.add('light')
      }
      if(this.subnivel==3){
        this.valores['c3'].classList.add('light')
      }
      if(this.subnivel==4){
        this.valores['c4'].classList.add('light')
      }
      if(this.subnivel==5){
        this.valores['c5'].classList.add('light')
      }
    }
    iluminarVictoria(){ 
      this.valores['uno'].classList.add('light')
      this.valores['dos'].classList.add('light')
      this.valores['tres'].classList.add('light')         
      this.valores['cuatro'].classList.add('light')
      this.valores['cinco'].classList.add('light')
      this.valores['seis'].classList.add('light')
      this.valores['siete'].classList.add('light')
      this.valores['ocho'].classList.add('light')
      this.valores['nueve'].classList.add('light')
      setTimeout(() => this.apagargameBoard(), 350)
      setTimeout(() => this.ganaste(), 400)
    }
    encenderBotonTocado(valor){
      this.valores[valor].classList.remove('recibir')
      this.valores[valor].classList.add('light')
      setTimeout(() => this.valores[valor].classList.add('recibir'), 350)
     }
    ganaste(){
      swal('Tarea completada!', 'Play gain', 'success')
      .then(() => {
        this.eliminarEventosCLick()
        this.apagarBombilloA()
        this.inicializar()
      })
    }
    perdiste(){
      swal('Tarea fallida', 'Intentar de nuevo', 'error')
      .then(() => {
        this.falla=true
        this.eliminarEventosCLick()
        this.apagarBombilloA()
        this.apagargameBoard()
        this.inicializar()
      })
    }
  }
  function empezarJuego() {
    var juego = new Juego()        
  }