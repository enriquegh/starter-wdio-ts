describe("Google Test", () => {
    it("should go to google and click Sauce Labs", async () => {
        await browser.url("https://google.com");

        const searchBar = await $("[name='q']")
        
        await searchBar.setValue("Sauce Labs");
        await searchBar.click();
    
    })

})