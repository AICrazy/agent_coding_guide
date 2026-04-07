import { expect, test } from "@playwright/test";

const getSnapshot = async (page) =>
  page.evaluate(() => window.__snakeGameTestApi.getSnapshot());

test("supports keyboard control, difficulty, pause/resume, restart, and collisions", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Press Start or Space to begin.")).toBeVisible();
  await expect(page.locator("#score-value")).toHaveText("0");
  await expect(page.locator("#status-value")).toHaveText("Ready");

  await page.selectOption("#difficulty-select", "turbo");
  expect(await page.evaluate(() => window.__snakeGameTestApi.getSnapshot().speed)).toBe(95);
  await expect(page.locator("#speed-value")).toHaveText("Turbo");

  await page.click("#start-button");
  await expect(page.locator("#status-value")).toHaveText("Running");

  const beforeTurn = await getSnapshot(page);
  await page.keyboard.press("ArrowUp");
  await expect
    .poll(async () => {
      const snapshot = await getSnapshot(page);
      return snapshot.snake[0].y < beforeTurn.snake[0].y;
    })
    .toBe(true);

  await page.click("#pause-button");
  await expect(page.locator("#status-value")).toHaveText("Paused");
  const pausedSnapshot = await getSnapshot(page);
  await page.waitForTimeout(220);
  const pausedAfterWait = await getSnapshot(page);
  expect(pausedAfterWait.snake[0]).toEqual(pausedSnapshot.snake[0]);

  await page.click("#pause-button");
  await expect(page.locator("#status-value")).toHaveText("Running");
  await expect
    .poll(async () => {
      const snapshot = await getSnapshot(page);
      return snapshot.snake[0].x !== pausedAfterWait.snake[0].x || snapshot.snake[0].y !== pausedAfterWait.snake[0].y;
    })
    .toBe(true);

  await page.evaluate(() => {
    window.__snakeGameTestApi.setCustomState({
      snake: [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ],
      direction: "right",
      food: { x: 6, y: 5 },
      score: 0,
      status: "ready",
      boardMessage: "Test food",
    });
    window.__snakeGameTestApi.step();
  });
  let snapshot = await getSnapshot(page);
  expect(snapshot.score).toBe(1);
  expect(snapshot.snake).toHaveLength(4);

  await page.evaluate(() => {
    window.__snakeGameTestApi.setCustomState({
      snake: [
        { x: 19, y: 8 },
        { x: 18, y: 8 },
        { x: 17, y: 8 },
      ],
      direction: "right",
      food: { x: 0, y: 0 },
      score: 3,
      status: "ready",
      boardMessage: "Test wall collision",
    });
    window.__snakeGameTestApi.step();
  });
  snapshot = await getSnapshot(page);
  expect(snapshot.status).toBe("gameover");
  await expect(page.locator("#status-value")).toHaveText("Game Over");

  await page.evaluate(() => {
    window.__snakeGameTestApi.setCustomState({
      snake: [
        { x: 6, y: 6 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 6, y: 7 },
        { x: 7, y: 7 },
        { x: 7, y: 6 },
      ],
      direction: "left",
      food: { x: 0, y: 0 },
      score: 5,
      status: "ready",
      boardMessage: "Test self collision",
    });
    window.__snakeGameTestApi.step();
  });
  snapshot = await getSnapshot(page);
  expect(snapshot.status).toBe("gameover");

  await page.click("#restart-button");
  snapshot = await getSnapshot(page);
  expect(snapshot.status).toBe("ready");
  expect(snapshot.score).toBe(0);
  expect(snapshot.snake).toHaveLength(3);
  expect(snapshot.food).not.toBeNull();
  await expect(page.locator("#status-value")).toHaveText("Ready");
  await expect(page.locator("#score-value")).toHaveText("0");
});
