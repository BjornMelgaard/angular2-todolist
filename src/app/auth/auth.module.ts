import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthConfig } from './config';
import { ApiService } from './api';
import { AuthService } from './auth.service';

@NgModule({
  imports: [HttpModule],
  providers: [ApiService, AuthService]
})
export class AuthModule {
  constructor( @Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error(
        'AuthModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: new AuthConfig(config) }
      ]
    };
  }
}


