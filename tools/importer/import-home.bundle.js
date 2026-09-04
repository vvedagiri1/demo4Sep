/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/accordion-faq.js
  function parse(element, { document }) {
    const items = element.querySelectorAll(
      ":scope > details.faq-item, :scope > details, :scope > .faq-item, :scope > .accordion-item"
    );
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector('summary, .faq-question, [class*="question"], [class*="title"]');
      const answer = item.querySelector('.faq-answer, [class*="answer"], [class*="content"], [class*="body"]');
      let titleCell = "";
      if (summary) {
        const inner = summary.querySelector("span");
        titleCell = inner || summary;
      }
      let contentCell = "";
      if (answer) {
        contentCell = answer;
      }
      if (titleCell || contentCell) {
        cells.push([titleCell, contentCell]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(
      ":scope > a.article-card, :scope > .article-card, :scope > a.card-link, :scope > .card"
    );
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector("img");
      const contentCell = [];
      const meta = card.querySelector('.article-card-meta, [class*="meta"]');
      if (meta) contentCell.push(meta);
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"], [class*="title"]');
      const href = card.getAttribute("href");
      if (heading) {
        if (href) {
          const link = document.createElement("a");
          link.href = href;
          link.append(...heading.childNodes);
          heading.append(link);
        }
        contentCell.push(heading);
      } else if (href) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = (card.textContent || "").trim();
        contentCell.push(link);
      }
      cells.push([image || "", contentCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll(
      ":scope > .utility-aspect-1x1, :scope > div:has(> img), :scope > .card"
    );
    const cells = [];
    items.forEach((item) => {
      const image = item.querySelector("img") || (item.matches("img") ? item : null);
      if (image) {
        cells.push([image, ""]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse4(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    if (columns.length > 0) {
      cells.push(columns);
    }
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-intro.js
  function parse5(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    if (columns.length > 0) {
      cells.push(columns);
    }
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-intro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse6(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"], img');
    const heading = element.querySelector('h1, h2, h3, [class*="heading"]:not([class*="sub"])');
    const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
    const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a[class*="button"]'));
    if (!bgImage && !heading && !subheading && ctaLinks.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse7(element, { document }) {
    const panes = Array.from(
      element.querySelectorAll(".tabs-content > .tab-pane, .tabs-content .tab-pane, :scope > .tab-pane")
    );
    const menuLinks = Array.from(
      element.querySelectorAll(".tab-menu > .tab-menu-link, .tab-menu button, .tab-menu-link")
    );
    const cells = [];
    panes.forEach((pane, i) => {
      let labelCell = "";
      const menu = menuLinks[i];
      if (menu) {
        labelCell = menu.firstElementChild || menu;
      } else {
        const name = pane.querySelector("strong, h1, h2, h3, h4, h5, h6");
        labelCell = name ? name.textContent.trim() : `Tab ${i + 1}`;
      }
      const contentCell = pane.firstElementChild || pane;
      cells.push([labelCell, contentCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "div.navbar",
        "footer.footer",
        ".breadcrumbs"
      ]);
    }
  }

  // tools/importer/import-home.js
  var parsers = {
    "accordion-faq": parse,
    "cards-article": parse2,
    "cards-gallery": parse3,
    "columns-article": parse4,
    "columns-intro": parse5,
    "hero-banner": parse6,
    "tabs-testimonial": parse7
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "home",
    description: "",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "columns-intro",
        instances: [
          "#main-content > header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"
        ]
      },
      {
        name: "columns-article",
        instances: [
          "#main-content > section.section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg"
        ]
      },
      {
        name: "cards-gallery",
        instances: [
          "#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"
        ]
      },
      {
        name: "tabs-testimonial",
        instances: [
          "#main-content > section.section:nth-of-type(3) .tabs-wrapper"
        ]
      },
      {
        name: "cards-article",
        instances: [
          "#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"
        ]
      },
      {
        name: "accordion-faq",
        instances: [
          "#main-content > section.section:nth-of-type(5) .faq-list"
        ]
      },
      {
        name: "hero-banner",
        instances: [
          "#main-content > section.section.inverse-section .grid-layout.desktop-1-column"
        ]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
