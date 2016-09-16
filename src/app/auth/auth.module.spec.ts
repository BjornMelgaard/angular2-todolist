/* tslint:disable:no-unused-variable */
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts"/>

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Headers } from '@angular/http';
import { AuthModule } from './auth.module';
import { AuthConfig } from './config';
import { ApiService } from './api';

describe('Module: AuthModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AuthModule.forRoot(), HttpModule]
    });
  });

  it('should have default config', async( inject([AuthConfig], (config: AuthConfig)=>{
    expect(config).toBeTruthy();
    expect(config.tokenName).toBe('X-USER-TOKEN');
  })));

});
