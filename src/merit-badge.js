import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "../src/circle-wrap.js";
import "../src/badge-sticker.js";
import "../src/locked-badge.js";

class MeritBadge extends LitElement {
  static properties = {
    date: { type: String },
    logo: { type: String },
    title: { type: String },
    detailsIcon: { type: String },
    verificationLink: { type: String },
    skills: { type: String },
    criteriaName: { type: String },
    badgeOpened: { type: Boolean },
  };

  static styles = css`
    #badge {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
    }
    #unlock { 
      height: 50px;
      width: 100px;
      justify-content: center;
      z-index: 3;
    }
  `;

  constructor() {
    super();
    this.skills = ["one", "two", "three"];
    this.badgeOpened = false;

  }

  render() {
    return html`
      <div id="badge">
        <locked-badge ?hidden="${this.badgeOpened}"></locked-badge>
        <badge-sticker
          id="badge-sticker"
          logo="${this.logo}"
          title="${this.title}"
          date="${this.date}"
          verificationLink="${this.verificationLink}"
          ?hidden="${!this.badgeOpened}"
        ></badge-sticker>
        <button id="unlock" @click=${this.badgeLock}>Unlock</button>
      </div>
    `;
  }

  badgeLock(e) {
    this.badgeOpened = !this.badgeOpened;
    console.log("badgeLock", this.badgeOpened);
  }
}

customElements.define("merit-badge", MeritBadge);
