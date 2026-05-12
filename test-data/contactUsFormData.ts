import { UniqueGenerator } from "../utils/UniqueGenerator";

export type contactUs= {
    contactName: string;
    contactEmail: string
    subject: string;
    messageBox: string
}

export const getContactUsData = (): contactUs => {
    return {
        contactName: UniqueGenerator.getUniqueName(),
        contactEmail: UniqueGenerator.getUniqueEmail(),
        subject: 'Subject Message Text',
        messageBox: 'Get In Touch Message '

    }

}