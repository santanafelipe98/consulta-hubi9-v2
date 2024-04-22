function drawRiskScore(intoElSelector, value) {
    const ctx = document.querySelector(intoElSelector);

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Ruim',
                'Regular',
                'Bom',
                'Excelente'
              ],
              datasets: [{
                label: 'Score',
                data: [30, 20, 20, 30],
                backgroundColor: [
                  '#ff5b5b',
                  '#f9c851',
                  '#a6c72a',
                  '#10c469'
                ],
                hoverOffset: 4,
                borderWidth: 3,
                hoverBorderColor: 'transparent',
              }]
        },
        options: {
            rotation: 270,
            cutout: '90%',
            circumference: 180,
            responsive: true,
            plugins:{
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
              onComplete: function (e) {
                this.options.animation.onComplete = null;

                const chartContainer = ctx.parentNode;
                const imgEl          = new Image(250);
                const url            = chart.toBase64Image();
                imgEl.src = url;
                chartContainer.appendChild(imgEl);

                imgEl.style.display = 'none';

                window.addEventListener('beforeprint', () => {
                  chart.resize();

                  imgEl.style.display = 'block';
                  ctx.style.display   = 'none';
                });
                window.addEventListener('afterprint', () => {
                  chart.resize();

                  imgEl.style.display = 'none';
                  ctx.style.display   = 'block';
                });

                window.addEventListener('resize', () => {
                  chart.resize();
                });
              }
            }
        },
        plugins: [{
            id: 'text',
            beforeDraw: function(chart) {
              const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
        
              ctx.restore();
              const fontSize = (height / 80).toFixed(2);
              ctx.font = `bold ${fontSize}em Open Sans`;
              ctx.textBaseline = "middle";

              let color = 'black';

              if (value >= 701 && value <= 1000) {
                color = '#10c469';
              } else if (value >= 501 && value <= 700) {
                color = '#a6c72a';
              } else if (value >= 301 && value <= 500) {
                color = '#f9c851';
              } else {
                color = '#ff5b5b';
              }
        
              const text = value,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.6;
              
              ctx.fillStyle = color;
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }]
    });

    return chart;
}

function drawPositiveScore(intoElSelector, value) {
  const ctx = document.querySelector(intoElSelector);

  const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: [
              'Ruim',
              'Regular',
              'Bom'
            ],
            datasets: [{
              label: 'Score',
              data: [30, 30, 40],
              backgroundColor: [
                '#ff5b5b',
                '#f9c851',
                '#10c469'
              ],
              hoverOffset: 4,
              borderWidth: 3,
              hoverBorderColor: 'transparent',
            }]
      },
      options: {
          rotation: 270,
          cutout: '90%',
          circumference: 180,
          responsive: true,
          plugins:{
              legend: {
                  display: false
              },
              tooltip: {
                  enabled: false
              }
          },
          animation: {
            onComplete: function (e) {
              this.options.animation.onComplete = null;

              const chartContainer = ctx.parentNode;
              const imgEl          = new Image(250);
              const url            = chart.toBase64Image();
              imgEl.src = url;
              chartContainer.appendChild(imgEl);

              imgEl.style.display = 'none';

              window.addEventListener('beforeprint', () => {
                chart.resize();

                imgEl.style.display = 'block';
                ctx.style.display   = 'none';
              });
              window.addEventListener('afterprint', () => {
                chart.resize();

                imgEl.style.display = 'none';
                ctx.style.display   = 'block';
              });

              window.addEventListener('resize', () => {
                chart.resize();
              });
            }
          }
      },
      plugins: [{
          id: 'text',
          beforeDraw: function(chart) {
            const width = chart.width,
              height = chart.height,
              ctx = chart.ctx;
      
            ctx.restore();
            const fontSize = (height / 80).toFixed(2);
            ctx.font = `bold ${fontSize}em Open Sans`;
            ctx.textBaseline = "middle";

            let color = 'black';

            if (value >= 601 && value <= 1000) {
              color = '#10c469';
            } else if (value >= 301 && value <= 600) {
              color = '#a6c72a';
            } else {
              color = '#ff5b5b';
            }
      
            const text = value,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 1.6;
            
            ctx.fillStyle = color;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }]
  });

  return chart;
}

const btnScrollUp   = document.getElementById('btn_scroll_up');
const btnScrollDown = document.getElementById('btn_scroll_down');
const btnPrint      = document.getElementById('btn_print');
        

btnPrint.addEventListener('click', () => window.print());

window.addEventListener('scroll', () => {
    const yOffset   = window.scrollY;
    const docHeight = document.body.clientHeight;

    if (yOffset <= 1000) {
        btnScrollUp.style.visibility = 'hidden';
    } else {
        btnScrollUp.style.visibility = 'visible';
    }

    if (yOffset <= docHeight - 1000) {
        btnScrollDown.style.visibility = 'visible';
    } else {
        btnScrollDown.style.visibility = 'hidden';
    }
});

btnScrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnScrollDown.addEventListener('click', () => {
    const docHeight = document.body.clientHeight;

    window.scrollTo({ top: docHeight, behavior: 'smooth' });
});