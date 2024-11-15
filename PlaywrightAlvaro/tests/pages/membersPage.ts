import {Page} from "playwright";
import {BasePage} from "./basePage";
import {expect} from "@playwright/test";

/**
 * Representa la página de miembros + edición de miembros
 */
class MembersPage extends BasePage {
    // fields
    private readonly nameInput = "input[data-test-input='member-name']";
    private readonly emailInput = "input[data-test-input='member-email']";

    // buttons
    private readonly newMemberButton = "a[data-test-new-member-button='true']";
    // cubre el botón de Save
    private readonly saveButton = "button[data-test-button='save']"
    private readonly memberActionsButton = "button[data-test-button='member-actions']";
    private readonly deleteMemberButton = "button[data-test-button='delete-member']";

    // span
    private readonly failedSave = "span[data-test-task-button-state='failure']";

    constructor(page: Page, url: string) {
        super(page, url);
    }

    async findMember(memberEmail: string) {
        await this.page.waitForLoadState("load");

        // Wait for the member list to be present in the DOM
        const selectedMember = this.page.getByText(memberEmail, {exact: true});

        const memberCount = await selectedMember.count();

        console.log(`Members: ${memberCount}`);
        // If no members are found, return null
        if (memberCount === 0) {
            return null;
        }

        // Check if the filtered member is visible
        if (await selectedMember.isEnabled()) {
            return selectedMember;
        }

        return null;
    }


    async editMember(memberEmail: string) {
        const selectedMember = await this.findMember(memberEmail);

        // can't edit a 404 member
        expect(selectedMember).not.toBeNull();

        await selectedMember.click();

        // Locate the span with the text "Leave"
        const leaveButton = this.page.locator('span', { hasText: 'Leave' });

        // Check if the span exists
        const leaveButtonCount = await leaveButton.count();

        if (leaveButtonCount > 0) {
            // If the span exists, click on it
            await leaveButton.click();
            console.log('Leave button clicked');
        } else {
            console.log('Leave button does not exist');
        }

        await this.page.waitForLoadState("load");
    }

    async inputName(newName: string) {
        await this.page.fill(this.nameInput, newName);
    }

    async inputEmail(newEmail: string) {
        await this.page.fill(this.emailInput, newEmail);
    }

    async saveMemberChanges() {
        const save = this.page.locator(this.saveButton);
        const span = save.locator('span');
        await span.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState("load");
    }

    async checkSaveButtonMessage(desiredMessage: string) {
        await expect(this.page.locator(this.saveButton).locator('span')).toHaveText(desiredMessage);
    }

    async createMember(memberName: string, memberEmail: string) {
        // new member
        await this.page.click(this.newMemberButton);

        await this.inputName(memberName);
        await this.inputEmail(memberEmail);
        await this.saveMemberChanges();

        // returns to main page
        await this.navigateTo();

        // Locate the span with the text "Leave"
        const leaveButton = this.page.locator('span', { hasText: 'Leave' });

        // Check if the span exists
        const leaveButtonCount = await leaveButton.count();

        if (leaveButtonCount > 0) {
            // If the span exists, click on it
            await leaveButton.click();
            console.log('Leave button clicked');
        } else {
            console.log('Leave button does not exist');
        }
    }

    async baseCreateMember(memberName: string, memberEmail: string) {
        // new member
        await this.page.click(this.newMemberButton);

        await this.inputName(memberName);
        await this.inputEmail(memberEmail);
    }


    async createMemberIfMissing(memberName: string, memberEmail: string) {
        if (!(await this.findMember(memberEmail))) {
            await this.createMember(memberName, memberEmail);
        }
    }

    async selectMemberActions() {
        await this.page.click(this.memberActionsButton);
    }

    async deleteMember() {
        await this.selectMemberActions();
        await this.page
            .locator(this.deleteMemberButton)
            .locator('span')
            .click();

        await this.page.waitForLoadState("load");

        await this.page
            .locator("button[data-test-button='confirm']")
            .locator('span')
            .click();

        // Locate the span with the text "Leave"
        const leaveButton = this.page.locator('span', { hasText: 'Leave' });

        // Check if the span exists
        const leaveButtonCount = await leaveButton.count();

        if (leaveButtonCount > 0) {
            // If the span exists, click on it
            await leaveButton.click();
            console.log('Leave button clicked');
        } else {
            console.log('Leave button does not exist');
        }

        await this.page.waitForURL("**/members")
    }

    async validateChanges({
        saveButtonResponse = null,
        nameResponse = null,
        emailResponse = null
                          }: {
        saveButtonResponse?: string | null,
        nameResponse?: string | null,
        emailResponse?: string | null
    }) {
        // Wait for any HTML change on the page
        await this.page.waitForFunction(() => document.body.innerHTML.length > 0);

        if (saveButtonResponse) {
            await this.checkSaveButtonMessage(saveButtonResponse);
        }

        if (nameResponse) {
            // No hay un caso inválido hallado para el nombre
        }

        if (emailResponse) {
            // flaky
            const errorResponse = this.page.locator("div[class$='error'] p");

            // Wait for the error message to appear
            await errorResponse.waitFor({ state: 'attached' });
            await errorResponse.waitFor({ state: 'visible' });

            // Validate the error message
            await expect(errorResponse).toBeVisible();
            await expect(errorResponse).toHaveText(emailResponse);
        }

    }
}

export default MembersPage;