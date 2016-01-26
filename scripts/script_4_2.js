(function() {
  /*
    4.2. Average commute times
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_4_2 ORDER BY label  DESC LIMIT 1  &api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
  // var explainable = window.explainable;
    d3.json(url, function(j) {
      base_color = d3.rgb(49, 130, 189);
      console.log(j);
      total_mean = j.rows[0].total_mean
       data_parsed = []
      // console.log(d3.keys(j.rows[0]))
      
      
      d3.keys(j.rows[0]).forEach(function(each_key) {
           data_parsed.push(
              {
                'label' : each_key, 
                'Commute Time': j.rows[0][each_key]
              }
            )
           }
        )
      data_map = d3.map(data_parsed, function(d){return d.label;});
      console.log("data parsed and data map",data_map)
      function carto_db_fields (val) {
        console.log(data_map.get(val.label)["Commute Time"]);
        return data_map.get(val.label)["Commute Time"] > 1;
      }
      data_p = data_parsed.filter(carto_db_fields);
      
      // data_parsed = [{
      //   'label' : 'public_transit',
      //   'value' : j.rows[0].public_transit,
              
      // }]
      // console.log(data_parsed)
      var chart = c3.generate({
        size: {
          width: 840,
          height: 450
        },
        bindto: "#chart4_2",
        data: {
            json: data_p,
            keys: {
                value: ["Commute Time"]
            },
            // groups: [['public_transit', 'walk', 'bicycle', 'other', 'car']],
            colors: {
            'public_transit': base_color,
            'walk': base_color.darker(1),
            'bicycle':base_color.darker(2),
            'other':base_color.darker(3),
            'car':base_color.darker(4)
            },
            type: 'bar',
            labels: {
              format:  function (v, id, i, j) { 
//                  console.log("v,id,i,j",v,id,i,j)
//                val = v * 2281;
                return d3.format(', ')(v.toFixed(1)) //+ '%' + '(' + val.toFixed(0) + ')'
              }
            }
          },
          axis: {
              x: {
                  type: 'category',
                  categories: data_p.map(function(d){
                    return d.label;
                  }),
                  tick: {
                      rotate: 75,
                      multiline: true
                  }
                  // height: 100
              },
              y: {
                  label: {
                    text: 'Average commute time to work',
                     position: 'outer-middle'
                  }
                  // max: 1

              },
          },
          subchart: {
                show: false
            },
          regions: [
            {axis: 'y', start: 0, end: total_mean , class: 'region-1-3'},
          //   {axis: 'x', start: 2.5, end:5.5 , class: 'region-3-5'}
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