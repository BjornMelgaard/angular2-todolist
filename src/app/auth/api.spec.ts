/* tslint:disable:no-unused-variable */
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts"/>

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthModule } from './auth.module';
import { AuthConfig } from './config';
import { ApiService } from './api';

describe('Module: AuthModule', () => {
  const signUpParams = {
    email: 'example@mail.com',
    password: '123qwe',
    password_confirmaition: '123qwe',
  }
  const serverResponse = {
    user: {
      email: 'example@mail.com',
      token: 'example_token'
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AuthModule.forRoot(), HttpModule],
      providers: [
        MockBackend,
        BaseRequestOptions, {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });


  it('should have global headers', async( inject([ApiService], (api: ApiService)=>{
    expect(api.headers.get('Content-Type')).toBe('application/json');
    expect(api.headers.get('Accept')).toBe('application/json');
  })));

  it('should authenticate through api', async( inject([ApiService, AuthConfig, MockBackend], (api: ApiService, config: AuthConfig, backend: MockBackend)=>{
    backend.connections.subscribe((c: MockConnection) => {
      expect(c.request.url).toBe(window.location.origin + '/user');
      c.mockRespond(new Response(new ResponseOptions({body: serverResponse, status: 200})));
    });

    api.post(config.signUpPath, signUpParams).subscribe((resp) => {
      expect(resp).toBe(serverResponse);
    });

  })));

  it('should throw error if status wrong', async( inject([ApiService, AuthConfig, MockBackend], (api: ApiService, config: AuthConfig, backend: MockBackend)=>{
    backend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({status: 422})));
    });

    expect(() => {
      api.post(config.signUpPath, signUpParams).subscribe((resp) => {});
    }).toThrowError();

  })));
});
