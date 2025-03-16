import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CsrfService } from './csrf.service';

export function createCsrfDynamicController(urlSegment: string) {
    @Controller()
    class CsrfDynamicController {
        constructor(
            public csrfService: CsrfService,
        ) {}
        
        @Get(urlSegment)
        getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
            return this.csrfService.getToken(req, res);
        }
    }

    return CsrfDynamicController;
}