import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdSelect} from './select';
import {MdSelectHeader} from './select-header';
import {MdOptionModule} from '../core/option/option';
import {
  CompatibilityModule,
  OverlayModule,
} from '../core';
export * from './select';
export {fadeInContent, transformPanel, transformPlaceholder} from './select-animations';


@NgModule({
  imports: [CommonModule, OverlayModule, MdOptionModule, CompatibilityModule],
  exports: [MdSelect, MdSelectHeader, MdOptionModule, CompatibilityModule],
  declarations: [MdSelect, MdSelectHeader],
})
export class MdSelectModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdSelectModule,
      providers: []
    };
  }
}
