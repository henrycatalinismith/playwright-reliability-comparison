# playwright-reliability-comparison

I used this code to figure out some of the stuff in https://henry.catalinismith.com/2024/03/17/stabilizing-zetkins-playwright-tests/.

## Installation

```
git clone gitcodeberg.org:henrycatalinismith/playwright-reliability-comparison.git
```

## Usage

It's all based on this environment variable called `N` which deterines how much system load to simulate. The higher the value of `N`, the longer and more variable the delays in the event-handling code in `index.html`. An `N` value of e.g. 3 means a random delay of between 1 and 16 milliseconds is introduced after each click. A value of 10 increases that random delay up to 1024 milliseconds.

At N=1, both tests will almost always pass.

```
$ N=1 yarn test

Running 2 tests using 1 worker

  ✓  1 [chromium] › playwright.spec.js:5:1 › flaky (226ms)
  ✓  2 [chromium] › playwright.spec.js:12:1 › reliable (198ms)

  2 passed (1.2s)
```

And at N=10, it'll almost always fail on the flaky test despite the reliable one passing.

```
$ N=10 yarn test
Running 2 tests using 1 worker

  ✘  1 [chromium] › playwright.spec.js:5:1 › flaky (2.4s)
  ✓  2 [chromium] › playwright.spec.js:12:1 › reliable (2.8s)


  1) [chromium] › playwright.spec.js:5:1 › flaky ───────────────────────────────────────────────────

    Error: expect(received).toBeTruthy()

    Received: false

       7 |   await page.click("text=two");
       8 |   await page.click("text=three");
    >  9 |   expect(await page.locator("text=success").isVisible()).toBeTruthy();
         |                                                          ^
      10 | });
      11 |
      12 | test("reliable", async ({ page }) => {

        at /Users/henrycatalinismith/playwright-reliability-comparison/playwright.spec.js:9:58

  1 failed
    [chromium] › playwright.spec.js:5:1 › flaky ────────────────────────────────────────────────────
  1 passed (6.3s)
```

## License

[MIT](https://codeberg.org/henrycatalinismith/playwright-reliability-comparison/src/branch/main/license)
