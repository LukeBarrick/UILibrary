//ALTER TO ALLOW FOR MULTIPE CONTEXTS TO USE THIS AT ANY ONE TIME

/**
 * NavRegistryService
 * -------------------
 * Central in‑memory registry that maps logical (row, col) coordinates of a
 * keyboard‑navigable grid / matrix to their rendered HTMLElement instances.
 *
 * PURPOSE
 * - Enables arrow‑key (or programmatic) focus movement across a dynamically
 *   created grid without each cell having to know about its siblings.
 * - Provides clamped navigation so focus never leaves known bounds.
 * - Gracefully tolerates sparse or changing cell presence (missing cells
 *   simply abort a move while preserving the current focus).
 *
 * KEY IDEAS
 * - Each cell is registered with a 0‑based row and column index plus a
 *   reference to its HTMLElement (must be focusable or contain a focusable
 *   descendant).
 * - A stable string key "row:col" is used internally (Map lookup is O(1)).
 * - maxRow / maxCol track the furthest seen indices to supply boundary
 *   constraints when moving.
 * - If a target coordinate is not currently registered (e.g. cell removed),
 *   navigation does not move focus, preventing accidental loss of focus.
 *
 * USAGE PATTERN (Typical)
 * 1. In each cell component/directive:
 *      constructor(private nav: NavRegistryService, elRef: ElementRef)
 *      ngOnInit()  => nav.register(rowIndex, colIndex, elRef.nativeElement)
 *      ngOnDestroy()=> nav.unregister(rowIndex, colIndex)
 * 2. On keydown in a focused cell:
 *      const next = this.nav.move({ row, col }, direction);
 *      (store next if you track current position)
 * 3. To jump somewhere directly:
 *      this.nav.focusCell(targetRow, targetCol);
 *
 * FOCUS REQUIREMENTS
 * - Registered element should either:
 *    * Have a valid tabindex (e.g. tabindex="0"), or
 *    * Be a naturally focusable element (button, input, etc.).
 *
 * DYNAMIC LAYOUTS
 * - Removing a cell: call unregister to keep the map clean. (Leaving stale
 *   entries will not break navigation unless DOM nodes are GC'd; however,
 *   correctness and memory hygiene recommend unregister.)
 * - Adding new rows/cols: simply register; internal maxRow/maxCol adjust.
 * - Shrinking max indices (e.g. removing last row) does NOT automatically
 *   reduce maxRow/maxCol; they represent historical maxima. If you require
 *   strict current bounds, consider extending this service with a recompute
 *   pass after structural changes.
 *
 * PERFORMANCE
 * - Map lookups are constant time; overhead per registered cell is minimal.
 * - No DOM queries are performed; all references are supplied externally.
 *
 * ACCESSIBILITY NOTES
 * - Ensure that arrow key handling does not override native semantics for
 *   form fields or interactive widgets unless appropriate.
 * - Consider announcing position (e.g. aria-live) if users benefit from
 *   feedback like "Row 2 Column 3".
 *
 * EXTENSION IDEAS
 * - Support wrapping navigation (moving right from last col goes to col 0).
 * - Add vertical/horizontal skip of disabled or hidden cells.
 * - Provide events/hooks when focus moves.
 * - Maintain current position to avoid passing it around externally.
 *
 * THREAD / ZONE CONTEXT
 * - Purely synchronous; no RxJS dependencies.
 * - Safe to call from event handlers or lifecycle hooks.
 *
 * LIMITATIONS
 * - Assumes coordinates are integers starting at zero.
 * - Does not reconcile sparse row/col gaps beyond treating them as blocked.
 * - maxRow/maxCol only ever grow; if you remove trailing rows/cols and need
 *   strict bounding, you must add additional logic.
 *
 * EXAMPLE (Simplified)
 *  <div
 *    *ngFor="let r of rows; let i=index"
 *    (keydown.arrowDown)="pos = nav.move(pos,'down')"
 *    (keydown.arrowUp)="pos = nav.move(pos,'up')"
 *    (keydown.arrowLeft)="pos = nav.move(pos,'left')"
 *    (keydown.arrowRight)="pos = nav.move(pos,'right')"
 *  >
 *    <button
 *      *ngFor="let c of cols; let j=index"
 *      #cell
 *      (ngOnInit)="nav.register(i,j,cell)"
 *      (ngOnDestroy)="nav.unregister(i,j)"
 *    >{{i}},{{j}}</button>
 *  </div>
 */
import { Injectable } from '@angular/core';

export interface CellKey { row: number; col: number; }

@Injectable({ providedIn: 'root' })
export class NavRegistryService {
  // Map of cell coordinate key -> HTMLElement reference
  private cells = new Map<string, HTMLElement>();
  // Tracks largest registered row index (0-based)
  private maxRow = 0;
  // Tracks largest registered column index (0-based)
  private maxCol = 0;

  /**
   * Builds the internal map key for a given row/col.
   * @param row 0-based row index
   * @param col 0-based column index
   */
  private key(row: number, col: number) { return `${row}:${col}`; }

  /**
   * Register (or overwrite) a focusable cell element at a specific row/col.
   * Updates max row/col bounds used for clamping navigation.
   * Call when a cell is created / rendered.
   * @param row 0-based row index
   * @param col 0-based column index
   * @param el HTMLElement to receive focus during navigation
   */
  register(row: number, col: number, el: HTMLElement) {
    this.cells.set(this.key(row, col), el);
    if (row > this.maxRow) this.maxRow = row;
    if (col > this.maxCol) this.maxCol = col;
  }

  /**
   * Unregister a cell when it is destroyed / removed.
   * Safe to call even if the cell was never registered.
   * @param row 0-based row index
   * @param col 0-based column index
   */
  unregister(row: number, col: number) {
    this.cells.delete(this.key(row, col));
  }

  /**
   * Programmatically focus a specific cell if it exists.
   * No-op if the coordinates are not registered.
   * @param row 0-based row index
   * @param col 0-based column index
   */
  focusCell(row: number, col: number) {
    const el = this.cells.get(this.key(row, col));
    if (el) el.focus();
  }

  /**
   * Move focus from a starting cell in a given direction.
   * Movement is clamped within the known max row/col bounds.
   * If the target cell does not exist (e.g., removed), focus stays put.
   * @param from Current cell coordinates
   * @param dir Direction to move
   * @returns New focused cell coordinates (or original if movement failed)
   */
  move(from: CellKey, dir: 'up' | 'down' | 'left' | 'right'): CellKey {
    let { row, col } = from;
    if (dir === 'up') row = Math.max(0, row - 1);
    if (dir === 'down') row = Math.min(this.maxRow, row + 1);
    if (dir === 'left') col = Math.max(0, col - 1);
    if (dir === 'right') col = Math.min(this.maxCol, col + 1);
    const next = this.cells.get(this.key(row, col));
    if (!next) return from; // Guard if a row/col is missing (e.g., removed)
    next.focus();
    return { row, col };
  }
}