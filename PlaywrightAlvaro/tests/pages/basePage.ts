import {Page} from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected readonly resource: string;

    constructor(page: Page, resource: string) {
        this.page = page;
        this.resource = resource;
    }

    getResource () {
        return this.resource
    }

    async reload() {
        await this.page.reload(
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async navigateTo() {
        await this.page.goto(
            this.resource,
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async waitTime(time_ms: number) {
        await this.page.waitForTimeout(time_ms);
    }
}