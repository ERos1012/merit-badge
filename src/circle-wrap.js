import { LitElement, html, css } from "lit";
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";
const sheet = new CSSStyleSheet();

class CircleWrap extends LitElement {
  static get tag() {
    return "circle-wrap";
  }

  static get properties() {
    return {
      title: { type: String },
      date: { type: String },
    };
  }

  static get styles() {
    return css`
      .container {
        width: 300px;
        height: 300px;
        margin: 0 auto;
      }
      div.circTxt1,
      div.circTxt2 {
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        transform-origin: 50% 50%;
      }
      div.circTxt1 p {
        color: #ff0;
        font-size: 2em;
        margin: 0;
      }
      div.circTxt2 p {
        color: #f00;
        font-size: 0.8em;
        margin: 0;
      }
      @keyframes moveAround {
        0% {
          transform: rotate(-2deg);
        }
        25% {
          transform: rotate(2deg);
        }
        50% {
          transform: rotate(-2deg);
        }
        75% {
          transform: rotate(2deg);
        }
        100% {
          transform: rotate(-2deg);
        }
      }
    `;
  }

  constructor() {
    super();
    this.title = "";
    this.date = "";
  }

  render() {
    return html`<div class="container"></div>`;
  }

  updated() {
    this.generateCircularText(
      "circTxt1",
      this.title,
      90,
      -170,
      -100,
      "font-size: 20px; color:var(--simple-colors-default-theme-accent-2);",
      "transform: scaleY(-1) scaleX(-1); position:absolute"
    );
    this.generateCircularText(
      "circTxt2",
      this.date,
      90,
      90,
      -40,
      "font-size: 20px; color:var(--simple-colors-default-theme-accent-2);",
      ""
    );
  }

  generateCircularText(
    className,
    text,
    radius,
    range,
    startPos,
    css,
    bottomCss
  ) {
    const textArr = text.split("");
    const container = this.shadowRoot.querySelector(".container");
    const containerHeight = container.clientHeight;
    const newElement = document.createElement("div");
    newElement.setAttribute("class", className);

    const deg = range / textArr.length;
    textArr.forEach((ch) => {
      ch = `<p style="height:${radius}px;${css};transform:rotate(${startPos}deg);left:50%;top:${
        containerHeight / 2 - radius
      }px;position:absolute;transform-origin:0 100%">
             <span style="${bottomCss}">${ch}</span>
           </p>`;
      newElement.innerHTML += ch;
      startPos += deg;
    });

    container.appendChild(newElement);
  }
}

customElements.define(CircleWrap.tag, CircleWrap);
