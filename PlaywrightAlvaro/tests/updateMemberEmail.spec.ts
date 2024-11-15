/**
 * ### Funcionalidad 5: Modificar el correo electrónico de un suscriptor
 *
 * El usuario administrador del servidor Ghost puede modificar el correo electrónico de un usuario suscriptor de su
 * servicio Ghost para actualizar la información personal del usuario.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-5-modificar-el-correo-electr%C3%B3nico-de-un-usuario-suscriptor)
 */

import {expect, test} from '@playwright/test';
import MembersPage from "./pages/membersPage";
import {config} from "./config/config";
import {faker} from '@faker-js/faker';

test.describe('F5', async () => {

    /**
     * ### E8: Cambiar el correo de un miembro por un correo válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * WHEN selecciono el miembro X
     * AND cambio el correo por un correo válido
     * AND guardo la edición del miembro
     * THEN se deberia guardar el nuevo correo
     * AND se debería mostrar el mensaje "Saved"
     */
    test('correo válido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockValidEmail = faker.internet.email();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );
        await membersPage.navigateTo();

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail);

        // AND cambio el correo por un correo válido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockValidEmail
        );

        // THEN se debería mostrar el mensaje "Saved"
        expect(saveButtonResponse.trim()).toEqual('Saved');
        // AND se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(mockValidEmail);
    });


    /**
     * E9: Cambiar el correo de un miembro por un correo inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * WHEN selecciono el miembro X
     * AND cambio el correo por un correo inválido
     * AND guardo la edición del miembro
     * THEN se debería mostrar el mensaje "Retry"
     * AND se debería mostrar el mensaje "Invalid Email."
     * AND no se debería guardar el nuevo correo
     */
    test('correo inválido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );
        await membersPage.navigateTo();

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail);

        // AND cambio el correo por un correo inválido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockInvalidEmail
        );

        // THEN se debería mostrar el mensaje "Retry"
        expect(saveButtonResponse.trim()).toEqual('Retry');
        // AND se debería mostrar el mensaje "Invalid Email."
        const getEmailSaveResponse = await membersPage.getEmailSaveResponse();
        await expect(getEmailSaveResponse).toHaveText('Invalid Email.')
        // AND no se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(mockEmail);
    });


    /**
     * E10: Correo repetido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * AND hay un miembro Y creado
     * WHEN selecciono el miembro Y
     * AND cambio el correo por el correo de X
     * AND guardo la edición del miembro
     * THEN se debería mostrar el mensaje "Retry"
     * AND se debería mostrar el mensaje "Member already exists. Attempting to add member with existing email address"
     * AND no se debería guardar el nuevo correo
     */
    test('correo repetido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const xMockName = faker.person.fullName();
        const xMockEmail = faker.internet.email();
        const yMockName = faker.person.fullName();
        const yMockEmail = faker.internet.email();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro X creado
        const saveButtonResponseMemberX = await membersPage.createMember(
            xMockName,
            xMockEmail
        );
        expect(saveButtonResponseMemberX.trim()).toEqual('Saved');
        await membersPage.navigateTo();

        // AND hay un miembro Y creado
        const saveButtonResponseMemberY = await membersPage.createMember(
            yMockName,
            yMockEmail
        );
        expect(saveButtonResponseMemberY.trim()).toEqual('Saved');
        await membersPage.navigateTo();

        // WHEN selecciono el miembro Y
        const yMember = await membersPage.findMember(yMockEmail);
        // AND cambio el correo por el correo de X
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            yMember,
            yMockName,
            xMockEmail
        )

        // THEN se debería mostrar el mensaje "Retry"
        // FIXME: la aplicación muestra brevemente (~50 ms) "Saved", antes de cambiar a "Retry"
        expect(membersPage.saveChangesTest())
        const saveButton = await membersPage.saveChangesTest();
        await expect(saveButton).toContainText('Retry')

        // AND se debería mostrar el mensaje "Member already exists. Attempting to add member with existing email address"
        const getEmailSaveResponse = await membersPage
            .getEmailSaveResponse();
        await expect(getEmailSaveResponse).toContainText(
            'Member already exists. Attempting to edit member with existing email address'
        );
        // AND no se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(yMockEmail);
    });
});




