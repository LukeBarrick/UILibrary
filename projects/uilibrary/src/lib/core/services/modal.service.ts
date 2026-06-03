import { Inject, Injectable } from "@angular/core";
import { SelectComponent, UiModalService } from "../../../public-api";

Injectable({ providedIn: 'root' })
export class ModalService {
    private _modalService = Inject(UiModalService);

    constructor() { }

    public createModal() {
        let hello = this._modalService.open(SelectComponent);
        hello.componentInstance.loading = true;
    }
}