'use babel';

import ColorCollectionMessageDialog from './color-collection-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(ColorCollectionMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'ColorCollectionMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'ColorCollectionMessageDialog'
    )
    inkdrop.components.deleteClass(ColorCollectionMessageDialog);
  }

};
