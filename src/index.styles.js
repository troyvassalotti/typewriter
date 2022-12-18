import { css } from "lit";

export default css`
  :host {
    display: grid;
    justify-content: start;
    visibility: hidden;
  }

  :host([typing]) {
    visibility: visible;
  }

  :host([typing]) ::slotted(*) {
    border-inline-end: var(--kb-cursor-border-size, 3px) solid transparent;
    color: inherit;
    overflow: hidden;
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
