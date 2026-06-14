import { test, expect } from "@playwright/test";

// RD-2: the FusionHero landing is the default first screen. It must read as a calm
// tension field (one question), NOT a horoscope/score, and its CTA must enter the live
// InputForm flow. The InputForm→profile spine is unchanged (covered by the other specs,
// which now traverse this landing via dismissLanding).

test.describe("Redesign landing — FusionHero first screen", () => {
  test("cold start shows the FusionHero: one tension question, demo-labelled, NO score", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("fusion-hero")).toBeVisible();
    await expect(page.getByTestId("fusion-hero-question")).toContainText("?");
    await expect(page.getByTestId("fusion-hero-demo")).toBeVisible();
    // Brief: kein Score/% im Hero.
    const hero = (await page.getByTestId("fusion-hero").textContent()) ?? "";
    expect(hero).not.toMatch(/%/);
    // Anti-reification headline present.
    await expect(page.getByTestId("fusion-hero")).toContainText("kein Urteil");
  });

  test("CTA enters the live input flow (spine intact)", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#input-name")).toHaveCount(0); // form behind the landing
    await page.getByTestId("fusion-hero-cta").click();
    await expect(page.locator("#input-name")).toBeVisible();
  });

  test("reduced-motion: hero still renders (no animated-background crash)", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByTestId("fusion-hero")).toBeVisible();
    await expect(page.getByTestId("fusion-hero-question")).toContainText("?");
  });
});
