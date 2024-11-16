import { Body, ConsoleLogger, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { CreateContactRequest, UpdateContactRequest } from "../Models/CRMModels";
import { ResponseModel } from "../Models/ResponseModel";
import { CRMService } from "../services/CRMService";


@Controller("contacts")
export class CRMController {

    constructor(private service: CRMService, private logger: ConsoleLogger) { }

    @Get("count")
    async getContactCount(): Promise<ResponseModel>{
        try {
            const contactCount = await this.service.getContactCount()
            return new ResponseModel(HttpStatus.CREATED, "Created new contact successfully.", {count: contactCount})
        } catch (e) {
            if (e instanceof HttpException)
                throw e
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException()
        }
    }

    @Post()
    async createContact(@Body(new ValidationPipe()) newContact: CreateContactRequest): Promise<ResponseModel> {
        try {
            const contactDetails = await this.service.createContact(newContact)
            return new ResponseModel(HttpStatus.CREATED, "Created new contact successfully.", contactDetails)
        } catch (e) {
            if (e instanceof HttpException)
                throw e
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException()
        }
    }

    /**
     * @param firstName 'firstName' property of the lastMost Contact
     * @param pageSize Number of contacts to be retrieved.
     * @returns a page of contacts
     */
    @Get()
    async getContacts(@Query("pageNumber") pageNumber: number, @Query("pageSize", new ParseIntPipe()) pageSize: number): Promise<ResponseModel> {
        try {
            const contactDetails = await this.service.getContacts(pageNumber, pageSize)
            return new ResponseModel(HttpStatus.OK, "Fetched contacts successfully.", contactDetails)
        } catch (e) {
            if (e instanceof HttpException)
                throw e
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException()
        }
    }

    @Delete("/:contactId")
    async deleteContact(@Param("contactId", new ParseUUIDPipe()) contactId: string): Promise<ResponseModel> {
        try {
            await this.service.deleteContact(contactId)

            return new ResponseModel(HttpStatus.OK, "Deleted contact successfully")
        } catch (e) {
            if (e instanceof HttpException)
                throw e
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException()
        }
    }

    @Put("/:contactId")
    async updateContact(@Param("contactId", new ParseUUIDPipe()) contactId: string, @Body(new ValidationPipe()) updatedContactRequest: UpdateContactRequest): Promise<ResponseModel> {
        try {
            const updatedContact: UpdateContactRequest = await this.service.updateContact(contactId, updatedContactRequest)

            return new ResponseModel(HttpStatus.OK, "Deleted contact successfully", updatedContact)
        } catch (e) {
            if (e instanceof HttpException)
                throw e
            this.logger.error(e.message, e.stack)
            throw new InternalServerErrorException()
        }
    }
}