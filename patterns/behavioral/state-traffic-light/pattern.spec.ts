import { test, expect } from '@playwright/test';

test.describe('State Pattern - Traffic Light', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/patterns/behavioral/state-traffic-light/index.html');
  });

  test('Should initialize with Red light', async ({ page }) => {
    const redLight = page.locator('[data-testid="red-light"]');
    const state = page.locator('[data-testid="current-state"]');

    const redClass = await redLight.getAttribute('class');
    expect(redClass).toContain('red');

    const stateText = await state.textContent();
    expect(stateText).toContain('Czerwone');
  });

  test('Should transition from Red to Yellow', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const yellowLight = page.locator('[data-testid="yellow-light"]');
    const state = page.locator('[data-testid="current-state"]');

    await nextBtn.click();

    const yellowClass = await yellowLight.getAttribute('class');
    expect(yellowClass).toContain('yellow');

    const stateText = await state.textContent();
    expect(stateText).toContain('Żółte');
  });

  test('Should transition from Yellow to Green', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const greenLight = page.locator('[data-testid="green-light"]');
    const state = page.locator('[data-testid="current-state"]');

    await nextBtn.click(); // Red -> Yellow
    await nextBtn.click(); // Yellow -> Green

    const greenClass = await greenLight.getAttribute('class');
    expect(greenClass).toContain('green');

    const stateText = await state.textContent();
    expect(stateText).toContain('Zielone');
  });

  test('Should cycle from Green back to Red', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const redLight = page.locator('[data-testid="red-light"]');
    const state = page.locator('[data-testid="current-state"]');

    await nextBtn.click(); // Red -> Yellow
    await nextBtn.click(); // Yellow -> Green
    await nextBtn.click(); // Green -> Red

    const redClass = await redLight.getAttribute('class');
    expect(redClass).toContain('red');

    const stateText = await state.textContent();
    expect(stateText).toContain('Czerwone');
  });

  test('Should reset to Red light', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const resetBtn = page.locator('[data-testid="reset-button"]');
    const redLight = page.locator('[data-testid="red-light"]');
    const state = page.locator('[data-testid="current-state"]');

    await nextBtn.click(); // Move to Yellow
    await nextBtn.click(); // Move to Green

    await resetBtn.click(); // Reset to Red

    const redClass = await redLight.getAttribute('class');
    expect(redClass).toContain('red');

    const stateText = await state.textContent();
    expect(stateText).toContain('Czerwone');
  });

  test('Should keep only one light active at a time', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const redLight = page.locator('[data-testid="red-light"]');
    const yellowLight = page.locator('[data-testid="yellow-light"]');
    const greenLight = page.locator('[data-testid="green-light"]');

    // Red state
    let redClass = await redLight.getAttribute('class');
    let yellowClass = await yellowLight.getAttribute('class');
    let greenClass = await greenLight.getAttribute('class');
    expect(redClass).toContain('red');
    expect(yellowClass).not.toContain('yellow');
    expect(greenClass).not.toContain('green');

    // Yellow state
    await nextBtn.click();
    redClass = await redLight.getAttribute('class');
    yellowClass = await yellowLight.getAttribute('class');
    greenClass = await greenLight.getAttribute('class');
    expect(redClass).not.toContain('red');
    expect(yellowClass).toContain('yellow');
    expect(greenClass).not.toContain('green');

    // Green state
    await nextBtn.click();
    redClass = await redLight.getAttribute('class');
    yellowClass = await yellowLight.getAttribute('class');
    greenClass = await greenLight.getAttribute('class');
    expect(redClass).not.toContain('red');
    expect(yellowClass).not.toContain('yellow');
    expect(greenClass).toContain('green');
  });

  test('Should update state display text correctly', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const state = page.locator('[data-testid="current-state"]');

    // Initial: Red
    let stateText = await state.textContent();
    expect(stateText).toContain('Czerwone');

    // After 1 click: Yellow
    await nextBtn.click();
    stateText = await state.textContent();
    expect(stateText).toContain('Żółte');

    // After 2 clicks: Green
    await nextBtn.click();
    stateText = await state.textContent();
    expect(stateText).toContain('Zielone');

    // After 3 clicks: Red again
    await nextBtn.click();
    stateText = await state.textContent();
    expect(stateText).toContain('Czerwone');
  });

  test('Should multiple transitions work correctly', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="next-button"]');
    const state = page.locator('[data-testid="current-state"]');

    for (let i = 0; i < 10; i++) {
      await nextBtn.click();
    }

    // After 10 clicks (3 cycles + 1): should be Yellow
    const stateText = await state.textContent();
    expect(stateText).toContain('Żółte');
  });
});
