import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { doubleCsrf } from 'csrf-csrf';

@Injectable()
export class CsrfGuard implements CanActivate {
    private readonly csrfProtection: any;
    
    constructor(
        private readonly configService: ConfigService,
    )
    {
        const secret = this.configService.get<string>('CSRF_SECRET');
        const cookieName = this.configService.get<string>('CSRF_COOKIE_NAME');
        
        this.csrfProtection = doubleCsrf({
            getSecret: () => secret,
            cookieName
        });
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
