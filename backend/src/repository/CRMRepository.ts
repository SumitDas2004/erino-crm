import { ConsoleLogger, Injectable } from "@nestjs/common";
import { Contact } from "@prisma/client";
import { DbConnection } from "../db/DbConnection";
import { CreateContactRequest, UpdateContactRequest } from "../Models/CRMModels";

@Injectable()
export class CRMRepository {
    constructor(private db: DbConnection, private logger: ConsoleLogger) { }

    async getContactCount(): Promise<number>{
        return await this.db.contact.count()
    }

    async createContact(request: CreateContactRequest): Promise<Contact> {
        return await this.db.contact.create({
            data: {
                first_name: request.firstName,
                last_name: request.lastName,
                company: request.companyName,
                job_title: request.jobTitle,
                email: request.email,
                phone: request.phoneNumber,
            }
        })
    }

    /**
     * @param firstName 'firstName' property of the lastMost Contact
     * @param pageSize Number of contacts to be retrieved.
     * @returns a page of contacts
     */
    async getContacts(pageNumber: number, pageSize: number): Promise<Contact[]> {
            return await this.db.contact.findMany({
                take: pageSize,
                skip: pageSize*pageNumber,
                orderBy: [{first_name: 'asc'}]
            })
    }

    async doesContactExist(contactId: string): Promise<boolean> {
        const count = await this.db.contact.count({
            where: {
                contact_id: contactId
            }
        })
        return count > 0
    }
    async doesContactExistByPhone(phone: string): Promise<boolean> {
        const count = await this.db.contact.count({
            where: {
                phone: phone
            }
        })
        return count > 0
    }
    async doesContactExistByEmail(email: string): Promise<boolean> {
        const count = await this.db.contact.count({
            where: {
                email: email
            }
        })
        return count > 0
    }
    

    async deleteContact(contactId: string): Promise<void> {
        await this.db.contact.delete({
            where: {
                contact_id: contactId
            }
        })
    }

    async updateContact(contactId: string, updatedContact: UpdateContactRequest): Promise<Contact> {
        return await this.db.contact.update({
            where: {
                contact_id: contactId
            },
            data: {
                company: updatedContact.companyName,
                email: updatedContact.email,
                first_name: updatedContact.firstName,
                last_name: updatedContact.lastName,
                job_title: updatedContact.jobTitle,
                phone: updatedContact.phoneNumber
            }
        })
    }

    async getContact(contactId: string):Promise<Contact>{
        return await this.db.contact.findUnique({
            where: {
                contact_id: contactId
            }
        })
    }
}