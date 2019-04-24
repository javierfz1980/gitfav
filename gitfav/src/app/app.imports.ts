import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import * as AppReducers from './states/root/root.reducer';
import * as SearchFeatureReducers from './states/search/search.feature.reducer';
import * as FavouritesReducers from './states/favourites/favourites.feature.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './states/search/search.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

const metaReducers: Array<MetaReducer<any, any>> = [];

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const APP_IMPORTS = [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducers.reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(SearchFeatureReducers.FEATURE_NAME, SearchFeatureReducers.reducers),
    StoreModule.forFeature(FavouritesReducers.FEATURE_NAME, FavouritesReducers.reducers),
    EffectsModule.forFeature([SearchEffects]),
    StoreDevtoolsModule.instrument(),
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),
];
