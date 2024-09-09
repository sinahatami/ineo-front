import { Component, Input, OnInit } from '@angular/core';
import { ModalOptions } from '../interface/IModalOptions';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent implements OnInit {

  constructor(private modal: NgxSmartModalService) { }

  @Input() modalOptions: ModalOptions

  saveMethod(calback: Function) { return calback() }

  onAnyCloseEvent(callback: Function) {
    callback ? callback() : null
    this.modal.getModal(this.modalId).close()
  }

  modalId: string = 'modal'
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modal.getModal(this.modalId).open()

    let element = document.getElementsByClassName('nsm-dialog')[0] as HTMLElement
    element.style.maxWidth = `${this.modalOptions.maxWidth}px`
  }

  closeModal(callback: Function) {
    this.modal.getModal(this.modalId).close()
  }

}
