//Extend to be able to handle multiple grid contexts at any one time.
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