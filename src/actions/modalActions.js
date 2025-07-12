import { HIDE_MODAL, SHOW_MODAL } from './types';

export function showModal(modalProps) {
  return {
    type: SHOW_MODAL,
    payload: modalProps,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}
