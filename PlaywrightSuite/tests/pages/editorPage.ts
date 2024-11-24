import {BasePage} from "./basePage";
import {Page} from "playwright";
import logger from "../utils/logger";

/**
 * Representa la página de edición de posts
 */
class EditorPage extends BasePage {
    private readonly postTitleInput = 'textarea[placeholder="Post title"]';
    private readonly editorSelector = '.koenig-react-editor .koenig-lexical';
    private readonly publishButton = 'button.gh-btn.gh-btn-editor.gh-publish-trigger';
    private readonly publishSettingButton = 'div[data-test-setting="publish-at"] button.gh-publish-setting-title';
    private readonly scheduleRadio = 'div.gh-radio:has(div[data-test-radio="schedule"]) label';
    private readonly dateInput = 'input[data-test-date-time-picker-date-input]';
    private readonly timeInput = 'input[data-test-date-time-picker-time-input]';
    private readonly continueButton = 'button[data-test-button="continue"]';
    private readonly confirmScheduleButton = '.gh-publish-cta .gh-btn-pulse';
    private readonly errorMessageSelector = 'p[class*="gh-box"]';

    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    async createPost(title: string, content: string) {
        logger.info(`Creating post with title = ${title}, content = ${content}`);
        await this.page.fill(this.postTitleInput, title);
        await this.page.click(this.editorSelector);
        await this.page.keyboard.type(content);
    }

    async publishPost() {
        logger.info(`Clicking on publishing post button: ${this.publishButton}`);
        await this.page.click(this.publishButton);
        await this.page.waitForTimeout(3000);
    }

    async changePostReleaseDate() {
        logger.info(`Clicking publish setting button: ${this.publishSettingButton}`);
        await this.page.click(this.publishSettingButton);
        await this.page.waitForTimeout(100);
    }

    async fillScheduleData(date: string, time: string) {
        logger.info(`Filling the schedule data with date = ${date}, time = ${time}`);
        await this.page.click(this.scheduleRadio);
        await this.page.waitForTimeout(100);
        await this.page.locator(this.dateInput).fill(date);
        await this.page.locator(this.timeInput).fill(time);
    }

    async confirmSchedulePost() {
        logger.info(`Clicking continue button: ${this.continueButton}`);
        await this.page.click(this.continueButton);
        await this.page.waitForTimeout(100);
    }

    async publishScheduledPost() {
        logger.info(`Clicking confirming schedule button: ${this.confirmScheduleButton}`);
        await this.page.waitForSelector(this.confirmScheduleButton, { state: 'visible', timeout: 5000 });
        await this.page.click(this.confirmScheduleButton, { force: true });
        await this.page.waitForTimeout(3000);
    }

    async validateInvalidSchedulePost(date: string, time: string) {
        logger.info(`Validating invalid schedule post with date = ${date}, time = ${time}`);
        try {
            const errorMessage = this.page.locator(this.errorMessageSelector);
            if (errorMessage) {
                const messageText = await errorMessage.innerText();
                logger.error('Error al programar la publicación con fecha/hora inválida:', messageText);
            } else {
                logger.error('Error: no se recibió un mensaje de error cuando se ingresó una fecha/hora inválida.');
            }
        } catch (error) {
            logger.error('Error: no se recibió un mensaje de error cuando se ingresó una fecha/hora inválida.');
        }
    }
}

export default EditorPage;