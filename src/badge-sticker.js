import { LitElement, html, css } from "lit";
import "../src/circle-wrap.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";

class BadgeSticker extends LitElement {
  static properties = {
    logo: { type: String },
    title: { type: String },
    date: { type: String },
    verificationLink: { type: String },
  };

  static styles = css`
    .circle {
      position: relative;
      padding: 20px;
      margin: 20px;
      width: 200px;
      height: 200px;

      background: #ff0030;
      color: #fff;
      font-size: 21px;
      font-weight: bold;
      line-height: 1.3em;
      border: 2px dashed #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #ff0030, 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
      text-shadow: -1px -1px #aa3030;
      font-weight: normal;
    }

    circle-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .logo {
      --simple-icon-width: 75px;
      --simple-icon-height: 75px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .bottom-links {
      position: absolute;
      top: 92%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-decoration: none;
    }
  `;

  constructor() {
    super();
    this.logo = "simple-icon:check";
    this.title = "Badge Title";
    this.date = "2021-01-01";
    this.verificationLink = "https://www.example.com";
  }

  render() {
    return html`
      <div class="circle">
        <circle-wrap title="${this.title}" date="${this.date}"></circle-wrap>
        <simple-icon
          class="logo"
          icon="${this.logo}"
          accent-color="purple"
        ></simple-icon>
        <div class="bottom-links">
          <simple-icon-button icon="editor:insert-link"></simple-icon-button>
          <simple-icon-button icon="star"></simple-icon-button>
          <simple-icon-button icon="description"></simple-icon-button>
        </div>
      </div>
    `;
  }
}

customElements.define("badge-sticker", BadgeSticker);
