
export default class Dice4Element extends HTMLElement {
  static define(name='dice-4'){
    customElements.define(name, this);
  }
  static MAX_VALUE = 4;
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
      .container {
        transform-style: preserve-3d;
        x-perspective: 120cqw;
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        container-type: inline-size;
        overflow:hidden;
      }

      .dice{
        pointer-events: none;
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;  
        transform: rotateX( calc( var(--rx) + var(--rmx) ) ) rotateY(calc( var(--ry) + var(--rmy) )) rotateZ(calc( var(--rz) + var(--rmz) ));
        transition: transform 2s cubic-bezier(.25,.1,.5,1.1);
      }

      :host(.debug) .face{
        outline: 2px solid #abc;
        background-color: #cba3;
      }

      .face{
        backface-visibility: hidden;
        width:100cqw;
        aspect-ratio: 1/1;
        border-radius: 100vmax;
        
        
        position: absolute;
        inset: 0;
        box-sizing: border-box;
      }
      .face:nth-child(1) {
        border-bottom-color: rgba(255, 0, 0, 0.15);
        transform:   rotateY(0deg) rotateX(19.471221deg) translateZ(17.67767cqw);
      }
      .face:nth-child(2) {
        border-bottom-color: rgba(255, 255, 0, 0.15);
        transform: rotateY(120deg) rotateX(19.471221deg) translateZ(17.67767cqw);
      }
      .face:nth-child(3) {
        border-bottom-color: rgba(0, 128, 0, 0.15);
        transform: rotateY(240deg) rotateX(19.471221deg) translateZ(17.67767cqw);
      }
      .face:nth-child(4) {
        border-bottom-color: rgba(0, 0, 255, 0.15);
        transform: rotateX(-90deg) rotateZ(180deg) translateZ(17.67767cqw);
      }
      .face::after{
        content: "";
        display: block;
        height: 100%;
        clip-path: polygon(
          50% 0,
          6.69873% 75%,
          93.30127% 75%
        );
      }
      .face:nth-child(1)::after {
        background-color: rgba(255, 0, 0, 1);
      }
      .face:nth-child(2)::after {
        background-color: rgba(255, 255, 0, 1);
      }
      .face:nth-child(3)::after {
        background-color: rgba(0, 128, 0, 1);
      }
      .face:nth-child(4)::after {
        background-color: rgb(78, 68, 216);
      }  
      .face  .number{
        position: absolute;
        z-index: 1;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top:20px;
        font-size: max(8px, 30cqw);
        font-weight: 700;
      }
      .face .number:nth-child(1){
        transform: rotateZ(0deg)
      }
      .face .number:nth-child(2){
        transform: rotateZ(120deg)
      }
      .face .number:nth-child(3){
        transform: rotateZ(240deg)
      }





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
        --rx:320deg;
        --ry:45deg;
        --rz:10deg;
      }

      .dice[data-value="2"] {
        --rx: 355deg;
        --ry: 329deg;
        --rz: 250deg;
      }

      .dice[data-value="3"] {
        --rx: 349deg;
        --ry: 32deg;
        --rz: 111deg;
      }

      .dice[data-value="4"] {
        --rx: 253deg;
        --ry: 24deg;
        --rz: 250deg;
      }



      </style>

      <div class="container">
        <div class="dice" part="dice">
          <div class="face bottom-num-4" part="face bottom-num-4">
            <div class="number number-1" part="number number-1">1</div>
            <div class="number number-2" part="number number-2">2</div>
            <div class="number number-3" part="number number-3">3</div>
          </div>
          <div class="face bottom-num-3" part="face bottom-num-3">
            <div class="number number-1" part="number number-1">1</div>
            <div class="number number-4" part="number number-4">4</div>
            <div class="number number-2" part="number number-2">2</div>
          </div>
          <div class="face bottom-num-2" part="face bottom-num-2">
            <div class="number number-1" part="number number-1">1</div>
            <div class="number number-3" part="number number-3">3</div>
            <div class="number number-4" part="number number-4">4</div>
          </div>
          <div class="face bottom-num-1" part="face bottom-num-1">
            <div class="number number-4" part="number number-4">4</div>
            <div class="number number-3" part="number number-3">3</div>
            <div class="number number-2" part="number number-2">2</div>
          </div>
        </div>
      </div>
    `;


    this.faces = shadowRoot.querySelectorAll('.face');
    this.dice = shadowRoot.querySelector('.dice');
    this.tmRolling = null;
    this.isRolling = false;
    this.rollingCount = 0;


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
    this.value = num??Math.floor(Math.random()*6)+1;

    this.dispatchEvent(new CustomEvent('stop-rolling', {
      bubbles: true,
      composed: true
    }));
  }


    
}

// customElements.define('dice-6', Dice6Element);
