import { css, html, LitElement } from "lit";

/**
 * @element type-writer
 * @summary Makes your text appear as if it's being typed in real time. Suppors `prefers-reduced-motion`.
 *
 * @slot - Default slot.
 *
 * @attr {Boolean} typing - Triggers the typing animation to start.
 * @attr {Boolean} inline - Sets display to inline-grid instead of block-level grid.
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
export default class TypeWriter extends LitElement {
  constructor() {
    super();
    this.typing = false;
    this.typed = false;
  }

  static styles = css`
    :host {
      display: grid;
      justify-content: start;
      visibility: hidden;
    }

    :host([inline]) {
      display: inline-grid;
    }

    :host([typing]),
    :host([typed]) {
      visibility: visible;
    }

    :host([typing]) ::slotted(*) {
      border-inline-end: var(--kb-cursor-border-size, 3px) solid transparent;
      overflow: clip;
      overflow-block: initial;
      white-space: nowrap;
    }

    @media (prefers-reduced-motion: no-preference) {
      :host([typing]) ::slotted(*) {
        animation-delay: var(--kb-delay-typing, 1s), var(--kb-delay-cursor, 0s);
        animation-direction: normal, normal;
        animation-duration: var(--kb-duration-typing, 1.5s), var(--kb-duration-cursor, 0.5s);
        animation-fill-mode: both, none;
        animation-iteration-count: var(--kb-count-typing, 1), var(--kb-count-cursor, 10);
        animation-name: kb-typing, kb-cursor;
        animation-play-state: running, running;
        animation-timing-function: steps(var(--kb-steps-typing, 25)),
          steps(var(--kb-steps-cursor, 25));
      }
    }
  `;

  static properties = {
    typing: { type: Boolean, reflect: true },
    typed: { type: Boolean, reflect: true },
  };

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

    document.head.append(animations);
  }

  #createIntersectionObserver() {
    const _intersectionObserver = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.typing = entry.isIntersecting;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(_intersectionObserver);
    observer.observe(this);
  }

  #animationEnd(event) {
    if (event.animationName === "kb-cursor") {
      this.typing = false;
      this.typed = true;
    }
  }

  render() {
    return html`<slot @animationend=${this.#animationEnd}></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#createIntersectionObserver();
    this.#createAnimationStyles();
  }
}

window.customElements.define("type-writer", TypeWriter);
