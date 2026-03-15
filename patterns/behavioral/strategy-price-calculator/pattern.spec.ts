import { test, expect } from '@playwright/test';

test.describe('Strategy Pattern - Price Calculator Strategies', () => {
  test.beforeEach(async ({ page }) => {
    // Przejdź do strony
    await page.goto('/patterns/behavioral/strategy-price-calculator/index.html');
  });

  test('Should initialize with Regular strategy and default price', async ({ page }) => {
    // Sprawdź czy result zawiera "100,00 zł"
    const result = await page.locator('[data-testid="result-value"]').textContent();
    expect(result).toContain('100,00');

    // Sprawdź czy aktywna strategia to "Zwykła Cena"
    const strategy = await page.locator('[data-testid="current-strategy"]').textContent();
    expect(strategy).toContain('Zwykła Cena');
  });

  test('Should calculate Regular price (no change)', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');

    // Zmień cenę na 200
    await input.fill('200');

    // Result powinien być 200,00 zł
    await expect(result).toContainText('200,00');
  });

  test('Should apply Discount strategy (20% off)', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const discountCard = page.locator('[data-testid="strategy-discount"]');
    const strategy = page.locator('[data-testid="current-strategy"]');

    // Ustaw cenę na 100
    await input.fill('100');

    // Kliknij na strategię discount
    await discountCard.click();

    // Result powinien być 80,00 zł (100 * 0.8)
    await expect(result).toContainText('80,00');

    // Sprawdź czy strategia się zmieniła
    await expect(strategy).toContainText('Ze Zniżką');
  });

  test('Should apply Tax strategy (23% VAT)', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const taxCard = page.locator('[data-testid="strategy-tax"]');
    const strategy = page.locator('[data-testid="current-strategy"]');

    // Ustaw cenę na 100
    await input.fill('100');

    // Kliknij na strategię tax
    await taxCard.click();

    // Result powinien być 123,00 zł (100 * 1.23)
    await expect(result).toContainText('123,00');

    // Sprawdź czy strategia to TAX
    await expect(strategy).toContainText('VAT');
  });

  test('Should apply Premium strategy (+50%)', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const premiumCard = page.locator('[data-testid="strategy-premium"]');
    const strategy = page.locator('[data-testid="current-strategy"]');

    // Ustaw cenę na 100
    await input.fill('100');

    // Kliknij na strategię premium
    await premiumCard.click();

    // Result powinien być 150,00 zł (100 * 1.5)
    await expect(result).toContainText('150,00');

    // Sprawdź czy strategia to Premium
    await expect(strategy).toContainText('Premium');
  });

  test('Should switch between strategies dynamically', async ({ page }) => {
    const result = page.locator('[data-testid="result-value"]');
    const regularCard = page.locator('[data-testid="strategy-regular"]');
    const discountCard = page.locator('[data-testid="strategy-discount"]');
    const taxCard = page.locator('[data-testid="strategy-tax"]');

    // Start: Regular
    await expect(result).toContainText('100,00');

    // Switch to Discount
    await discountCard.click();
    await expect(result).toContainText('80,00');

    // Switch to Tax
    await taxCard.click();
    await expect(result).toContainText('123,00');

    // Switch back to Regular
    await regularCard.click();
    await expect(result).toContainText('100,00');
  });

  test('Should update price when input changes with active strategy', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const discountCard = page.locator('[data-testid="strategy-discount"]');

    // Aktywuj strategię discount
    await discountCard.click();

    // Initial price: 100 * 0.8 = 80
    await expect(result).toContainText('80,00');

    // Zmień cenę na 200
    await input.fill('200');

    // Powinno być 200 * 0.8 = 160
    await expect(result).toContainText('160,00');

    // Zmień na 50
    await input.fill('50');

    // Powinno być 50 * 0.8 = 40
    await expect(result).toContainText('40,00');
  });

  test('Should handle decimal prices correctly', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const taxCard = page.locator('[data-testid="strategy-tax"]');

    // Aktywuj tax strategy
    await taxCard.click();

    // Ustaw cenę na 99.99
    await input.fill('99.99');

    // 99.99 * 1.23 = 122.9877 -> 122,99 zł
    await expect(result).toContainText('122,99');
  });

  test('Should highlight active strategy card', async ({ page }) => {
    const discountCard = page.locator('[data-testid="strategy-discount"]');
    const taxCard = page.locator('[data-testid="strategy-tax"]');

    // Sprawdź czy discount ma klasę active
    await discountCard.click();
    let classAttr = await discountCard.getAttribute('class');
    expect(classAttr).toContain('active');

    // Sprawdź czy tax ma klasę active
    await taxCard.click();
    classAttr = await discountCard.getAttribute('class');
    // Discount powinien stracić active
    expect(classAttr).not.toContain('active');

    classAttr = await taxCard.getAttribute('class');
    // Tax powinien mieć active
    expect(classAttr).toContain('active');
  });

  test('Should work with zero and negative prices', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');
    const discountCard = page.locator('[data-testid="strategy-discount"]');

    await discountCard.click();

    // Zero price
    await input.fill('0');
    await expect(result).toContainText('0,00');

    // Negative price (edge case)
    await input.fill('-100');
    // -100 * 0.8 = -80
    await expect(result).toContainText('-80,00');
  });

  test('Should format numbers with comma as decimal separator', async ({ page }) => {
    const input = page.locator('[data-testid="base-price-input"]');
    const result = page.locator('[data-testid="result-value"]');

    await input.fill('123.45');

    // Powinno być "123,45 zł" (z przecinkiem, nie kropką)
    const text = await result.textContent();
    expect(text).toMatch(/\d+,\d{2}\s*zł/);
    expect(text).not.toMatch(/\./);
  });
});
