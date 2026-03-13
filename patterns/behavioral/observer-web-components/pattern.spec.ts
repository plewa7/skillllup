import {
  test,
  expect,
} from "@playwright/test";

test.describe("Observer Pattern - Web Components Reaktywność", () => {
  test.beforeEach(
    async ({
      page,
    }) => {
      // Przejdź do strony z komponentem
      await page.goto(
        "/patterns/behavioral/observer-web-components/index.html",
      );
    },
  );

  test("Should initialize observers with placeholder text", async ({
    page,
  }) => {
    // Sprawdź, czy oba observersy mają tekst "oczekuje danych..."
    const observer1 =
      await page
        .locator(
          '[data-testid="observer-1-value"]',
        )
        .textContent();
    const observer2 =
      await page
        .locator(
          '[data-testid="observer-2-value"]',
        )
        .textContent();

    expect(
      observer1,
    ).toContain(
      "oczekuje danych",
    );
    expect(
      observer2,
    ).toContain(
      "oczekuje danych",
    );
  });

  test("Should update both observers when input value changes", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    // Wpisz "Hello" w pole input
    await input.fill(
      "Hello",
    );

    // Czekaj aż observer1 zawiera "Hello"
    await expect(
      observer1,
    ).toContainText(
      "Hello",
    );

    // Czekaj aż observer2 zawiera "Hello"
    await expect(
      observer2,
    ).toContainText(
      "Hello",
    );
  });

  test("Should update observers with multiple text changes", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    // Pierwszy tekst
    await input.fill(
      "First",
    );
    await expect(
      observer1,
    ).toContainText(
      "First",
    );
    await expect(
      observer2,
    ).toContainText(
      "First",
    );

    // Drugi tekst
    await input.fill(
      "Second",
    );
    await expect(
      observer1,
    ).toContainText(
      "Second",
    );
    await expect(
      observer2,
    ).toContainText(
      "Second",
    );

    // Trzeci tekst
    await input.fill(
      "Observer Pattern Works!",
    );
    await expect(
      observer1,
    ).toContainText(
      "Observer Pattern Works!",
    );
    await expect(
      observer2,
    ).toContainText(
      "Observer Pattern Works!",
    );
  });

  test("Should handle empty input", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    // Wpisz coś
    await input.fill(
      "Something",
    );
    await expect(
      observer1,
    ).toContainText(
      "Something",
    );

    // Wyczyść input
    await input.fill(
      "",
    );
    await expect(
      observer1,
    ).toContainText(
      "",
    );
    await expect(
      observer2,
    ).toContainText(
      "",
    );
  });

  test("Should update observers in real-time during typing", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    // Wpisz każdy znak osobno
    await input.type(
      "R",
    );
    await expect(
      observer1,
    ).toContainText(
      "R",
    );
    await expect(
      observer2,
    ).toContainText(
      "R",
    );

    await input.type(
      "e",
    );
    await expect(
      observer1,
    ).toContainText(
      "Re",
    );
    await expect(
      observer2,
    ).toContainText(
      "Re",
    );

    await input.type(
      "active",
    );
    await expect(
      observer1,
    ).toContainText(
      "Reactive",
    );
    await expect(
      observer2,
    ).toContainText(
      "Reactive",
    );
  });

  test("Should synchronize both observers at same time", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    await input.fill(
      "Test123",
    );

    // Obaj obserwatorzy powinni mieć dokładnie tę samą wartość
    const value1 =
      await observer1.textContent();
    const value2 =
      await observer2.textContent();

    expect(
      value1,
    ).toBe(
      value2,
    );
    expect(
      value1,
    ).toContain(
      "Test123",
    );
  });

  test("Should handle special characters", async ({
    page,
  }) => {
    const input =
      page.locator(
        '[data-testid="source-input"]',
      );
    const observer1 =
      page.locator(
        '[data-testid="observer-1-value"]',
      );
    const observer2 =
      page.locator(
        '[data-testid="observer-2-value"]',
      );

    const specialText =
      "!@#$%^&*()_+-=[]{}|;:,.<>?";
    await input.fill(
      specialText,
    );

    await expect(
      observer1,
    ).toContainText(
      specialText,
    );
    await expect(
      observer2,
    ).toContainText(
      specialText,
    );
  });
});
