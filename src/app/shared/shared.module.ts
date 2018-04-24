import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

const SHARED_MODULES = [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
]

@NgModule({
    declarations: [],
    imports: [SHARED_MODULES],
    exports: [SHARED_MODULES]
})
export class SharedModule {}