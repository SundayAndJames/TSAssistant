import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { createCustomWidget } from './customWidget';
import { DockPanel } from '@lumino/widgets';
/**
 * Initialization data for the jupyterlab-TSAssistant-panel extension.
 */

// 创建一个 JupyterLab 插件对象
const plugin: JupyterFrontEndPlugin<void> = {
  // 插件的唯一标识符
  id: 'jupyterlab-TSAssistant-panel',
  // 插件在 JupyterLab 启动时自动启动
  autoStart: true,
  // 插件所需的其他插件
  requires: [ICommandPalette],
  // 插件的激活函数
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    // 在控制台输出插件已被激活的消息
    console.log('JupyterLab extension jupyterlab-TSAssistant-panel is activated!');
    // 创建 DockPanel 实例
    const dockPanel = new DockPanel();
    // 设置 DockPanel 的 ID
    dockPanel.id = 'custom-panel';
    // create a widget
    const widget = createCustomWidget();
    // 将小部件添加到 DockPanel 中
    dockPanel.addWidget(widget);
    // 将 DockPanel 添加到 JupyterLab 的主工作区右侧
    app.shell.add(dockPanel, 'right', { rank: 1000 });
    // 添加一个命令来显示自定义面板
    const command: string = 'custom-panel:show';
    app.commands.addCommand(command, {
      // 命令的标签
      label: 'Show Custom Panel',
      // 命令的执行函数
      execute: () => {
        if (!dockPanel.isAttached) {
          // 如果 DockPanel 尚未附加到主工作区，则将其附加到右侧
          app.shell.add(dockPanel, 'right', { rank: 1000 });
        }
        // 激活 DockPanel
        app.shell.activateById(dockPanel.id);
      }
    });
    // 将命令添加到命令面板
    palette.addItem({ command, category: 'Custom' });
  }
};

export default plugin;