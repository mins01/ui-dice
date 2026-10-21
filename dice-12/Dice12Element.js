
export default class Dice12Element extends HTMLElement {
  static define(name='dice-12'){
    customElements.define(name, this);
  }
  static MAX_VALUE = 12;
  constructor() {
    super();

    
    

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `<style>
      :host {
        display: inline-block;
        width:100%;
        aspect-ratio: 1/1;
        --rx:320deg;
        --ry:45deg;
        --rz:10deg;

        --rmx:0deg;
        --rmy:0deg;
        --rmz:0deg;
      }
      .host {
        width: 200px;
        height: 200px;
        display: inline-block;
        /* width:100%; */
        aspect-ratio: 1/1;
        --rx: 0deg;
        --ry: 45deg;
        --rz: 0deg;

        --rmx: 0deg;
        --rmy: 0deg;
        --rmz: 0deg;
      }

      .container {
        transform-style: preserve-3d;
        perspective: 150cqw;
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        /* container-type: inline-size; */
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dice {
        container-type: inline-size;
        aspect-ratio: 1/1;
        pointer-events: none;
        position: relative;
        margin: 0 auto;
        width: 55%;
        height: 55%;
        transform-style: preserve-3d;
        transform: rotateX(calc(var(--rx) + var(--rmx))) rotateY(calc(var(--ry) + var(--rmy))) rotateZ(calc(var(--rz) + var(--rmz)));
        /* transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg); */
        transition: transform 2s cubic-bezier(.25, .1, .5, 1.1);
      }

      :host(.debug) .face,
      .host.debug .face {
        outline: 2px solid #abc3;
        background-color: #cba3;
      }

      :host(.debug) .dice,
      .host.debug .dice {
        transition: none;
      }

      .face {
        /* backface-visibility: hidden; */
        /* width: 70.0975cqw; */
        aspect-ratio: 1/1;
        border-radius: 100vmax;


        position: absolute;
        inset: 0;
        box-sizing: border-box;
      }

      /* .face:nth-child(1) { transform: rotateY(  0deg)  translateZ(0cqw) translateY(0cqw)   rotateX(0deg); } */
      
      .face:nth-child(1)  { transform: rotateZ(121.717deg)  rotateY(54deg)  rotateX(-90deg)     translateZ(65.45085cqw); }
      .face:nth-child(2)  { transform: rotateZ(-58.283deg)  rotateY(18deg)  rotateX(153.435deg)  translateZ(65.45085cqw); }
      .face:nth-child(3)  { transform: rotateZ(-159.095deg) rotateY(-30deg) rotateX(-127.377deg) translateZ(65.45085cqw); }
      .face:nth-child(4)  { transform: rotateZ(-159.095deg) rotateY(30deg)  rotateX(10.812deg)   translateZ(65.45085cqw); }
      .face:nth-child(5)  { transform: rotateZ(121.717deg)  rotateY(-54deg) rotateX(-26.565deg)  translateZ(65.45085cqw); }
      .face:nth-child(6)  { transform: rotateZ(58.283deg)   rotateY(18deg)  rotateX(-90deg)      translateZ(65.45085cqw); }
      .face:nth-child(7)  { transform: rotateZ(-121.717deg) rotateY(18deg)  rotateX(-90deg)      translateZ(65.45085cqw); }
      .face:nth-child(8)  { transform: rotateZ(-121.717deg) rotateY(54deg)  rotateX(153.435deg)  translateZ(65.45085cqw); }
      .face:nth-child(9) { transform: rotateZ(-20.905deg)  rotateY(-30deg) rotateX(-169.188deg) translateZ(65.45085cqw); }
      .face:nth-child(10)  { transform: rotateZ(159.095deg)  rotateY(30deg)  rotateX(52.623deg)   translateZ(65.45085cqw); }
      .face:nth-child(11) { transform: rotateZ(-121.717deg) rotateY(-18deg) rotateX(-26.565deg)  translateZ(65.45085cqw); }
      .face:nth-child(12) { transform: rotateZ(-58.283deg)  rotateY(54deg)  rotateX(-90deg)      translateZ(65.45085cqw); }




      .face::after {
        content: "";
        display: block;
        height: 100%;
        clip-path: polygon(
            50% 0,
            97.5528% 34.5492%,
            79.3893% 90.4508%,
            20.6107% 90.4508%,
            2.4472% 34.5492%
        );
      }

      .face:nth-child(1)::after {   background-color: hsl(0deg   80% 70%);   }
      .face:nth-child(2)::after {   background-color: hsl(30deg  80% 70%);   }
      .face:nth-child(3)::after {   background-color: hsl(60deg  80% 70%);   }
      .face:nth-child(4)::after {   background-color: hsl(90deg  80% 70%);   }
      .face:nth-child(5)::after {   background-color: hsl(120deg 80% 70%);   }
      .face:nth-child(6)::after {   background-color: hsl(150deg 80% 70%);   }
      .face:nth-child(7)::after {   background-color: hsl(180deg 80% 70%);   }
      .face:nth-child(8)::after {   background-color: hsl(210deg 80% 70%);   }
      .face:nth-child(9)::after {   background-color: hsl(240deg 80% 70%);   }
      .face:nth-child(10)::after {  background-color: hsl(270deg 80% 70%);   }
      .face:nth-child(11)::after {  background-color: hsl(300deg 80% 70%);   }
      .face:nth-child(12)::after {  background-color: hsl(330deg 80% 70%);   }

      
      .face .number {
        position: absolute;
        z-index: 1;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20%;
        padding-bottom: 25%;
        font-size: max(8px, 40cqw);
        font-weight: 700;
      }

      .face .number::before{
        content:var(--number,"?");
      }
      .number-1{ --number:'1';}
      .number-2{ --number:'2';}
      .number-3{ --number:'3';}
      .number-4{ --number:'4';}
      .number-5{ --number:'5';}
      .number-6{ --number:'6';}
      .number-7{ --number:'7';}
      .number-8{ --number:'8';}
      .number-9{ --number:'9';}
      .number-10{ --number:'10';}
      .number-11{ --number:'11';}
      .number-12{ --number:'12';}
      .number-6 , .number-9{ text-decoration: underline;}
      
    </style>
    <style>
      .dice.rolling{
        transition: transform 1s linear;
      }
      .dice[data-rotation-multiplier="1"]{
        --rmx:3600deg;
        --rmy:3600deg;
      }
      .dice[data-rotation-multiplier="2"]{
        --rmx:-3600deg;
        --rmy:3600deg;
      }
      .dice[data-rotation-multiplier="3"]{
        --rmx:-3600deg;
        --rmy:-3600deg;
      }
      .dice[data-rotation-multiplier="4"]{
        --rmx:3600deg;
        --rmy:-3600deg;
      }

      .dice[data-value="1"] {
        --rx: 90deg;
        --ry: -54deg;
        --rz: -121.717deg;
      }

      .dice[data-value="2"] {
        --rx: -153.435deg;
        --ry: -18deg;
        --rz: 58.283deg;
      }

      .dice[data-value="3"] {
        --rx: 127.377deg;
        --ry: 30deg;
        --rz: 159.095deg;
      }

      .dice[data-value="4"] {
        --rx: -10.812deg;
        --ry: -30deg;
        --rz: 159.095deg;
      }

      .dice[data-value="5"] {
        --rx: 26.565deg;
        --ry: 54deg;
        --rz: -121.717deg;
      }

      .dice[data-value="6"] {
        --rx: 90deg;
        --ry: -18deg;
        --rz: -58.283deg;
      }

      .dice[data-value="7"] {
        --rx: 90deg;
        --ry: -18deg;
        --rz: 121.717deg;
      }

      .dice[data-value="8"] {
        --rx: -153.435deg;
        --ry: -54deg;
        --rz: 121.717deg;
      }

      .dice[data-value="9"] {
        --rx: 169.188deg;
        --ry: 30deg;
        --rz: 20.905deg;
      }

      .dice[data-value="10"] {
        --rx: -52.623deg;
        --ry: -30deg;
        --rz: -159.095deg;
      }

      .dice[data-value="11"] {
        --rx: 26.565deg;
        --ry: 18deg;
        --rz: 121.717deg;
      }

      .dice[data-value="12"] {
        --rx: 90deg;
        --ry: -54deg;
        --rz: 58.283deg;
      }

    </style>

    <div class="container">
      <div class="dice" part="dice">
        <div class="face face-1" part="face face-1"><div class="number number-1" part="number number-1"></div></div>
        <div class="face face-2" part="face face-2"><div class="number number-2" part="number number-2"></div></div>
        <div class="face face-3" part="face face-3"><div class="number number-3" part="number number-3"></div></div>
        <div class="face face-4" part="face face-4"><div class="number number-4" part="number number-4"></div></div>
        <div class="face face-5" part="face face-5"><div class="number number-5" part="number number-5"></div></div>
        <div class="face face-6" part="face face-6"><div class="number number-6" part="number number-6"></div></div>
        <div class="face face-7" part="face face-7"><div class="number number-7" part="number number-7"></div></div>
        <div class="face face-8" part="face face-8"><div class="number number-8" part="number number-8"></div></div>
        <div class="face face-9" part="face face-9"><div class="number number-9" part="number number-9"></div></div>
        <div class="face face-10" part="face face-10"><div class="number number-10" part="number number-10"></div></div>
        <div class="face face-11" part="face face-11"><div class="number number-11" part="number number-11"></div></div>
        <div class="face face-12" part="face face-12"><div class="number number-12" part="number number-12"></div></div>
      </div>
    </div>
    `;


    this.faces = shadowRoot.querySelectorAll('.face');
    this.dice = shadowRoot.querySelector('.dice');
    this.tmRolling = null;
    this.isRolling = false;
    this.rollingCount = 0;

    this.dice.dataset.value = 1;
  }

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    this.updateFace();
  }

  attributeChangedCallback() {
    if (this.faces) {
      this.updateFace();
    }
  }

  get value() {
    return Number(this.getAttribute('value') || 1);
  }

  set value(newValue) {
    const value = Number(newValue);

    if (!Number.isInteger(value) || value < 1 || value > this.constructor.MAX_VALUE) {
      throw new RangeError(`Dice value must be an integer between 1 and ${this.constructor.MAX_VALUE}.`);
    }

    this.setAttribute('value', value);
    this.dice.dataset.value = value;
  }

  updateFace() {
    const value = this.value;

    if (!Number.isInteger(value) || value < 1 || value > 6) {
      return;
    }

    this.faces.forEach((face) => {
      face.classList.toggle(
        'active',
        Number(face.dataset.value) === value
      );
    });
  }

  startRolling(){
    this.isRolling = true;
    if(this.tmRolling){ return; }
    this.dice.classList.add('rolling');
    const callback = ()=>{
      this.rollingCount++;
      this.value = Math.floor(Math.random() * this.constructor.MAX_VALUE)+1;
      this.dice.dataset.rotationMultiplier = this.rollingCount % 4 + 1;
    }
    callback();
    this.tmRolling = setInterval(callback,100)

    this.dispatchEvent(new CustomEvent('start-rolling', {
      bubbles: true,
      composed: true
    }));

  }
  stopRolling(num=null){
    if(!this.tmRolling && !num ){ return;}
    clearInterval(this.tmRolling);
    this.isRolling = false;
    this.tmRolling = null;
    this.rollingCount++;
    this.dice.dataset.rotationMultiplier = this.rollingCount % 4 + 1;
    this.rollingCount = 0;
    this.dice.classList.remove('rolling');
    this.value = num??Math.floor( Math.random() * this.constructor.MAX_VALUE )+1;

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('stop-rolling', { bubbles: true, composed: true }));
  }


    
}

// customElements.define('dice-6', Dice6Element);
