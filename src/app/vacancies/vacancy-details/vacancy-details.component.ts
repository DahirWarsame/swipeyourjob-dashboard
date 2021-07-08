import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, Vacancy, IVacancy, IVacancyList } from '@app/models';
import { JobService } from '@app/services';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
// import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {
    vacancies : IVacancyList = {
        joblist: [{jobName: "Kassamedewerker", jobid:0, daysValid:50, images:["gakjslsjkfds"] }]
    };
    avaibility = [
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    },
    {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    }
    ];
    matches = [
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility},
        {profileImg: "test", voornaam:"Dahir", achternaam:"Warsame",age:26, availabilty:this.avaibility}
    ]
    job: Vacancy| undefined;
    visiable= false;
    public icons: any = {
        faCheck: faCheck,
        faTimes: faTimes
    };
    routeParams = this.route.snapshot.paramMap;
    jobidFromRoute = Number(this.routeParams.get('vacancyId'));

    constructor( 
        private jobService: JobService, 
        private route: ActivatedRoute, 
        // private dialog: MatDialog
        ) { 

    }

    ngOnInit(): void {
        this.jobService.getAll().subscribe(
            (data: any) => {
                let vacancies = { ...data };
                let vacanciesLength = Object.keys(vacancies.joblist).length;
                if (vacanciesLength > 0) {
                    this.vacancies.joblist = vacancies.joblist;
                    console.log(this.vacancies);
                } else {
                    console.log('No active vacancies.');
                }
            },
            (err: any) => {
                console.log('Error while fetching active vacancies: ' + err);
            }
        );
        this.route.paramMap.subscribe(params => this.jobidFromRoute = Number(params.get('vacancyId')));
        console.log(this.jobidFromRoute);
    }

    viewVacancy(vacancy:any, index:number): void {
        console.log( this.visiable);
        console.log( this.jobidFromRoute);
        this.visiable= !this.visiable;
    }

    updateLikeStatus(): void{
        
    }
    getLenght(): string{
        
        return ""+this.vacancies.joblist.length
    }
}
