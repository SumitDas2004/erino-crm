import { Module } from "@nestjs/common";
import { DbConnection } from "src/db/DbConnection";

@Module({
    exports: [DbConnection],
    providers: [DbConnection]
})
export class DbConnectionModule{}