import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/toolbar/toolbar.service';

@Component({
    selector: 'ui-demo-avatar',
    templateUrl: './demo-avatar.component.html',
    styleUrls: ['./demo-avatar.component.scss']
})
export class DemoAvatarComponent implements OnInit, OnDestroy {

    info: any;
    size: number;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.info = {
            name: 'Jhon Doe',
            color: '#69F0AE',
            image: 'http://gameranx.com/wp-content/uploads/2016/02/No-Mans-Sky-4-K-Wallpaper.jpg'
        };

        setTimeout(() => {
            this.info.image = 'https://wallpapersite.com/images/pages/pic_w/7628.jpg';
            setTimeout(() => {
                this.info.image = 'http://gameranx.com/wp-content/uploads/2016/02/No-Mans-Sky-4-K-Wallpaper.jpg';
                this.info.color = '#673ab7';
                setTimeout(() => {
                    this.info.image = null;
                }, 5000);
            }, 5000);
        }, 5000);
    }

    ngOnInit() {
        this.titleService.setTitle('Avatar - SMN UI Demos');
        this.toolbarService.set('Avatar');
        this.toolbarService.activateExtendedToolbar(600);
    }

    ngOnDestroy() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.set('');
    }
}
