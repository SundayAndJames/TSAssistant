import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the extension_TSAssistant extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'extension_TSAssistant:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension extension_TSAssistant is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('extension_TSAssistant settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for extension_TSAssistant.', reason);
        });
    }
  }
};

export default plugin;
