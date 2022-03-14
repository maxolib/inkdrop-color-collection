'use babel';

import React, { useEffect, useCallback } from 'react'
import { logger, useModal } from 'inkdrop'

const InkdropColorCollectionMessageDialog = (props) => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const toggle = useCallback(() => {
    modal.show()
    logger.debug('InkdropColorCollection was toggled!')
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'inkdrop-color-collection:toggle': toggle
    })
    return () => sub.dispose()
  }, [toggle])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>InkdropColorCollection</Dialog.Title>
      <Dialog.Content>InkdropColorCollection was toggled!</Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default InkdropColorCollectionMessageDialog
