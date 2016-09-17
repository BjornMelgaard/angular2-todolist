/* tslint:disable:no-unused-variable */
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts"/>

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpModule, Http, ConnectionBackend, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from './auth.module';
import { AuthConfig } from './config';
import { ApiService } from './api';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector: Injector;
  let api: ApiService;
  let auth: AuthService;
  let config: AuthConfig;
  let mockRespond = (respond) => {
    injector.get(MockBackend).connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions(respond)));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AuthModule.forRoot(), HttpModule, RouterTestingModule],
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

    injector = getTestBed();
    api = injector.get(ApiService);
    auth = injector.get(AuthService);
    config = injector.get(AuthConfig);
  });

  afterEach(()=>{
    localStorage.clear();
  })

  describe('.singUp', ()=>{
    describe('with correct response', ()=>{
      it('should save user', async( () =>{
        mockRespond({
          body: {
            user: {
              email: 'example@mail.com',
              token: 'example_token' } },
          status: 200 });
        auth.signUp('example@mail.com', '123qwe', '123qwe').subscribe((resp) => {
          expect(auth.isAuthorized()).toBeTruthy();
          expect(api.headers.get('X-USER-TOKEN')).toEqual('example_token')
        });
      }));
    })

    describe('with incorrect response', ()=>{
      it('should not save user', async( () =>{
        mockRespond({
          body: { user: { token: 'example_token' } },
          status: 200 });
        expect(() => {
          auth.signUp('example@mail.com', '123qwe', '123qwe').subscribe((resp) => {});
        }).toThrowError();
        console.log(localStorage);

        expect(auth.isAuthorized()).toBeFalsy();
      }));
    })

  });



});
