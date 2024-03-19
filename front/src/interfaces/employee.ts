export interface IDataFromBack {
    id?: number | null,
    name: string | null,
    position: string | null,
    email: string | null,
    cellPhoneNumber: string | null,
    birthdayDate: string | null,
}

export const initialDataFromBack: IDataFromBack = {
    id: null,
    name: null,
    position: null,
    email: null,
    cellPhoneNumber: null,
    birthdayDate: null,
};