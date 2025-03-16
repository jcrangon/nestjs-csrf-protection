import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfGuard implements CanActivate {
    private readonly csrfProtection: any;
    
    constructor(
        private readonly csrfService: CsrfService,
    )
    {
        this.csrfProtection = this.csrfService.getProtection()
    }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        
        this.csrfProtection.doubleCsrfProtection(req, res, (error: any) => {
            if (error === this.csrfProtection.invalidCsrfTokenError) {
            res.status(403).json({
                error: 'csrf validation error'
            });
            throw new Error('Csrf guard triggered');
            }
        });
        return true;
    }
}
