import '../stories/global.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0b0b0d',
        },
        {
          name: 'card',
          value: '#1f1d20',
        },
        {
          name: 'elevated',
          value: '#2a282b',
        },
      ],
    },

    docs: {
      canvas: {
        backgroundColor: '#0b0b0d',
      },
    },
  },
};

export default preview;
