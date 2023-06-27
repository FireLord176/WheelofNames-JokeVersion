const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

let jokenumber = 0
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 51, value: "Timmy" },
    { minDegree: 52, maxDegree: 103, value: "Bob" },
    { minDegree: 104, maxDegree: 156, value: "Jim" },
    { minDegree: 157, maxDegree: 204, value: "Chelsea"},
    { minDegree: 205, maxDegree: 256, value: "Johnny" },
    { minDegree: 257, maxDegree: 308, value: "Sarah" },
    { minDegree: 309, maxDegree: 360, value: "Tommy" },
];

//If 1:Enables overwritten winner.
const prankswitch = 1;

//Size of each piece
const data = [51, 51, 51, 51, 51, 51,51];
//background color for each piece
var pieColors = [
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",
    "#449B12",


];
//Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
        //Labels(values which are to be displayed on chart)
        labels: ["Timmy", "Bob", "Jim", "Chelsea", "Johnny", "Sarah","Tommy"],
        //Settings for dataset/pie
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        //Responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            //hide tooltip and legend
            tooltip: false,
            legend: {
                display: false,
            },
            //display labels inside pie chart
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
    /*
    if (prankswitch === 1) {
        finalValue.innerHTML = `<p>Winner: Lyle! \n For being a little bitch</p>`;
        spinBtn.disabled = false;
        break;
    } else {
    */
        for (let i of rotationValues) {
            //if the angleValue is between min and max then display it
            if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
                if (prankswitch === 1) {
                    if (jokenumber === 0) {
                        finalValue.innerHTML = `<p>Winner: Lyle!</p><p1>Reason: For Inventing the wheel!</p1>`;
                        jokenumber = 1;
                    } else {
                        if (jokenumber === 1) {
                            finalValue.innerHTML = `<p>Winner: Ikhlaas!</p><p1>Reason: For making silly rules about no resampling!</p1>`;
                            jokenumber = 2;
                        } else {
                            if (jokenumber === 2) {
                                finalValue.innerHTML = `<p>Winner: Payal!</p><p1>Reason: For adding Louw's name back to the wheel..</p1>`;
                                jokenumber = 0;
                            }
                        }
                    }
                } else {
                   finalValue.innerHTML = `<p>Winner: ${i.value}!</p>`;

                }
                spinBtn.disabled = false;
                break;
            }
        }
   // }
};
//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        //Set rotation for piechart
        /*
        Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
        */
        myChart.options.rotation = myChart.options.rotation + resultValue;
        //Update chart with new value;
        myChart.update();
        //If rotation>360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});