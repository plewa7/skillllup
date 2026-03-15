import { test, expect } from '@playwright/test';

test.describe('Factory Pattern - Shape Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/patterns/creational/factory-shape-generator/index.html');
  });

  test('Should create a circle shape', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createCircleBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(1);

    const shape = shapes[0];
    const classList = await shape.getAttribute('class');
    expect(classList).toContain('circle');
  });

  test('Should create a square shape', async ({ page }) => {
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createSquareBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(1);

    const shape = shapes[0];
    const classList = await shape.getAttribute('class');
    expect(classList).toContain('square');
  });

  test('Should create a triangle shape', async ({ page }) => {
    const createTriangleBtn = page.locator('[data-testid="create-triangle"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createTriangleBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(1);

    const shape = shapes[0];
    const classList = await shape.getAttribute('class');
    expect(classList).toContain('triangle');
  });

  test('Should create a rectangle shape', async ({ page }) => {
    const createRectBtn = page.locator('[data-testid="create-rect"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createRectBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(1);

    const shape = shapes[0];
    const classList = await shape.getAttribute('class');
    expect(classList).toContain('rect');
  });

  test('Should create multiple shapes', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createCircleBtn.click();
    await createSquareBtn.click();
    await createCircleBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(3);
  });

  test('Should update circle counter', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const circleCount = page.locator('[data-testid="circle-count"]');

    await createCircleBtn.click();
    let countText = await circleCount.textContent();
    expect(countText).toBe('1');

    await createCircleBtn.click();
    countText = await circleCount.textContent();
    expect(countText).toBe('2');

    await createCircleBtn.click();
    countText = await circleCount.textContent();
    expect(countText).toBe('3');
  });

  test('Should update square counter', async ({ page }) => {
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const squareCount = page.locator('[data-testid="square-count"]');

    await createSquareBtn.click();
    let countText = await squareCount.textContent();
    expect(countText).toBe('1');

    await createSquareBtn.click();
    countText = await squareCount.textContent();
    expect(countText).toBe('2');
  });

  test('Should update triangle counter', async ({ page }) => {
    const createTriangleBtn = page.locator('[data-testid="create-triangle"]');
    const triangleCount = page.locator('[data-testid="triangle-count"]');

    await createTriangleBtn.click();
    let countText = await triangleCount.textContent();
    expect(countText).toBe('1');

    await createTriangleBtn.click();
    countText = await triangleCount.textContent();
    expect(countText).toBe('2');
  });

  test('Should update rectangle counter', async ({ page }) => {
    const createRectBtn = page.locator('[data-testid="create-rect"]');
    const rectCount = page.locator('[data-testid="rect-count"]');

    await createRectBtn.click();
    let countText = await rectCount.textContent();
    expect(countText).toBe('1');

    await createRectBtn.click();
    countText = await rectCount.textContent();
    expect(countText).toBe('2');
  });

  test('Should update total counter for all shapes', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const createTriangleBtn = page.locator('[data-testid="create-triangle"]');
    const totalCount = page.locator('[data-testid="total-count"]');

    await createCircleBtn.click();
    let countText = await totalCount.textContent();
    expect(countText).toBe('1');

    await createSquareBtn.click();
    countText = await totalCount.textContent();
    expect(countText).toBe('2');

    await createTriangleBtn.click();
    countText = await totalCount.textContent();
    expect(countText).toBe('3');
  });

  test('Should clear all shapes', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const clearBtn = page.locator('[data-testid="clear-button"]');
    const canvas = page.locator('[data-testid="canvas"]');
    const totalCount = page.locator('[data-testid="total-count"]');

    await createCircleBtn.click();
    await createSquareBtn.click();

    let shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(2);

    let countText = await totalCount.textContent();
    expect(countText).toBe('2');

    await clearBtn.click();

    shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(0);

    countText = await totalCount.textContent();
    expect(countText).toBe('0');
  });

  test('Should reset all counters when clearing', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const createTriangleBtn = page.locator('[data-testid="create-triangle"]');
    const clearBtn = page.locator('[data-testid="clear-button"]');
    const circleCount = page.locator('[data-testid="circle-count"]');
    const squareCount = page.locator('[data-testid="square-count"]');
    const triangleCount = page.locator('[data-testid="triangle-count"]');
    const totalCount = page.locator('[data-testid="total-count"]');

    await createCircleBtn.click();
    await createSquareBtn.click();
    await createTriangleBtn.click();

    let count = await circleCount.textContent();
    expect(count).toBe('1');

    count = await squareCount.textContent();
    expect(count).toBe('1');

    count = await triangleCount.textContent();
    expect(count).toBe('1');

    await clearBtn.click();

    count = await circleCount.textContent();
    expect(count).toBe('0');

    count = await squareCount.textContent();
    expect(count).toBe('0');

    count = await triangleCount.textContent();
    expect(count).toBe('0');

    count = await totalCount.textContent();
    expect(count).toBe('0');
  });

  test('Should create multiple shapes of different types', async ({ page }) => {
    const createCircleBtn = page.locator('[data-testid="create-circle"]');
    const createSquareBtn = page.locator('[data-testid="create-square"]');
    const createTriangleBtn = page.locator('[data-testid="create-triangle"]');
    const createRectBtn = page.locator('[data-testid="create-rect"]');
    const canvas = page.locator('[data-testid="canvas"]');

    await createCircleBtn.click();
    await createSquareBtn.click();
    await createTriangleBtn.click();
    await createRectBtn.click();
    await createCircleBtn.click();

    const shapes = await canvas.locator('[data-testid="shape-item"]').all();
    expect(shapes).toHaveLength(5);
  });
});
