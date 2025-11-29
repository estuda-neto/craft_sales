export enum TypeUser {
    CLIENTE = 'CLIENTE',
    ADMIN = 'ADMIN',
    ARTESAO = 'ARTESAO',
}
export enum TypeArtisan {
    CERÂMICA = 'CERÂMICA',
    MADEIRA = 'ADMIN',
    TECIDOS = 'ARTESAO',
    FIBRA = 'ARTESAO',
    METAL = 'METAL',
    RECICLÁVEIS = 'RECICLÁVEIS',
    PINTURA = 'PINTURA',
    ESCULTURA = 'ESCULTURA',
    PEDRA_SABÃO = 'PEDRA_SABÃO',
}
export function fromString(value: string): TypeUser {
    switch (value) {
        case 'CLIENTE':
            return TypeUser.CLIENTE;
        case 'ADMIN':
            return TypeUser.ADMIN;
        case 'ARTESAO':
            return TypeUser.ARTESAO;
        default:
            throw new Error('type user invalid.');
    }
}

export enum TypeUserStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    BANNED = 'BANNED',
}

export interface User {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string;
    photo?: string;
    bio?: string;
    score?: number;
    typeuser: TypeUser;
    userStatus?: TypeUserStatus;
    checked?: boolean;
    craftsmanRegistration?: string;
    numberWalletCICAB?: string;
    artisanType?: TypeArtisan;
    addressId?: string;
}

export interface UpdateUserInput {
    name?: string;
    bio?: string;
    craftsmanRegistration?: string;
    numberWalletCICAB?: string;
    artisanType?: TypeArtisan;
}


























// /** retationship 1:1 -> Car*/
// @HasOne(() => Car)
// declare car?: Car;

// /** retationship N:1 -> Address*/
// @ForeignKey(() => Address)
// @Column(DataType.UUID)
// declare addressId?: string;

// @BelongsTo(() => Address)
// declare address?: Address;

// /** retationship 1:N -> Order*/
// @HasMany(() => Order)
// declare orders?: Order[];


