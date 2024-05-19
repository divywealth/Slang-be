import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()

export class JWTService {
    constructor(
        private jwtService: JwtService
    ) {}

    IssueToken(data) {
        return this.jwtService.signAsync({data})
    }
}