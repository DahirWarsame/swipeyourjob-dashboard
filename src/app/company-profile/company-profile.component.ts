import { Component, OnInit } from '@angular/core';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { EstablishmentService } from 'app/_services/establishment.service';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  faInstagram,
  faFacebook,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { TokenStorageService } from '../_services';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {
    public Editor = InlineEditor;

    public form: any = {
        CompanyIntroduction: null,
        Companylogo: null,
        Firstname: null,
        Lastname: null,
        profileUrl: null,
        CompanyUrl: null,
        facebooklink: null,
        instagramlink: null,
        linkedinlink: null,
        Place: null,
        Streetname: null,
        housenumber: null,
        zipcode: null,
    };
    public icons: any = {
        faInstagram: faInstagram,
        faFacebook: faFacebook,
        faLinkedin: faLinkedin,
    };
    public wordcount = 0;
    
    public constructor(
        private tokenStorage: TokenStorageService,
        private establishment: EstablishmentService,
        private titleService: Title
    ) { }

    public ngOnInit(): void {
        this.titleService.setTitle('SwipeYourJob - Bedrijfsprofiel aanmaken');
        this.establishment.getUserEstamblishments().subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        );
        let userinfo = this.tokenStorage.getUserinfo();
        if (userinfo != null) {
            console.log(userinfo);
            this.form.Firstname =
                userinfo['firstname'] != null && userinfo['firstname'] != ''
                    ? userinfo['firstname']
                    : null;
            this.form.Lastname =
                userinfo['lastname'] != null && userinfo['lastname'] != ''
                    ? userinfo['lastname']
                    : null;
        }
        this.Editor.defaultConfig = {
            toolbar: ['heading', '|', 'bold', 'italic', 'custombutton'],

            // This value must be kept in sync with the language defined in webpack.config.js.
            language: 'en',
        };
    }
    public onSubmit(f: NgForm): void {
        console.log(f.value.facebooklink);
        console.log(f.value.instagramlink);
        console.log(f.value.linkedinlink);
        //console.log(f.valid);
    }

    public companydescriptionChanged(event: KeyboardEvent): void {
        console.log(event);
        if (this.form.CompanyIntroduction != null) {
            // regex to remove all the html tag
            var regex = /(<([^>]+)>)/gi;
            const wordcounter = this.form.CompanyIntroduction.replace(
                regex,
                ''
            ).replace(' ', '');
            if (wordcounter.length + 1 >= 251) {
                event.preventDefault();
            } else {
                this.wordcount = wordcounter.length + 1;
            }
        } else {
            this.wordcount = 1;
        }
    }
}
