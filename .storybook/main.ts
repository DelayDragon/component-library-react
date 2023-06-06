import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
    },
  },
  docs: {
    autodocs: 'tag',
  },
  // 这是一个vite进行build前进行的处理，可以分为DEVELOPMENT和PRODUCTION两种环境下的规则配置
  // viteFinal: async (config, { configType }) => {
  //   if(configType == 'DEVELOPMENT'){
  //     config.css = {
  //       preprocessorOptions: {
  //         scss: {
  //           additionalData: `
  //             @import '../src/styles/index.scss';
  //           `
  //         }
  //       }
  //     }
  //   }
  //   return config
  // },
}
export default config
