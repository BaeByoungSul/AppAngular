import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_service/auth.service';
@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  panelOpenState: boolean = false;

  devMenu = [
    { routePath : '/home/dev-test/file-display1', iconName :'folder', menuName: 'File Explore1' },
    { routePath : '/home/dev-test/file-display2', iconName:'folder', menuName: 'Api File Explore2' },
    //{ routePath : '/home/dev-test/flex-test1', iconName : 'folder',  menuName: 'Flexbox Test1' },
    { routePath : '/home/dev-test/dbview01',  iconName: 'android', menuName: '데이터조회' },
    { routePath : '/home/dev-test/sapstock',  iconName: 'android', menuName: 'SAP재고조회' },
    { routePath : '/home/dev-test/googlemap',  iconName: 'android', menuName: '구글맵테스트' },
    { routePath : '/home/dev-test/authtest',  iconName: 'android', menuName: 'Autorize 테스트' },
    { routePath : '/home/dev-test/charttest',  iconName: 'android', menuName: 'Chart테스트' },
    { routePath : '/home/dev-test/clipboardtest',  iconName: 'android', menuName: 'Clipboard 테스트' },
    { routePath : '/home/dev-test/copytoclipboard',  iconName: 'android', menuName: 'Copy To Clipboard' },
  ]

  huizhoMenu = [
    {routePath : '/huizhou/khc001', iconName : 'favorite_border', menuName: '화면1' },
    {routePath : '/huizhou/khc002', iconName : 'favorite_border', menuName: '화면2' },
    {routePath : '/huizhou/khc003', iconName : 'favorite_border', menuName: '화면3' },
  ]
  constructor(
    public authService$: AuthService
  ){}
}
