'use babel';

import InkdropColorCollectionMessageDialog from './inkdrop-color-collection-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(InkdropColorCollectionMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'InkdropColorCollectionMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'InkdropColorCollectionMessageDialog'
    )
    inkdrop.components.deleteClass(InkdropColorCollectionMessageDialog);
  }

};
