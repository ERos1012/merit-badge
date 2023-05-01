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
    details: { type: String },
    verificationLink: { type: String },
    skills: { type: String },
    badgeOpened: { type: Boolean },
    accentColor: {
      type: String,
      reflect: true,
      attribute: "accent-color",
    },
  };

  static styles = css`
    #badge {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    #unlockButton { 
      height: 50px;
      width: 100px;
      justify-content: center;
      z-index: 3;
    }
  `;

  constructor() {
    super();
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
          skills="${this.skills}"
          details="${this.details}"
          accent-color="${this.accentColor}"
          ?hidden="${!this.badgeOpened}"
        ></badge-sticker>
        <button id="unlockButton" @click=${this.badgeLock}>${this.badgeOpened ? 'Lock' : 'Unlock'}</button>
      </div>
    `;
  }

  badgeLock(e) {
    this.badgeOpened = !this.badgeOpened;
    console.log("badgeLock", this.badgeOpened);
  } 
}

customElements.define("merit-badge", MeritBadge);
