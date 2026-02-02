import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, ContentChild, ViewChild, inject } from '@angular/core';
import { combineLatest, fromEvent, Subject, Subscription, tap } from 'rxjs';
import { NavRegistryService } from './nav-registry.service';

@Directive({
    selector: '[uiCellNav]',
    standalone: false
})
export class CellNavDirective implements OnInit, OnDestroy, AfterViewInit {
  reg = inject(NavRegistryService);
  elRef = inject(ElementRef<HTMLElement>); 

  constructor() { }

  ngOnInit() {
    const el = this.elRef.nativeElement;
    el.tabIndex = 0; // roving focus target is the cell container, not the input
    el.setAttribute('role', 'gridcell');
  }

  ngOnDestroy() {
    this.reg.unregister(this.rowIndex, this.colIndex);
    this.$keyChanged.unsubscribe();
    this.focusSub?.unsubscribe();
  }

  //Subscription to handle input blur events if we have an input inside the cell.
  private focusSub?: Subscription;

  ngAfterViewInit() {
    //If we have an input inside the cell, we need to listen for its blur event to know when to exit edit mode.
    //We do this here rather than in the constructor as the input may not be present at that time.
    const explicit = this.elRef.nativeElement.querySelector('[cellFocusTarget]') as HTMLElement | null;
    if (explicit) {
      this.focusSub = fromEvent<FocusEvent>(explicit, 'blur')
        .subscribe((event: FocusEvent) => {
          if (!this.elRef.nativeElement.contains(event.relatedTarget as HTMLElement | null)) {
            this.setFocus(false);
          }
        });
      return;
    }
    const auto = this.elRef.nativeElement.querySelector(
      'input:not([tabindex="-1"]),textarea:not([tabindex="-1"]),select:not([tabindex="-1"])'
    ) as HTMLElement | null;
    if (auto) {
      this.focusSub = fromEvent<FocusEvent>(auto, 'blur')
        .subscribe((event: FocusEvent) => {
          if (!this.elRef.nativeElement.contains(event.relatedTarget as HTMLElement | null)) {
            this.setFocus(false);
          }
        });
      return;
    }
  }

  @Input({ required: true }) set rowIndex(row: number) {
    this.$rowIndex.next(row);
  }

  @Input({ required: true }) set colIndex(col: number) {
    this.$colIndex.next(col);
  }

  $rowIndex = new Subject<number>();
  $colIndex = new Subject<number>();

  private _rowIndex: number | null = null;
  private _colIndex: number | null = null;

  $keyChanged = combineLatest([this.$rowIndex, this.$colIndex]).pipe(
    tap(([row, col]) => {
      //Assign private variables to avoid having to use behavioursubject, do not want to trigger on initial value given, only the first recieved.
      this._rowIndex = row;
      this._colIndex = col;

      //No need to unregister due to using a map.
      this.reg.register(row, col, this.elRef.nativeElement);
    })
  ).subscribe();

  private _isInputFocussed: boolean = false;

  setFocus(focus: boolean) {
    this._isInputFocussed = focus;
  }

  //Handles top level cell switching blur, not input blur. Input blur is handled in ngAfterViewInit to deal with a mix of keyboard & mouse actions.
  @HostListener('blur', ['$event']) onHostBlur(ev: FocusEvent) {
    // If focus moves outside the cell, we are no longer editing
    if (!this.elRef.nativeElement.contains(ev.relatedTarget as HTMLElement | null)) {
      this.setFocus(false);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.setFocus(false);
        this.elRef.nativeElement.focus();
        return;
    }

    const embeddedInput = this.elRef.nativeElement.querySelector(
      'input:not([tabindex="-1"]),textarea:not([tabindex="-1"]),select:not([tabindex="-1"])'
    ) as HTMLElement | null;

    if (this._isInputFocussed) {
      return;
    }

    if(this._rowIndex === null || this._colIndex === null) {
      console.warn('Row or column index is null, cannot navigate');
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.reg.move({ row: this._rowIndex, col: this._colIndex }, 'up');
        return;
      case 'ArrowDown':
        e.preventDefault();
        this.reg.move({ row: this._rowIndex, col: this._colIndex }, 'down');
        return;
      case 'ArrowLeft':
        e.preventDefault();
        this.reg.move({ row: this._rowIndex, col: this._colIndex }, 'left');
        return;
      case 'ArrowRight':
        e.preventDefault();
        this.reg.move({ row: this._rowIndex, col: this._colIndex }, 'right');
        return;
      case 'Enter':
      case 'F2':
        if (embeddedInput === null) return;

        e.preventDefault();
        this.setFocus(true);
        this.focusInnerAndType(e);
        return;
      default:
        // Printable key -> enter edit mode and type it
        if (embeddedInput === null) return;

        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          this.setFocus(true);
          this.focusInnerAndType(e);
        }
    }
  }

   private findFocusTarget(): HTMLElement | null {
    // Prefer explicit target if provided
    const explicit = this.elRef.nativeElement.querySelector('[cellFocusTarget]') as HTMLElement | null;
    if (explicit) return explicit;
    // Otherwise the first standard form control
    const auto = this.elRef.nativeElement.querySelector(
      'input:not([tabindex="-1"]),textarea:not([tabindex="-1"]),select:not([tabindex="-1"])'
    ) as HTMLElement | null;
    return auto;
  }

  private focusInnerAndType(original: KeyboardEvent) {
    const target = this.findFocusTarget();

    if (!target) {
      console.warn('No focus target found in cell');
      return;
    }

    // Move focus into the real control
    target.focus();

    // If printable, insert the character directly to avoid redispatching a keydown (which can recurse)
    const isPrintable = original.key.length === 1 && !original.ctrlKey && !original.metaKey && !original.altKey;
    if (isPrintable && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? target.value.length;
      const newVal = target.value.slice(0, start) + original.key + target.value.slice(end);
      target.value = newVal;
      const caret = start + 1;
      try { target.setSelectionRange(caret, caret); } catch { }
      // emit an input event so Angular forms pick up the change
      target.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}