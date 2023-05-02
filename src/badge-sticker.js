import { LitElement, html, css } from "lit";
import "../src/circle-wrap.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";
import "@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js";

class BadgeSticker extends LitElement {
  static properties = {
    date: { type: String },
    logo: { type: String },
    title: { type: String },
    detailsIcon: { type: String },
    details: { type: String },
    verificationLink: { type: String },
    skills: { type: String },
    skillsOpened: { type: Boolean },
    detailsOpened: { type: Boolean },
    accentColor: {
      type: String,
      reflect: true,
      attribute: "accent-color",
    },
  };

  static styles = css`
    :host([accent-color="orange"]) #circle {
      background: var(--circle-wrap-accent-color, var(--simple-colors-fixed-theme-grey-2));
      box-shadow: 0 0 0 4px var(--simple-colors-fixed-theme-grey-2),
          2px 1px 6px 4px rgba(10, 10, 0, 0.5);
        }

    :host([accent-color="blue"]) #circle {
      background: var(--circle-wrap-accent-color, var(--simple-colors-default-theme-blue-7));
      box-shadow: 0 0 0 4px var(--simple-colors-default-theme-blue-7),
      2px 1px 6px 4px rgba(10, 10, 0, 0.5);
    }

    :host([accent-color="green"]) #circle {
      background: var(--circle-wrap-accent-color, var(--simple-colors-fixed-theme-grey-2));
      box-shadow: 0 0 0 4px var(--simple-colors-fixed-theme-grey-2),
        2px 1px 6px 4px rgba(10, 10, 0, 0.5);
    }

    :host([accent-color="purple"]) #circle {
      background: var(--circle-wrap-accent-color, var(--simple-colors-fixed-theme-grey-2));
      box-shadow: 0 0 0 4px var(--simple-colors-fixed-theme-grey-2),
        2px 1px 6px 4px rgba(10, 10, 0, 0.5);
    }

    :host([accent-color="orange"]) .logo, :host([accent-color="orange"]) .bottom-links {
      --simple-icon-color: var(--simple-colors-default-theme-orange-9);
    }

    :host([accent-color="blue"]) .logo, :host([accent-color="blue"]) .bottom-links {
      --simple-icon-color: white;
    }

    :host([accent-color="green"]) .logo, :host([accent-color="green"]) .bottom-links {
      --simple-icon-color: var(--simple-colors-default-theme-light-green-10);
    }

    :host([accent-color="purple"]) .logo, :host([accent-color="purple"]) .bottom-links {
      --simple-icon-color: purple;
    }
          
    #circle {
      position: relative;
      padding: 20px;
      margin: 20px;
      width: 200px;
      height: 200px;
      background: var(--circle-wrap-accent-color, var(--simple-colors-default-theme-grey-7));

      color: #fff;
      font-size: 21px;
      font-weight: bold;
      line-height: 1.3em;
      border: 2px dashed #fff;
      border-radius: 50%;
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
      --simple-icon-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .bottom-links {
      --simple-icon-color: white;
      position: absolute;
      top: 92%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-decoration: none;
    }

    .popover {
      background-color: var(--simple-colors-default-theme-grey-4);
      border-radius: 5px;
      padding: 10px;
    }

    .verification-link {
      text-decoration: none;
  `;

  constructor() {
    super();
    this.logo = "simple-icon:check";
    this.title = "Badge Title";
    this.date = "";
    this.verificationLink = "https://www.example.com";
    this.skills = "";
    this.skillsArray = [];
    this.skillsOpened = false;
    this.detailsOpened = false;
    this.details = "Badge Details";
  }

  render() {
    return html`
      <div id="circle">
        <circle-wrap
          title="${this.title}"
          date="${this.date}"
          accent-color="${this.accentColor}"
        ></circle-wrap>
        <simple-icon class="logo" icon="${this.logo}"></simple-icon>
        <div class="bottom-links">
          <a
            class="verification-link"
            href="${this.verificationLink}"
            target="_blank"
            tabindex="-1"
          >
            <simple-icon-button icon="editor:insert-link"></simple-icon-button>
          </a>
          <simple-icon-button
            class="skillsOpen"
            icon="lock-outline"
            @click="${this.skillClick}"
            @blur="${this.skillUnfocus}"
          ></simple-icon-button>
          <simple-icon-button
            icon="description"
            @click="${this.detailsClick}"
            @blur="${this.detailsUnfocus}"
          ></simple-icon-button>
        </div>
      </div>

      <absolute-position-behavior
        class="popover"
        justify
        position="bottom"
        allow-overlap
        sticky
        auto
        .target="${this.activeNode}"
        ?hidden="${!this.skillsOpened}"
      >
        <h3>Skills</h3>
        ${this.skillsArray.map(
          (item) => html`
            <ul>
              <li>${item}</li>
            </ul>
          `
        )}
      </absolute-position-behavior>

      <absolute-position-behavior
        class="popover"
        justify
        position="bottom"
        allow-overlap
        sticky
        auto
        .target="${this.activeNode}"
        ?hidden="${!this.detailsOpened}"
      >
        <h3>Details</h3>
        <p>${this.details}</p>
      </absolute-position-behavior>
    `;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.activeNode = this.shadowRoot.querySelector("#circle");
    this.skillsArray = this.skills.split(",");
    this.date = this.getDate();
  }

  skillClick(e) {
    this.skillsOpened = !this.skillsOpened;
    this.detailsOpened = false;
    console.log("skillClick", this.skillsOpened);
  }

  detailsClick(e) {
    this.detailsOpened = !this.detailsOpened;
    this.skillsOpened = false;
    console.log("detailsClick", this.detailsOpened);
  }

  skillUnfocus(e) {
    this.skillsOpened = false;
  }

  detailsUnfocus(e) {
    this.detailsOpened = false;
  }

  getDate(e) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
  }
}

customElements.define("badge-sticker", BadgeSticker);
