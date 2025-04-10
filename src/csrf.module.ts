import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CsrfService } from './csrf.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CsrfModuleOptions } from './interfaces/csrfModuleOptions.interface';
import { CSRF_MODULE_OPTIONS } from './constants';
import { createCsrfDynamicController } from './csrf.dynamic.controller';

@Module({})
export class CsrfModule {
    // Méthode statique pour configuration synchronisée
    static forRoot(options: CsrfModuleOptions = {}): DynamicModule {
        const dynamicController = createCsrfDynamicController(options.url || '/csrf');
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
            global: options.isGlobal ?? true,
            providers: providers,
            imports: [ConfigModule.forRoot()],
            controllers: [dynamicController],
            exports: [CsrfService],
        };
    }
}
