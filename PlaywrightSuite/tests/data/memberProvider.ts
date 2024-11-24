import {faker} from "@faker-js/faker";

export enum NAME_GENERATION_OPTIONS {
    LONG = `/^[a-zA-Z]{91} [a-zA-Z]{100}$/`,
    SHORT = `/^$/`
}

export enum EMAIL_GENERATION_OPTIONS {
    LONG = `/^[a-zA-Z0-9]{186}@[a-zA-Z]\.[a-zA-Z]{3}$/`,
    SHORT = `/^$/`,
    NO_AT = `/^[a-zA-Z0-9]{3,50}(\\.[a-zA-Z]{2,3})+$/`,
    NO_DOMAIN = `/^[a-zA-Z0-9]{3,50}@[a-zA-Z]{3,10}$/`,
    SPECIAL_CHARACTERS = `^[\x00-\x7F]{3,20}@[a-zA-Z]{3,20}\\.[a-zA-Z]{2,3}$`
}


/**
 * Proveedor de datos para un miembro
 */
export interface MemberProvider {

    /**
     * Nombre válido de un miembro
     */
    getValidName(): string

    /**
     * Nombre inválido de un miembro
     * @param option qué característica invalidará al nombre dado
     */
    getInvalidName(option: NAME_GENERATION_OPTIONS): string

    /**
     * Email válido de un miembro
     */
    getValidEmail(): string

    /**
     * Email inválido de un miembro
     * @param option qué característica invalidará al nombre dado
     */
    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
export class MemberRandomProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        if (option == EMAIL_GENERATION_OPTIONS.LONG) {
            // aaa...a@b.xyz
            return `${faker.string.alphanumeric(186)}@${faker.string.alpha(1)}.${faker.string.alpha(3)}`;
        }
        else if (option == EMAIL_GENERATION_OPTIONS.SHORT) {
            return "";
        }
        else if (option == EMAIL_GENERATION_OPTIONS.NO_AT) {
            // abcdefgh.xyz
            return `${faker.string.alphanumeric()}.${faker.string.alpha(3)}`
        }
        else if (option == EMAIL_GENERATION_OPTIONS.NO_DOMAIN) {
            // abcdefgh@mail
            return `${faker.string.alphanumeric()}@${faker.string.alpha()}`
        }
        else {
            // ñññ...ñ@mail.xyz
            return `${faker.string.sample()}@${faker.string.alpha()}.${faker.string.sample(3)}`
        }
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        return faker.helpers.fromRegExp(NAME_GENERATION_OPTIONS[option]);
    }

    getValidEmail(): string {
        return faker.internet.email();
    }

    getValidName(): string {
        return faker.person.fullName();
    }
}


/**
 * Obtiene los datos de manera pseudoaleatoria. Los datos tienen relación entre ellos
 */
export class MemberRelatedProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        return "";
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class MemberAPrioriProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        return "";
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}