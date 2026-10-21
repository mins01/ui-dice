
export default class Dice6Element extends HTMLElement {
  static define(name='dice-6'){
    customElements.define(name, this);
  }
  static MAX_VALUE = 6;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
      :host {
        display: inline-block;
        width:100%;
        aspect-ratio: 1/1;
        --rx:15deg;
        --ry:15deg;
        --rz:10deg;

        --rmx:0deg;
        --rmy:0deg;
        --rmz:0deg;
      }
      .container{
        
        transform-style: preserve-3d;
        perspective: 120cqw;
        width:100%;height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .dice {
        pointer-events: none;
        user-select: none;
        aspect-ratio: 1/1;
        container-type: inline-size;
        width: 55%;
        height: 55%;
        --size: 100cqw;
        --half-size: 50cqw;       

        position: relative;
        transform-style: preserve-3d;
        transform-origin: center center;
        transform: rotateX( calc( var(--rx) + var(--rmx) ) ) rotateY( calc( var(--ry) + var(--rmy) ) );
        transition: transform 2s cubic-bezier(.25,.1,.5,1.1);
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
        box-sizing: border-box;
        position: absolute;
        /* width: 150px;
        height: 150px; */
        width: var(--size);
        height: var(--size);

        background: white;
        border: 3px solid #999;
        border-radius: 0px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        padding: 18px;
      }

      .dot {
        width: 50%;
        height: 50%;
        background: #222;
        border-radius: 50%;

        justify-self: center;
        align-self: center;
      }

      /* 1 */
      .face1 {
        transform: rotateY(0deg) translateZ(var(--half-size));
      }

      /* 2 */
      .face2 {
        transform: rotateY(90deg) translateZ(var(--half-size));
      }

      /* 3 */
      .face3 {
        transform: rotateY(180deg) translateZ(var(--half-size));
      }

      /* 4 */
      .face4 {
        transform: rotateY(-90deg) translateZ(var(--half-size));
      }

      /* 5 */
      .face5 {
        transform: rotateX(90deg) translateZ(var(--half-size));
      }

      /* 6 */
      .face6 {
        transform: rotateX(-90deg) translateZ(var(--half-size));
      }

      .face1 .dot{
        transform:scale(1.5);
      }




      .dice.rolling{
        /* transition: transform 0.10s linear; */
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
          --rx: 15deg;
          --ry: 15deg;
      }

      .dice[data-value="2"] {
          --rx: 15deg;
          --ry: 254deg;
      }

      .dice[data-value="3"] {
        --rx: -15deg;
        --ry: 160deg;
      }

      .dice[data-value="4"] {
          --rx: -15deg;
          --ry: 105deg;
      }

      .dice[data-value="5"] {
          --rx: -60deg;
          --ry: 30deg;
      }

      .dice[data-value="6"] {
          --rx: 120deg;
          --ry: 30deg;
      }

      .dice[data-value="99"] {
          --rx: calc(360deg * 10);
          --ry: calc(360deg * 10);
      }
      </style>
      <div class="container" part="container">
        <div class="dice" part="dice" data-value="1">
          <div class="face face1">
            <span class="dot" style="grid-area:2/2"></span>
          </div>

          <div class="face face2" part="face face2">
            <span class="dot" style="grid-area:1/1"></span>
            <span class="dot" style="grid-area:3/3"></span>
          </div>

          <div class="face face3" part="face face3">
            <span class="dot" style="grid-area:1/1"></span>
            <span class="dot" style="grid-area:2/2"></span>
            <span class="dot" style="grid-area:3/3"></span>
          </div>

          <div class="face face4" part="face face4">
            <span class="dot" style="grid-area:1/1"></span>
            <span class="dot" style="grid-area:1/3"></span>
            <span class="dot" style="grid-area:3/1"></span>
            <span class="dot" style="grid-area:3/3"></span>
          </div>

          <div class="face face5" part="face face5">
            <span class="dot" style="grid-area:1/1"></span>
            <span class="dot" style="grid-area:1/3"></span>
            <span class="dot" style="grid-area:2/2"></span>
            <span class="dot" style="grid-area:3/1"></span>
            <span class="dot" style="grid-area:3/3"></span>
          </div>

          <div class="face face6" part="face face6">
            <span class="dot" style="grid-area:1/1"></span>
            <span class="dot" style="grid-area:1/3"></span>
            <span class="dot" style="grid-area:2/1"></span>
            <span class="dot" style="grid-area:2/3"></span>
            <span class="dot" style="grid-area:3/1"></span>
            <span class="dot" style="grid-area:3/3"></span>
          </div>
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
