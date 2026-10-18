
export default class Dice8Element extends HTMLElement {
  static define(name='dice-8'){
    customElements.define(name, this);
  }
  static MAX_VALUE = 8;
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
        width: 300px;
        height: 300px;
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
        user-select:none;
        pointer-events: none;
        position: relative;
        margin: 0 auto;
        width: 80%;
        height: 80%;
        transform-style: preserve-3d;
        transform: rotateX(calc(var(--rx) + var(--rmx))) rotateY(calc(var(--ry) + var(--rmy))) rotateZ(calc(var(--rz) + var(--rmz)));
        /* transform: rotateX(0deg) rotateY(45deg) rotateZ(0deg); */
        transition: transform 2s cubic-bezier(.25, .1, .5, 1.1);
      }

      :host(.debug) .face,
      .host.debug .face {
        outline: 2px solid #abc;
        background-color: #cba3;
      }

      :host(.debug) .dice,
      .host.debug .dice {
        transition: none;
      }

      .face {
        /* backface-visibility: hidden; */
        width: 100cqw;
        aspect-ratio: 1/1;
        border-radius: 100vmax;


        position: absolute;
        inset: 0;
        box-sizing: border-box;
      }

      .face:nth-child(1) {  transform: rotateZ(0deg)   rotateY(0deg)     rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(2) {  transform: rotateZ(0deg)   rotateY(90deg)    rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(3) {  transform: rotateZ(0deg)   rotateY(180deg)   rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(4) {  transform: rotateZ(0deg)   rotateY(270deg)   rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(5) {  transform: rotateZ(180deg) rotateY(0deg)     rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(6) {  transform: rotateZ(180deg) rotateY(-90deg)   rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(7) {  transform: rotateZ(180deg) rotateY(-180deg)  rotateX(35.26deg) translateZ(35.36cqw); }
      .face:nth-child(8) {  transform: rotateZ(180deg) rotateY(-270deg)  rotateX(35.26deg) translateZ(35.36cqw); }


      .face::after {
        content: "";
        display: block;
        height: 100%;
        clip-path: polygon(50% 0,
            6.69873% 75%,
            93.30127% 75%);
      }

      .face:nth-child(1)::after { background-color: hsl(0deg 80% 70%);    }
      .face:nth-child(2)::after { background-color: hsl(45deg 80% 70%);   }
      .face:nth-child(3)::after { background-color: hsl(90deg 80% 70%);   }
      .face:nth-child(4)::after { background-color: hsl(135deg 80% 70%);    }
      .face:nth-child(5)::after { background-color: hsl(180deg 80% 70%);    }
      .face:nth-child(6)::after { background-color: hsl(225deg 80% 70%);    }
      .face:nth-child(7)::after { background-color: hsl(270deg 80% 70%);    }
      .face:nth-child(8)::after { background-color: hsl(315deg 80% 70%);    }
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
        --rx: 325deg;
        --ry: 0deg;
        --rz: 0deg;
      }

      .dice[data-value="2"] {
        --rx: 325deg;
        --ry: 270deg;
        --rz: 0deg;
      }

      .dice[data-value="3"] {
        --rx: 325deg;
        --ry: 180deg;
        --rz: 0deg;
      }

      .dice[data-value="4"] {
        --rx: 325deg;
        --ry: 90deg;
        --rz: 0deg;
      }

      .dice[data-value="5"] {
        --rx: 325deg;
        --ry: 90deg;
        --rz: 180deg;
      }
      .dice[data-value="6"] {
        --rx: 325deg;
        --ry: 0deg;
        --rz: 180deg;
      }
      .dice[data-value="7"] {
        --rx: 325deg;
        --ry: 270deg;
        --rz: 180deg;
      }
      .dice[data-value="8"] {
        --rx: 325deg;
        --ry: 180deg;
        --rz: 180deg;
      } 

    </style>

    <div class="container">
      <div class="dice" part="dice">
        <div class="face face-1" part="face face-1">
          <div class="number number-1" part="number number-1">1</div>
        </div>
        <div class="face face-2" part="face face-1">
          <div class="number number-2" part="number number-2">2</div>
        </div>
        <div class="face face-3" part="face face-1">
          <div class="number number-3" part="number number-3">3</div>
        </div>
        <div class="face face-4" part="face face-1">
          <div class="number number-4" part="number number-4">4</div>
        </div>
        <div class="face face-6" part="face face-6">
          <div class="number number-6" part="number number-6">6</div>
        </div>
        <div class="face face-5" part="face face-5">
          <div class="number number-5" part="number number-5">5</div>
        </div>
        <div class="face face-8" part="face face-8">
          <div class="number number-8" part="number number-8">8</div>
        </div>
        <div class="face face-7" part="face face-7">
          <div class="number number-7" part="number number-7">7</div>
        </div>
      </div>
    </div>
    `;


    this.faces = shadowRoot.querySelectorAll('.face');
    this.dice = shadowRoot.querySelector('.dice');
    this.tmRolling = null;
    this.isRolling = false;
    this.rollingCount = 0;

    this.value = 1;

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
