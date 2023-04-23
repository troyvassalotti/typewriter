import { css, html, LitElement } from "lit";
import styles from "./index.styles";

/**
 * @element type-writer
 * @summary Makes your text appear as if it's being typed in real time. Suppors `prefers-reduced-motion`.
 *
 * @slot - Default slot.
 *
 * @attr {Boolean} typing - Triggers the typing animation to start.
 *
 * @cssprop --kb-cursor-border-size - The width of the cursor.
 * @cssprop --kb-delay-typing - Typing animation delay.
 * @cssprop --kb-delay-cursor - Cursor animation delay.
 * @cssprop --kb-duration-typing - Typing animation duration.
 * @cssprop --kb-duration-cursor - Cursor animation duration.
 * @cssprop --kb-count-typing - Typing animation iteration count.
 * @cssprop --kb-count-cursor - Cursor animation iteration count.
 * @cssprop --kb-steps-typing - Typing animation timing function steps.
 * @cssprop --kb-steps-cursor - Cursor animation timing function steps.
 */
export class Typewriter extends LitElement {
  static styles = styles;

  static properties = {
    typing: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.typing = false;
  }

  #createAnimationStyles() {
    const id = "type-writer-styles";

    if (document.getElementById(id)) {
      return;
    }

    const animations = document.createElement("style");
    animations.id = id;

    animations.innerHTML = css`
      @keyframes kb-typing {
        0% {
          inline-size: 0;
        }

        99% {
          inline-size: 100%;
          white-space: nowrap; /* Keep white-space nowrap until the very last minute */
        }

        100% {
          white-space: normal;
        }
      }

      @keyframes kb-cursor {
        0% {
          border-inline-end-color: currentColor;
        }

        100% {
          border-inline-end-color: transparent;
        }
      }
    `;

    this.prepend(animations);
  }

  #startTyping() {
    this.typing = true;
  }

  render() {
    this.#createAnimationStyles();
    return html` <slot></slot>`;
  }

  firstUpdated() {
    const _intersectionObserver = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.#startTyping();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(_intersectionObserver);
    observer.observe(this);
  }
}

customElements.define("type-writer", Typewriter);
