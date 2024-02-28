import { Routes } from '@angular/router';
import { FirstComponent } from './dev-test/first/first.component';
import { SecondComponent } from './dev-test/second/second.component';
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { ensureChangeSkippedGuard } from './_service/ensure-change-skipped.guard';
import { HomeComponent } from './layout/home/home.component';
import { ChartTestComponent } from './dev-test/chart-test/chart-test.component';
import { ClipboardTestComponent } from './dev-test/clipboard-test/clipboard-test.component';
import { CopyToClipboardComponent } from './dev-test/copy-to-clipboard/copy-to-clipboard.component';
import { Dbview01Component } from './dev-test/dbview01/dbview01.component';
import { FileDisplay1Component } from './dev-test/file-display1/file-display1.component';
import { FileDisplay2Component } from './dev-test/file-display2/file-display2.component';
import { FlexTest1Component } from './dev-test/flex-test1/flex-test1.component';
import { GoogleMapComponent } from './dev-test/google-map/google-map.component';
import { SapStockComponent } from './dev-test/sap-stock/sap-stock.component';
import { WeatherComponent } from './dev-test/weather/weather.component';
import { HomeDashboardComponent } from './layout/home-dashboard/home-dashboard.component';
import { HttpErrorComponent } from './_shared/http-error/http-error.component';
import { ViewManualComponent } from './view-manual/view-manual/view-manual.component';
import { FileUploadComponent } from './file-mgt/file-upload/file-upload.component';
import { FileDownloadComponent } from './file-mgt/file-download/file-download.component';

// Nesting routes
// HomeLayoutComponent:  <router-outlet>가 포함 되어 있어서 
//    child element first, second를 rendering 
export const routes: Routes = [
    {
        path: 'home', 
        component: HomeLayoutComponent, 
        children: [
            { path: '', component: HomeDashboardComponent},
            { path: 'view-manual', component: ViewManualComponent},
            { path: 'file-upload', component: FileUploadComponent },
            { path: 'file-download', component: FileDownloadComponent },
            { path: 'first',  component: FirstComponent },
            { path: 'second', component: SecondComponent },
            { path: 'dev-test',
              children: [
                { path: 'file-display1', component: FileDisplay1Component },
                { path: 'file-display2', component: FileDisplay2Component },
                { path: 'flex-test1' , component: FlexTest1Component},
                { path: 'dbview01' , component: Dbview01Component},
                { path: 'sapstock', component: SapStockComponent},
                { path: 'googlemap', component: GoogleMapComponent},
                { path: 'authtest' , component: WeatherComponent},
                { path: 'charttest' , component: ChartTestComponent},
                { path: 'clipboardtest' , component: ClipboardTestComponent},
                { path: 'copytoclipboard' , component: CopyToClipboardComponent},
                // { path: 'copytoclipboard' , component: Menu01Component},
              ]  
            },
            { 
              path: 'auth',
              loadChildren: () =>import('./auth/auth.module').then((m)=>m.AuthModule)
            },

            {path:'http-error/:id', component: HttpErrorComponent},      
            { path: '**',     component: PageNotFoundComponent }
            // { path: '**',     component: PageNotFoundComponent,canActivate: [ensureChangeSkippedGuard] }
        ]
    },
    { 
      path: 'huizhou', 
      loadChildren: ()=> import('./huizhou/huizhou.module').then((m)=>m.HuizhouModule)
    },
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path:'http-error/:id', component: HttpErrorComponent},
    // {path: '**', redirectTo: '/home', pathMatch:'full'}
    {path: '**', component: PageNotFoundComponent}
];
