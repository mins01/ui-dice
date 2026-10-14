
export default class Dice6Element extends HTMLElement {
  static define(name='dice-6'){
    customElements.define(name, this);
  }
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width:200px;
          
        }
      .dice-container{
        aspect-ratio: 1/1;
        transform-style: preserve-3d;
        perspective: 100cqw;
        container-type: inline-size;
        width: 100%;
        height: 100%;
      }
      .dice {
        --size: 100cqw;
        --half-size: 50cqw;

        --rx:15deg;
        --ry:15deg;
        --rmx:0deg;
        --rmy:0deg;

        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateX( calc( var(--rx) + var(--rmx) ) ) rotateY( calc( var(--ry) + var(--rmy) ) );
        transition: transform 2s cubic-bezier(.25,.1,.5,1.1);
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
        xtransform: rotateX(calc(var(--rx) + 360deg * 10)) rotateY(calc(var(--ry) + 360deg * 10));
      }
      .dice[data-rotation-multiplier="2"]{
        --rmx:-3600deg;
        --rmy:3600deg;  
        xtransform: rotateX(calc(var(--rx) - 360deg * 10)) rotateY(calc(var(--ry) + 360deg * 10));
      }
      .dice[data-rotation-multiplier="3"]{
        --rmx:-3600deg;
        --rmy:-3600deg;  
        xtransform: rotateX(calc(var(--rx) - 360deg * 10)) rotateY(calc(var(--ry) - 360deg * 10));
      }
      .dice[data-rotation-multiplier="4"]{
        --rmx:3600deg;
        --rmy:-3600deg;  
        xtransform: rotateX(calc(var(--rx) + 360deg * 10)) rotateY(calc(var(--ry) - 360deg * 10));
      }




      .dice[data-value="1"] {
          --rx: 15deg;
          --ry: 15deg;
      }

      .dice[data-value="2"] {
          --rx: 15deg;
          --ry: -75deg;
      }

      .dice[data-value="3"] {
          --rx: 15deg;
          --ry: -165deg;
      }

      .dice[data-value="4"] {
          --rx: 15deg;
          --ry: 105deg;
      }

      .dice[data-value="5"] {
          --rx: -75deg;
          --ry: 15deg;
      }

      .dice[data-value="6"] {
          --rx: 105deg;
          --ry: 15deg;
      }

      .dice[data-value="99"] {
          --rx: calc(360deg * 10);
          --ry: calc(360deg * 10);
      }
      </style>
      <div class="dice-container" part="dice-container">
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

    if (!Number.isInteger(value) || value < 1 || value > 6) {
      throw new RangeError('Dice value must be an integer between 1 and 6.');
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
      this.value = Math.floor(Math.random()*6)+1;
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
