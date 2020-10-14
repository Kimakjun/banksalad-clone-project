import { $el, $new } from "../../util/dom";
import { MONTH_BUTTON_CLICK } from "../../util/event";
import "../../public/statisticDay.scss";

class StatiticDay {
  constructor({ root }) {
    this.root = root;
    this.StatiticDay = $new("div", "StatiticDay");
    this.init();
    this.render();
  }

  subscribeNavBar(model) {
    model.subscribe(MONTH_BUTTON_CLICK, this.updateStatiticDayView.bind(this));
  }

  updateStatiticDayView({ transDay, month, averageExpenditure }) {
    console.log(transDay);
    this.drawMonthLine(month);
    this.drawAverageLine(averageExpenditure);
  }

  drawMonthLine(month) {
    $el(".x-labels").innerHTML = Array.from(
      { length: 6 },
      (_, i) => 1 + i * 5
    ).reduce((acc, cur) => {
      acc += `<text x="${40 + cur * 25}" y="500">${month}.${cur}</text>
        `;
      return acc;
    }, "");
  }

  getAverageHeight(averageExpenditure) {
    return (400 * averageExpenditure) / 400000;
  }

  drawAverageLine(averageExpenditure) {
    const averageHeight = this.getAverageHeight(averageExpenditure);
    $el(".average").innerHTML = `
        <line x1="40" y1="${420 - averageHeight}" x2="1200" y2="${
      420 - averageHeight
    }"></line>
        <text x="700" y="${
          410 - averageHeight
        }">평균${averageExpenditure}원</text>    
    `;
  }

  init() {
    //this.drawX();
    //this.drawY();

    this.StatiticDay.innerHTML = `
    <svg calss="statisticDay__svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">



        <g class="grid y-grid" id="yGrid">
            <line x1="40" y1="460" x2="1200" y2="460"></line>
        </g>

        <g class="average">

        </g>

        <g class="labels x-labels">
            
        </g>

        <g class="labels y-labels">
            ${Array.from({ length: 9 }, (_, i) => 20 + i * 50).reduce(
              (acc, cur) => {
                acc += `<text x="0" y="${cur}">${(420 - cur) / 10}만</text>
                <line class="grid x-grid" x1="40" y1="${cur}" x2="1200" y2="${cur}"></line>
                `;
                return acc;
              },
              ""
            )}
        </g>

    </svg>
    `;
  }

  render() {
    this.root.appendChild(this.StatiticDay);
  }
}

export default StatiticDay;