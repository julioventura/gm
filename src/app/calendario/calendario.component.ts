import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../config/config.service';
import { UtilService } from '../util/util.service';
import { DadosService } from '../dados/dados.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent implements OnInit {

  constructor(
      public config: ConfigService,
      public util: UtilService,
      public dados: DadosService
  ) { }

  // PrimeNG Calendar
  public pt : any;
  public dates: Date[];
  public rangeDates: Date[] = [];
  public invalidDates: Array<Date>;
  public onFocusVal : Date[] = [];


  ngOnInit(): void {
       this.pt = this.config.pt;

       // CALENDARIO
       this.dados.refresh_calendar();
       this.rangeDates = this.config.rangeDates;
  }



    public refresh_calendar() {
        this.dados.refresh_calendar(false);
    }


    onFocus(evento){
        console.log("onFocus($event)")
        this.onFocusVal = this.config.rangeDates;
    }

    onClose(evento){
        console.log("onClose($event)")
        this.refresh_calendar();
    }



}
