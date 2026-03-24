import { test, expect } from '@playwright/test';

test.describe('Singleton - Menedżer Motywu', () => {
  test.beforeEach(async ({ page }) => {
    // ZAIMPLEMENTUJ: Nawiguj do strony z wzorcem Singleton
    await page.goto('http://localhost:5173/patterns/creational/singleton-theme-manager/');
  });

  // Test 1: Inicjalizacja - sprawdzenie domyślnego motywu
  test('powinien zainicjalizować się z motywem jasnym', async ({ page }) => {
    // ZAIMPLEMENTUJ: Sprawdź czy body ma klasę light-theme
    const body = page.locator('body');
    await expect(body).toHaveClass(/light-theme/);

    // ZAIMPLEMENTUJ: Sprawdź czy Current Theme pokazuje "Light"
    const currentTheme = page.locator('[data-testid="current-theme"]');
    await expect(currentTheme).toContainText('Light');
  });

  // Test 2: Przełączanie motywu - zmiana z jasnego na ciemny
  test('powinien zmienić motyw z jasnego na ciemny po kliknięciu toggle', async ({ page }) => {
    // ZAIMPLEMENTUJ: Kliknij przycisk Przełącz motyw
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź czy body ma klasę dark-theme
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark-theme/);

    // ZAIMPLEMENTUJ: Sprawdź czy Current Theme pokazuje "Dark"
    const currentTheme = page.locator('[data-testid="current-theme"]');
    await expect(currentTheme).toContainText('Dark');
  });

  // Test 3: Przełączanie motywu - zmiana z ciemnego na jasny
  test('powinien zmienić motyw z ciemnego na jasny po dwóch klikach', async ({ page }) => {
    // ZAIMPLEMENTUJ: Kliknij toggle dwukrotnie
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click(); // zmiana na dark
    await toggleBtn.click(); // zmiana z powrotem na light

    // ZAIMPLEMENTUJ: Sprawdź czy wróć do light-theme
    const body = page.locator('body');
    await expect(body).toHaveClass(/light-theme/);

    // ZAIMPLEMENTUJ: Sprawdź czy Current Theme pokazuje "Light"
    const currentTheme = page.locator('[data-testid="current-theme"]');
    await expect(currentTheme).toContainText('Light');
  });

  // Test 4: Liczba instancji - powinno być zawsze 1
  test('powinien utrzymywać liczbę instancji na 1', async ({ page }) => {
    // ZAIMPLEMENTUJ: Sprawdź początkową liczbę instancji
    const instanceCount = page.locator('[data-testid="instance-count"]');
    await expect(instanceCount).toContainText('1');

    // ZAIMPLEMENTUJ: Kliknij toggle i sprawdź czy instancji jest wciąż 1
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click();

    await expect(instanceCount).toContainText('1');
  });

  // Test 5: Liczba instancji po kilku przełączeniach
  test('powinien utrzymywać liczbę instancji na 1 po wielu przełączeniach', async ({ page }) => {
    // ZAIMPLEMENTUJ: Pobierz przycisk toggle
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    const instanceCount = page.locator('[data-testid="instance-count"]');

    // ZAIMPLEMENTUJ: Kliknij toggle 5 razy
    for (let i = 0; i < 5; i++) {
      await toggleBtn.click();
    }

    // ZAIMPLEMENTUJ: Sprawdź czy liczba instancji to wciąż 1
    await expect(instanceCount).toContainText('1');
  });

  // Test 6: Reset button - resetowanie do motywu domyślnego
  test('powinien zresetować motyw do jasnego po kliknięciu Reset', async ({ page }) => {
    // ZAIMPLEMENTUJ: Najpierw zmień na ciemny
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź czy body ma klasę dark-theme
    let body = page.locator('body');
    await expect(body).toHaveClass(/dark-theme/);

    // ZAIMPLEMENTUJ: Kliknij Reset
    const resetBtn = page.locator('[data-testid="reset-button"]');
    await resetBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź czy wróć do light-theme
    body = page.locator('body');
    await expect(body).toHaveClass(/light-theme/);

    // ZAIMPLEMENTUJ: Sprawdź czy tekst to "Light"
    const currentTheme = page.locator('[data-testid="current-theme"]');
    await expect(currentTheme).toContainText('Light');
  });

  // Test 7: Ikona toggle'a - zmiana ikony po przełączeniu
  test('powinien zmienić ikonę na 🌙 w jasnym i ☀️ w ciemnym', async ({ page }) => {
    // ZAIMPLEMENTUJ: Pobierz ikonę toggle'a
    const toggleIcon = page.locator('#toggleIcon');

    // ZAIMPLEMENTUJ: Sprawdź początkową ikonę (powinno być 🌙)
    await expect(toggleIcon).toContainText('🌙');

    // ZAIMPLEMENTUJ: Kliknij toggle
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź czy ikona to ☀️
    await expect(toggleIcon).toContainText('☀️');

    // ZAIMPLEMENTUJ: Kliknij jeszcze raz
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź czy ikona wróciła do 🌙
    await expect(toggleIcon).toContainText('🌙');
  });

  // Test 8: Klasy CSS - prawidłowe dodawanie klas
  test('powinien prawidłowo dodawać i usuwać klasy CSS motywu', async ({ page }) => {
    // ZAIMPLEMENTUJ: Sprawdź początkowe klasy
    const body = page.locator('body');
    const initialClasses = await body.getAttribute('class');
    expect(initialClasses).toContain('light-theme');
    expect(initialClasses).not.toContain('dark-theme');

    // ZAIMPLEMENTUJ: Zmień motyw
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź zmienione klasy
    const updatedClasses = await body.getAttribute('class');
    expect(updatedClasses).toContain('dark-theme');
    expect(updatedClasses).not.toContain('light-theme');
  });

  // Test 9: Bardzo szybkie klikanie toggle'a (stress test)
  test('powinien obsługiwać szybkie klikanie (rapid toggle)', async ({ page }) => {
    // ZAIMPLEMENTUJ: Pobierz przycisk i wyświetlacz
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    const currentTheme = page.locator('[data-testid="current-theme"]');

    // ZAIMPLEMENTUJ: Kliknij toggle bardzo szybko 10 razy
    for (let i = 0; i < 10; i++) {
      await toggleBtn.click();
    }

    // ZAIMPLEMENTUJ: Sprawdź czy aplikacja funkcjonuje prawidłowo
    // Po 10 klikach (liczba parzysta) powinniśmy być w light-theme
    const body = page.locator('body');
    await expect(body).toHaveClass(/light-theme/);

    // ZAIMPLEMENTUJ: Liczba instancji powinna być wciąż 1
    const instanceCount = page.locator('[data-testid="instance-count"]');
    await expect(instanceCount).toContainText('1');
  });

  // Test 10: Reset po změnie motywu
  test('powinien resetować do motywu light nawet po wielu zmianach', async ({ page }) => {
    // ZAIMPLEMENTUJ: Zmień motyw kilka razy
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await toggleBtn.click(); // dark
    await toggleBtn.click(); // light
    await toggleBtn.click(); // dark

    // ZAIMPLEMENTUJ: Sprawdź że jesteśmy w dark
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark-theme/);

    // ZAIMPLEMENTUJ: Kliknij reset
    const resetBtn = page.locator('[data-testid="reset-button"]');
    await resetBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź że wrócimy do light
    await expect(body).toHaveClass(/light-theme/);
  });

  // Test 11: Liczba instancji po reset
  test('liczba instancji powinna być 1 nawet po kliknięciu reset', async ({ page }) => {
    // ZAIMPLEMENTUJ: Pobierz elementy
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    const resetBtn = page.locator('[data-testid="reset-button"]');
    const instanceCount = page.locator('[data-testid="instance-count"]');

    // ZAIMPLEMENTUJ: Zmień motyw
    await toggleBtn.click();

    // ZAIMPLEMENTUJ: Kliknij reset
    await resetBtn.click();

    // ZAIMPLEMENTUJ: Sprawdź liczbę instancji
    await expect(instanceCount).toContainText('1');
  });

  // Test 12: Widoczność wszystkich interaktywnych elementów
  test('powinien wyświetlać wszystkie interaktywne elementy UI', async ({ page }) => {
    // ZAIMPLEMENTUJ: Sprawdź obecność wszystkich przycisków
    const toggleBtn = page.locator('[data-testid="theme-toggle"]');
    await expect(toggleBtn).toBeVisible();

    const resetBtn = page.locator('[data-testid="reset-button"]');
    await expect(resetBtn).toBeVisible();

    // ZAIMPLEMENTUJ: Sprawdź obecność wyświetlaczy
    const currentTheme = page.locator('[data-testid="current-theme"]');
    await expect(currentTheme).toBeVisible();

    const instanceCount = page.locator('[data-testid="instance-count"]');
    await expect(instanceCount).toBeVisible();

    // ZAIMPLEMENTUJ: Sprawdź czy elementy zawierają tekst
    await expect(currentTheme).toContainText(/Light|Dark/);
    await expect(instanceCount).toContainText('1');
  });
});
