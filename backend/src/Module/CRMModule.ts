import { Module } from "@nestjs/common";
import { CRMController } from "../controllers/CRMController";
import { CRMService } from "../services/CRMService";
import { DbConnectionModule } from "./DbConnectionModule";
import { LoggerModule } from "./LoggerModule";
import { CRMRepository } from "src/repository/CRMRepository";


@Module({
    controllers: [CRMController],
    providers: [CRMService, CRMRepository],
    imports: [DbConnectionModule, LoggerModule]
})
export class CRMModule{}