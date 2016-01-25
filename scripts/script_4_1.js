(function() {
  /*
    4.1. Commute time by travel mode
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_4_1_commute_time_by_travel_mode ORDER BY mode DESC  &api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
  // var explainable = window.explainable;
    d3.json(url, function(j) {
      base_color = d3.rgb(49, 130, 189);
      console.log(j);
        _data = []
        j.rows.forEach(function(each) {
            console.log("each of the j rows - trying to see if I can update the json here?!", each)
        // if ((indexOf.call(scity, each.town) >= 0)) {
        _data.push(
        {
          "0 to 29 minutes": +each._0_to_29_minutes,
          "30 to 59 minutes": +each._30_59_minutes,
            "More than 60 minutes": +each._60_plus_minutes,
        }
        )
        console.log(_data)
        
        // }
      })
      var chart = c3.generate({
        size: {
          width: 840,
          height: 450
        },
        bindto: "#chart4_1",
          
        data: {
            json: _data,
            keys: {
                value: ['0 to 29 minutes', '30 to 59 minutes', 'More than 60 minutes']
            },
            groups: [['0 to 29 minutes', '30 to 59 minutes', 'More than 60 minutes']],
            colors: {
            '0 to 29 minutes': base_color,
            '30 to 59 minutes': base_color.darker(1),
            'More than 60 minutes':base_color.darker(2)
            },
            type: 'bar',
            labels: {
              format:  function (v, id, i, j) { 
//                  console.log("v,id,i,j",v,id,i,j)
                return d3.format('%,')(v.toFixed(2)) //+ '%' + '(' + val.toFixed(0) + ')'
              }
            },
          },
          axis: {
              x: {
                  type: 'category',
                  categories: j.rows.map(function(d) { return d.geography; }),
                  tick: {
                      rotate: 75,
                      multiline: true
                  },
                  height: 100
              },
              y: {
                  label: {
                    text: 'Patents of commuters',
                     position: 'outer-middle'
                  },
                  max: 1,
                  tick: {
                    format: d3.format("%,")
                    //or format: function (d) { return '$' + d; }
                  }

              },
          },
          subchart: {
                show: false
            },
          regions: [
            {axis: 'x', start: -0.5, end:2.5 , class: 'region-1-3'},
            {axis: 'x', start: 2.5, end:5.5 , class: 'region-3-5'}
          ],
          legend: {
              show: true
          }
      })
      console.log(chart.data.colors());
      
      // chart.data.colors({
      //   '_0_to_29_minutes': base_color,
      //   '_30_59_minutes': base_color.darker(1),
      //   '_60_plus_minutes':base_color.darker(2)
      // });
    //   setTimeout(function () {
    //     chart.groups([['_0_to_29_minutes', '_30_59_minutes', '_60_plus_minutes']])
    // }, 10);
    });
})();