import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CsrfController } from './csrf.controller';
import { CsrfService } from './csrf.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CsrfModuleOptions } from './interfaces/csrfModuleOptions.interface';
import { CSRF_MODULE_OPTIONS } from './constants';

@Module({})
export class CsrfModule {
    // Méthode statique pour configuration synchronisée
    static forRoot(options: CsrfModuleOptions = {}): DynamicModule {
        const providers: Provider[] =
        [
            {
                provide: CSRF_MODULE_OPTIONS,
                useValue: options,
            },

            CsrfService,
            ConfigService,
        ];
    
        return {
            module: CsrfModule,
            providers: providers,
            imports: [ConfigModule.forRoot()],
            controllers: [CsrfController],
            exports: [CsrfService],
        };
    }

    // Méthode statique pour configuration asynchrone
    // static forRootAsync(): DynamicModule {
    //     return {
    //         module: CsrfModule,
    //         imports: [ConfigModule],
    //         providers: [
    //         {
    //             provide: CSRF_MODULE_OPTIONS,
    //             useFactory: async (configService: ConfigService) => ({
    //             secret: configService.get<string>('CSRF_SECRET'),
    //             cookieName: configService.get<string>('CSRF_COOKIE_NAME'),
    //             }),
    //             inject: [ConfigService]
    //         },
    //         CsrfService,
    //         CsrfGuard
    //         ],
    //         controllers: [CsrfController],
    //         exports: [CsrfService, CsrfGuard]
    //     };
    // }
}
