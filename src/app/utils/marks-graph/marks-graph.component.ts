import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: "app-marks-graph",
  templateUrl: "./marks-graph.component.html",
  styleUrls: ["./marks-graph.component.scss"]
})
export class MarksGraphComponent implements OnInit {

  private avg: number = 0;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  user: User;

  private studentMarks: number[] = [];
  public lineChartLabels: Label[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getDataStudent(1,'1992/09/07');
  }

  getDataStudent(id: number,date: string) {
    var json_data = {};
    var resultSubjects = [];
        
    this.userService.getUserMarksByIdAndDate(id, date).then(res => {
      json_data = res;
      for(var i in json_data) {
        resultSubjects.push(i);
        this.studentMarks.push(json_data[i]);
      }
      this.lineChartLabels = resultSubjects;
      this.getAvg();
    });
  }

  public lineChartData: ChartDataSets[] = [
    { data: this.studentMarks, label: "Student" }
  ];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
          ticks: {
            beginAtZero: true,
            fontColor: "blue"
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno"
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = "green";
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ["1st Line", "2nd Line"];
    //this.chart.update();
  }

  getAvg(): void {
    this.studentMarks.map(mark => this.avg += mark);
    this.avg = Math.round((this.avg / this.studentMarks.length) * 100) / 100;
  }
}