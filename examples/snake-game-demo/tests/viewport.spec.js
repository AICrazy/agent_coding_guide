import { expect, test } from "@playwright/test";

const viewports = [
  {
    name: "desktop",
    size: { width: 1366, height: 768 },
    expectNoVerticalScroll: true,
  },
  {
    name: "tablet",
    size: { width: 768, height: 1024 },
    expectNoVerticalScroll: false,
  },
  {
    name: "mobile",
    size: { width: 390, height: 844 },
    expectNoVerticalScroll: false,
  },
];

for (const viewport of viewports) {
  test(`${viewport.name} viewport keeps the core UI usable`, async ({ page }) => {
    await page.setViewportSize(viewport.size);
    await page.goto("/");

    const metrics = await page.evaluate(() => {
      const body = document.body;
      const doc = document.documentElement;
      const board = document.getElementById("board-frame");
      const controls = document.querySelector(".control-panel");

      const boardRect = board.getBoundingClientRect();
      const controlsRect = controls.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      return {
        verticalScroll:
          Math.max(body.scrollHeight, doc.scrollHeight) > viewportHeight + 1,
        horizontalOverflow:
          Math.max(body.scrollWidth, doc.scrollWidth) > viewportWidth + 1,
        boardVisible:
          boardRect.top >= 0 &&
          boardRect.left >= 0 &&
          boardRect.bottom <= viewportHeight + 1 &&
          boardRect.right <= viewportWidth + 1,
        controlsVisible:
          controlsRect.top >= 0 &&
          controlsRect.left >= 0 &&
          controlsRect.right <= viewportWidth + 1,
        mainReadable:
          boardRect.width >= Math.min(viewportWidth * 0.55, 240) &&
          controlsRect.width >= Math.min(viewportWidth * 0.4, 220),
      };
    });

    if (viewport.expectNoVerticalScroll) {
      expect(metrics.verticalScroll).toBe(false);
    }
    expect(metrics.horizontalOverflow).toBe(false);
    expect(metrics.boardVisible).toBe(true);
    expect(metrics.controlsVisible).toBe(true);
    expect(metrics.mainReadable).toBe(true);
  });
}
