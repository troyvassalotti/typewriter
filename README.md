# `<type-writer>`

Make your text appear as if it's being typed right before your eyes.

## Installation

Via npm: `npm install @troyv/typewriter`.

## Usage

This component accepts a default slot of content. It does not respond to `#text` nodes; content should be surrounded by _any_ HTML element.

```html
<!-- This works -->
<type-writer>
  <span>Hello world.</span>
</type-writer>

<!-- This does not work -->
<type-writer>Hello world.</type-writer>
```

Best use cases are simple lines of text.

There is a single boolean prop - `[typing]` - that _should not_ need to be set by you. An intersection observer is in place that applies it when the component is in view.

## Styling

CSS custom properties are available for altering the animations.

- `--kb-cursor-border-size` - The width of the cursor.
- `--kb-delay-typing` - Typing animation delay.
- `--kb-delay-cursor` - Cursor animation delay.
- `--kb-duration-typing` - Typing animation duration.
- `--kb-duration-cursor` - Cursor animation duration.
- `--kb-count-typing` - Typing animation iteration count.
- `--kb-count-cursor` - Cursor animation iteration count.
- `--kb-steps-typing` - Typing animation timing function steps.
- `--kb-steps-cursor` - Cursor animation timing function steps.
