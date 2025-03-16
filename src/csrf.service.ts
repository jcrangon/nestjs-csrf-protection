import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { doubleCsrf } from 'csrf-csrf';
import { CsrfModuleOptions } from './interfaces/csrfModuleOptions.interface';
import { CSRF_MODULE_OPTIONS } from './constants';

@Injectable()
export class CsrfService {
    private readonly csrfProtection: any;

    constructor(
        @Inject(CSRF_MODULE_OPTIONS) options: CsrfModuleOptions,
        private readonly configService: ConfigService,
    )
    {
        // On utilise "options" pour déterminer le secret et le cookieName
        const secret = options.secret || this.configService.get<string>('CSRF_SECRET');
        const cookieName = options.cookieName || this.configService.get<string>('CSRF_COOKIE_NAME');
        
        this.csrfProtection = doubleCsrf({
        getSecret: () => secret,
        cookieName,
}    );
    }

    getToken(req: any, res: any) {
        return {
            token: this.csrfProtection.generateToken(req, res),
        };
    }
}
