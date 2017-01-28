import {
  Component,
  TemplateRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {MdDialog} from './dialog';
import {MdDialogRef} from './dialog-ref';

@Component({
  selector: 'md-dialog',
  templateUrl: './dialog-element.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdDialogElement {
  dialog: MdDialogRef<any>;

  @Output()
  close = new EventEmitter<void>(false);

  @ViewChild('dialogTemplateRef')
  dialogTemplateRef: TemplateRef<any>;

  @Input()
  set open(state: boolean) {
    if (state) {
      setTimeout(() => {

        this.dialog = this._dialog.openFromTemplateRef(this.dialogTemplateRef, {
          disableClose: true
        });

        this.dialog.backdropClick$.subscribe(() => {
          this.close.emit();
        });

      });


    } else if (this.dialog) {
      this.dialog.close();
    }
  }

  constructor(private _dialog: MdDialog) {}
}

