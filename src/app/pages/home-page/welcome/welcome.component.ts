import { ApplicationConfig, Component } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions, Chart } from 'chart.js';
import { ChartType } from 'ng-apexcharts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TinCheckSerialService } from 'src/app/share/_services/tinCheckSerial.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeChart } from 'src/app/share/_services/welcome.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



// import { Chart } from '../../../../../node_modules/chart.js/auto/auto.mjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  listOfDataDashBoard: any;

  tongSlSpNhapKho: number = 0;// 9. tổng số lượng nhập kho
  tongSlSpKhongDat: number = 0;// 10. tổng số lượng không đạt
  tiLeSpDat: number = 0; //11.
  tiLeSpLoiQuaTrinh: number = 0; //12.
  tongSlBTPNhapKho: number = 0; //13.
  tongSlBTPKhongDat: number = 0; //14.
  tiLeBTPDat: number = 0; //15.
  tiLeBTPLoiQuaTrinh: number = 0; //16.
  choPheDuyetLenhSX: number = 0; //17.
  choPheDuyetBBKT: number = 0; //18.
  soLoKT: number = 0; //19.
  soLoKhongDat: number = 0; //20.
  soLoNhanNhuong: number = 0; //21.
  slVatTuNhap: number = 0; //22.
  slVatTuDat: number = 0; //23.
  slVatTuKhongDat: number = 0; //24.
  slVatTuNhanNhuong: number = 0; //25.
  tiLeLoiVatTuQTSX: number = 0; //26.
  tongSoNCC: number = 0; //27.
  tongSoBienBanIQC: number = 0; //28.
  tongSoMauDoSP: number = 0; //29.
  soMauSPDat: number = 0; //30.
  tiLeSPDatThongSo: number = 0; //31.
  soMauSPKhongDat: number = 0; //32.
  tongSoMauDoBTPDrv: number = 0; //33.
  soMauBTPDrvDat: number = 0; //34.
  tiLeBTPDrvDatThongSo: number = 0; //35.
  soMauBTPDrvKhongDat: number = 0; //36.

  popupReport = false;
  popupConfig = false;
  listOfNganh = [
    { tenNganh: 'Ngành SMART', target: 20 },
    { tenNganh: 'Ngành DTTD', target: 10 },
    { tenNganh: 'Ngành LR LED', target: 15 },
    { tenNganh: 'Ngành TBCS', target: 10 },
    { tenNganh: 'Ngành CNPT', target: 10 },
  ]

  listOfTarget = [
    { nameTarget: 'Tỉ lệ sản phẩm đạt', targetMin: 0, targetMax: 0.002, color: '' },
    { nameTarget: 'Tỉ lệ sản phẩm đạt', targetMin: 0.002, targetMax: 0.015, color: '' },
    { nameTarget: 'Tỉ lệ sản phẩm đạt', targetMin: 0.015, targetMax: 100, color: '' },
  ]

  listOfReport = [

    { timeReport: '19/03/2024 15:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '19/03/2024 10:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '19/03/2024 15:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '19/03/2024 15:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '19/03/2024 15:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '18/03/2024 10:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '17/03/2024 15:05:30', user: 'admin', comment: '', status: 'wait' },
    { timeReport: '16/03/2024 10:05:30', user: 'admin', comment: '', status: 'wait' },

  ]
  path: string;

  constructor(
    // private accountService: AccountService,
    // private loginService: LoginService,
    // private applicationConfig: ApplicationConfig,
    private modalService: NgbModal,
    private welcomeChart: WelcomeChart,
    private http: HttpClient,
  ) { this.path = environment.api_end_point }

  ngOnInit(): void {
    // Tỉ lệ lỗi các bộ phận SX so với mục tiêu
    // config
    const config = {
      type: 'bar',
      data: {
        datasets: [{
          data: [{ key: 'LR LED', value: 20 }, { key: 'Thiết bị chiếu sáng', value: 20 }, { key: 'DTTD', value: 15 }, { key: 'CNPT', value: 20 }, { key: 'SMART', value: 25 }] as unknown,
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Tỉ lệ lỗi',

        },
        {
          type: 'line',
          data: [{ key: 'LR LED', value: 30 }, { key: 'Thiết bị chiếu sáng', value: 25 }, { key: 'DTTD', value: 10 }, { key: 'CNPT', value: 25 }, { key: 'SMART', value: 10 }],
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Tỉ lệ lỗi mục tiêu',

        }
        ],

      },
      options: {
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Tỉ lệ lỗi các bộ phận SX so với mục tiêu',
            font: {
              size: 30,
            }
          },
          legend: {
            display: true,
            position: 'top'
          }
        }
      },
      plugins: [ChartDataLabels],
    };



    // render init block
    const myChart = new Chart(
      document.getElementById('myChart') as HTMLCanvasElement,
      config as ChartConfiguration
    );

    const configNhomLoi = {
      type: 'pie',
      data: {
        datasets: [{
          data: [{ key: this.getAllDataDashBoard, value: 54 }, { key: 'Nhóm lỗi vật tư', value: 41 }, { key: 'Nhóm lỗi máy', value: 5 }] as unknown,
          datalabels: {
            align: 'center',
            anchor: 'center',
            formatter: (i: any, ctx: any) => {
              i.value
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data
              dataArr.map((data: any) => {

                sum += Number(data)
              })
              console.log('sum', sum)
              console.log('dataArr', dataArr)
              let percenTage = (Number(i.value) * 100 / Number(sum)).toFixed(2) + "%"
              return percenTage
            }
          },
        }],
        labels: ['Nhóm lỗi thao tác', 'Nhóm lỗi vật tư', 'Nhóm lỗi máy']
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "center"
          },
          title: {
            display: true,
            text: 'Phân tích nhóm lỗi trong sản xuất',
            font: {
              size: 30,
            }
          },
          // datalabels: {
          //   formatter: (value: any, ctx: any) => {
          //     const datapoints = ctx.chart.data.datasets[0].data
          //     const total = datapoints.reduce((total: any, datapoint: any) => total + datapoint, 0)
          //     const percentage = value.value / total * 100
          //     console.log(total)
          //     console.log(datapoints)
          //     return percentage.toFixed(2) + "%";
          //   },
          // }
        },
      },
      plugins: [ChartDataLabels],
      position: {
        legend: 'right'
      },
    };

    const myChartNhomLoi = new Chart(
      document.getElementById('myChartNhomLoi') as HTMLCanvasElement,
      configNhomLoi as ChartConfiguration
    )

    // const dataSPNhieuLoi = {
    //   labels: ['Buld 40W', 'Downlight AT đổi màu', 'Module AT 20', 'Driver Led dây', 'Đèn đường 200W'],
    //   datasets: [
    //     {
    //       data: [200, 300, 30, 50, 30, 20],
    //       backgroundColor: [
    //         '#86c7f3'
    //       ],
    //       datalabels: {
    //         align: 'end',
    //         anchor: 'end'
    //       },
    //       borderColor: [
    //         'none'
    //       ],
    //     },
    //   ]
    // }

    const configSPNhieuLoi = {
      type: 'bar',
      data: {
        datasets: [{
          data: [{ key: 'Buld 40W', value: 200 }, { key: 'Downlight AT đổi màu', value: 300 }, { key: 'Module AT 20', value: 30 }, { key: 'Driver downlight', value: 50 }, { key: 'Driver Led Dây', value: 30 }, { key: 'Đèn đường 200W', value: 20 }] as unknown,
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value
          },
          label: 'Lỗi'
        }]
      },
      options: {
        responsive: true,
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',

        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Top sản phẩm nhiều lỗi nhất trong sản xuất',
            font: {
              size: 30,
            }
          }
        }
      },
      plugins: [ChartDataLabels],

    };

    const myChartSPNhieuLoi = new Chart(
      document.getElementById('myChartSPNhieuLoi') as HTMLCanvasElement,
      configSPNhieuLoi as ChartConfiguration
    )

    const configChatLuongNhap = {
      type: 'pie',
      data: {
        datasets: [{
          data: [{ key: 'Đạt nhập kho', value: 87 }, { key: 'Nhân nhượng', value: 9 }, { key: 'Không đạt', value: 4 }] as unknown,
          datalabels: {
            align: 'center',
            anchor: 'center',
            formatter: (i: any) => i.value,
          }
        }],
        labels: ['Đạt nhập kho', 'Nhân nhượng', 'Không đạt']
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Tổng hợp chất lượng nhập hàng hoá',
            font: {
              size: 30,
            }
          },
          legend: {
            display: true,
            position: "right",
            align: "center"
          },
        }
      },
      plugins: [ChartDataLabels],
    };
    const myChartChatLuongNhap = new Chart(
      document.getElementById('myChartChatLuongNhap') as HTMLCanvasElement,
      configChatLuongNhap as ChartConfiguration
    )

    const configTTVatTu = {
      type: 'bar',
      data: {
        datasets: [{
          data: [{ key: 'NCC A', value: 1900000 }, { key: 'NCC B', value: 140000 }, { key: 'NCC C', value: 9900000 }, { key: 'NCC D', value: 1450000 }] as unknown,
          datalabels: {
            align: 'end',
            anchor: 'center',
            formatter: (i: any) => i.value,
          },
          label: 'Số lượng đạt',

        }, {
          type: 'bar',
          data: [{ key: 'NCC A', value: 50000 }, { key: 'NCC B', value: 5000 }, { key: 'NCC C', value: 500000 }, { key: 'NCC D', value: 25000 }],
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Số lượng không đạt',

        },
        {
          type: 'bar',
          data: [{ key: 'NCC A', value: 50000 }, { key: 'NCC B', value: 5000 }, { key: 'NCC C', value: 500000 }, { key: 'NCC D', value: 25000 }],
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Số lượng nhân nhượng',

        },
        {
          type: 'line',
          data: [{ key: 'NCC A', value: this.listOfDataDashBoard }, { key: 'NCC B', value: 150000 }, { key: 'NCC C', value: 10000000 }, { key: 'NCC D', value: 1500000 }],
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Tổng số lượng nhập',
          backgroundColor: '#36a2eb',
          borderColor: '#36a2eb',
        }
        ]
      },
      options: {
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',

        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "center"
          },
          title: {
            display: true,
            text: 'Tổng hợp tình trạng vật tư mua hàng',
            font: {
              size: 30,
            }
          },
        }
      },
      plugins: [ChartDataLabels],
    };

    const myChartTTVatTu = new Chart(
      document.getElementById('myChartTTVatTu') as HTMLCanvasElement,
      configTTVatTu as ChartConfiguration
    )


    const configChatLuongHang = {
      type: 'bar',
      data: {
        datasets: [{
          data: [{ key: 'Lỗi bộ vỏ', value: 400 }, { key: 'Lỗi PCB', value: 200 }, { key: 'Lỗi nguồn', value: 80 }] as unknown,
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Tổng số lượng rút nghiệm',

        }, {
          type: 'bar',
          data: [{ key: 'Lỗi bộ vỏ', value: 20 }, { key: 'Lỗi PCB', value: 10 }, { key: 'Lỗi nguồn', value: 20 }],
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: (i: any) => i.value,
          },
          label: 'Tổng lỗi',

        },

        ]
      },
      options: {
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',

        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Tổng hợp tình trạng vật tư mua hàng',
            font: {
              size: 30,
            }
          },
          legend: {
            display: true,
            position: "bottom",
            align: "center"
          },
        }
      },
      plugins: [ChartDataLabels],
    };

    const myCharthatLuongHang = new Chart(
      document.getElementById('myChartChatLuongHang') as HTMLCanvasElement,
      configChatLuongHang as ChartConfiguration
    )
    this.getAllDataDashBoard();
  }

  getAllDataDashBoard(): void {
    this.http.get<any>('http://localhost:8449/dashboard/home').subscribe(res => {
      this.listOfDataDashBoard = res;
      this.choPheDuyetLenhSX = res.countIqcWaitApproveStatus
      this.choPheDuyetBBKT = res.countWorkOrderWaitStatus
      this.soLoKhongDat = res.pqcQuantityDashResponseList.conclude
      this.soLoNhanNhuong = res.pqcQuantityDashResponseList.conclude
      // tính toán dữ liệu và lưu vào biến hiển thị
      /** THông tin chất lượng sản phẩm
       * @param: 1 - Tổng số lượng nhập kho - slNhapKho storages
       * @param:
      */
      for (let i = 0; i < this.listOfDataDashBoard.pqcStoreCheckList.length; i++) {
        // code in here
        if (this.listOfDataDashBoard.pqcStoreCheckList.conclude === 'Đạt') {
          this.soLoKT = this.listOfDataDashBoard.pqcQuantityDashResponseList[i].conclude
        }
        // console.log("19", this.listOfDataDashBoard.pqcQuantityDashResponseList[i].conclude)
      }


      console.log('result dashboard', res);
    })
  }

  openPopupReport(): void {
    this.popupReport = true;
  }

  openPopupConfig(): void {
    this.popupConfig = true;
  }

  closePopupReport(): void {
    this.popupReport = false;
  }

  closePopupConfig(): void {
    this.popupConfig = false;
  }
}
