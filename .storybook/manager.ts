import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
    // 全屏
    isFullscreen: false,
    // 导航
    showNav: true,
    // 面板
    showPanel: true,
    // 面板位置
    panelPosition: 'bottom',
    // 快捷方式
    enableShortcuts: true,
    // 工具栏
    showToolbar: true,
    // 主题
    theme: themes.light,
    // 选定面板
    selectedPanel: undefined,
    // 初始活动
    initialActive: 'sidebar',
    // 边栏
    sidebar: {
        showRoots: false,
        collapsedRoots: ['other'],
    },
    // 工具
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
});