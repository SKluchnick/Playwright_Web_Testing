import { test, expect } from "@playwright/test";

test.beforeEach("start beforeEach test", async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("test", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker")
  await calendarInputField.click()

  let date = new Date()
  date.setDate(date.getDate()+29)
  const expectedDate = date.getDate().toString()
  const expectedMonthShot = date.toLocaleDateString('En-US',{month:'short'})
  const expectedMonthLong = date.toLocaleDateString('En-US',{month:'long'})
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

  while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }

   await page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();
    await expect(calendarInputField).toHaveValue(dateToAssert)



 
});
