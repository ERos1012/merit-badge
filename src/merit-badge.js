import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/absolute-position-behavior/absolute-position-behavior.js";
import "../src/badge-sticker.js";

class MeritBadge extends LitElement {
  static properties = {
    unlocked: { type: Boolean },
    date: { type: String },
    logo: { type: String },
    title: { type: String },
    detailsIcon: { type: String },
    verificationLink: { type: String },
    skills: { type: Array },
    criteriaName: { type: String },
  };

  static styles = css`
    #badge {
      width: 100px;
      height: 100px;
      background: blue;
      border-radius: 50%;
    }
    simple-icon {
      --simple-icon-width: 120px;
      --simple-icon-height: 120px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <badge-sticker id="badge">
        <simple-icon-button
          icon="cancel"
          @click="${this.skillClick}"
        ></simple-icon-button>
      </badge-sticker>

      <absolute-position-behavior
        justify
        position="bottom"
        allow-overlap
        sticky
        auto
        .target="${this.activeNode}"
        ?hidden="${!this.skillsOpened}"
      >
      </absolute-position-behavior>
    `;
  }
}

customElements.define("merit-badge", MeritBadge);
