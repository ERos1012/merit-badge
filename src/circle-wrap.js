import { LitElement, html, css } from "lit";
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";

class CircleWrap extends LitElement {
  static get tag() {
    return "circle-wrap";
  }

  static get properties() {
    return {
      title: { type: String },
      date: { type: String },
      accentColor: {
        type: String,
        reflect: true,
        attribute: "accent-color",
      },
    };
  }

  static get styles() {
    return css`
      :host([accent-color="orange"]) .container {
        color: var(--circle-wrap-accent-color, var(--simple-colors-default-theme-orange-9));
      }
      :host([accent-color="blue"]) .container {
        color: var(--circle-wrap-accent-color, white);
      }
      :host([accent-color="green"]) .container {
        color: var(--circle-wrap-accent-color, var(--simple-colors-default-theme-light-green-10));
      }
      :host([accent-color="purple"]) .container {
        color: var(--circle-wrap-accent-color, var(--simple-colors-default-theme-deep-purple-7));
      }
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
        font-size: 2em;
        margin: 0;
      }
      div.circTxt2 p {
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
      "font-size: 20px;",
      "transform: scaleY(-1) scaleX(-1); position:absolute"
    );
    this.generateCircularText(
      "circTxt2",
      this.date,
      90,
      90,
      -40,
      "font-size: 20px;",
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
