import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const MAT_MODULES = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
    imports: MAT_MODULES,
    exports: MAT_MODULES
})
export class MaterialModule {}