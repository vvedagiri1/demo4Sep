/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-04
 *
 * Structure (from library-description.txt): 2 columns, multiple rows.
 * Row 1: block name. Each subsequent row = one tab:
 *   [ tab label cell (mandatory), tab content cell (mandatory) ].
 *
 * Source layout: labels live in `.tab-menu > button.tab-menu-link` and the
 * matching content lives in `.tabs-content > .tab-pane`, paired by order.
 */
export default function parse(element, { document }) {
  const panes = Array.from(
    element.querySelectorAll('.tabs-content > .tab-pane, .tabs-content .tab-pane, :scope > .tab-pane')
  );
  const menuLinks = Array.from(
    element.querySelectorAll('.tab-menu > .tab-menu-link, .tab-menu button, .tab-menu-link')
  );

  const cells = [];

  panes.forEach((pane, i) => {
    // Label: prefer the corresponding tab-menu button label; fall back to the
    // first heading/name inside the pane.
    let labelCell = '';
    const menu = menuLinks[i];
    if (menu) {
      // Use the menu button's inner content (avatar + name + role).
      labelCell = menu.firstElementChild || menu;
    } else {
      const name = pane.querySelector('strong, h1, h2, h3, h4, h5, h6');
      labelCell = name ? name.textContent.trim() : `Tab ${i + 1}`;
    }

    // Content: the pane's inner content (image + name/role + quote).
    const contentCell = pane.firstElementChild || pane;

    cells.push([labelCell, contentCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
