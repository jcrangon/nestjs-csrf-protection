import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CsrfService } from './csrf.service';

@Controller()
export class CsrfController {
  constructor(
    private readonly csrfService: CsrfService,
  ) {}

  @Get( '/csrf')
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.csrfService.getToken(req, res);
  }
}
