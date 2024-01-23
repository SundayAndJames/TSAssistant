import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

/**
 * 一个示例侧边栏插件
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'my-sidebar-plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension my-sidebar-plugin is activated!');

    const content = new Widget();
    const widget = new MainAreaWidget({ content });
    widget.id = 'my-sidebar-widget';
    widget.title.label = 'My Sidebar';
    widget.title.closable = true;

    // 在侧边栏中添加一些内容
    content.node.innerHTML = `
      <h2>My Sidebar</h2>
      <p>This is a simple sidebar widget.</p>
    `;

    // 将侧边栏小部件添加到应用程序
    app.shell.add(widget, 'left', { rank: 500 });

    // 将一个命令添加到命令面板
    const command = 'my-sidebar:open';
    app.commands.addCommand(command, {
      label: 'Open My Sidebar',
      execute: () => {
        app.shell.activateById(widget.id);
      }
    });

    palette.addItem({ command, category: 'My Sidebar' });
  }
};

export default extension;
