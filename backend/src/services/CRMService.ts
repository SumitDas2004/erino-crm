import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Contact } from "@prisma/client";
import { CreateContactRequest, GetContactResponse, UpdateContactRequest } from "../Models/CRMModels";
import { CRMRepository } from "../repository/CRMRepository";

@Injectable()
export class CRMService {
    constructor(private repository: CRMRepository) {}

    async getContactCount(): Promise<number>{
        return await this.repository.getContactCount()
    }

    async doesContactExist(contactId: string): Promise<boolean>{
        return await this.repository.doesContactExist(contactId)
    }
    async doesContactExistByEmail(email: string): Promise<boolean>{
        return await this.repository.doesContactExistByEmail(email)
    }
    async doesContactExistByPhone(phone: string): Promise<boolean>{
        return await this.repository.doesContactExistByPhone(phone)
    }

    async createContact(newContact: CreateContactRequest): Promise<GetContactResponse> {
        if(await this.doesContactExistByEmail(newContact.email))
            throw new ConflictException("Email already exists.")
        if(await this.doesContactExistByPhone(newContact.phoneNumber))
            throw new ConflictException("Phone number already exists.")
        const contactDetails: Contact = await this.repository.createContact(newContact)
        return this.toGetContactResponseModel(contactDetails)
    }

    async getContacts(pageNumber: number, pageSize: number): Promise<GetContactResponse[]>{
        const contacts: Contact[] = await this.repository.getContacts(pageNumber, pageSize)
        return contacts.map(contact=>this.toGetContactResponseModel(contact))
    }

    async deleteContact(contactId: string): Promise<void> {
        if(!await this.doesContactExist(contactId))
            throw new NotFoundException("Contact does not exist.")
        await this.repository.deleteContact(contactId)
    }

    async getContact(contactId: string):Promise<Contact>{
        return await this.repository.getContact(contactId)
    }

    async updateContact(contactId: string, newDetails: UpdateContactRequest): Promise<GetContactResponse> {
        if(!await this.doesContactExist(contactId))
            throw new NotFoundException("Contact does not exist.")
        const existingContact = await this.getContact(contactId)
        if(await this.doesContactExistByEmail(newDetails.email) && existingContact.email!==newDetails.email)
            throw new ConflictException("Email already exists.")
        if(await this.doesContactExistByPhone(newDetails.phoneNumber) && existingContact.phone!==newDetails.phoneNumber)
            throw new ConflictException("Phone number already exists.")
        const updatedContactDetails: Contact = await this.repository.updateContact(contactId, newDetails)
        return this.toGetContactResponseModel(updatedContactDetails)
    }

    /**
     * @description Utility method to model a 'Contact' entity into GetContactResponse model
     * @param contact Contact entity
     * @returns GetContactResponse
    */
    toGetContactResponseModel(contact: Contact): GetContactResponse {
        const res: GetContactResponse = {
            id: contact.contact_id,
            firstName: contact.first_name,
            lastName: contact.last_name,
            email: contact.email,
            phoneNumber: contact.phone,
            companyName: contact.company,
            jobTitle: contact.job_title,
            createdAt: contact.created_at
        }
        return res
    }
}