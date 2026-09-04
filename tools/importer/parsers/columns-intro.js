/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-intro. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): flexible columns; column count is
 * driven by the natural grouping in the source. The source has 2 direct child
 * divs (text/CTA column, then an image stack column), so this is a single
 * 2-column row.
 * Row 1: block name. Row 2: [ text column, image column ].
 */
export default function parse(element, { document }) {
  // Direct children of the grid define the columns.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];

  if (columns.length > 0) {
    cells.push(columns);
  }

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro', cells });
  element.replaceWith(block);
}
