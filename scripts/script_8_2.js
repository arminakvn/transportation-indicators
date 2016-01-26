(function() {
  /*
    8.1 Fatal Crash per 100 vmt
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_8_2 ORDER BY year   &api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
  // var explainable = window.explainable;
    d3.json(url, function(j) {
      base_color = d3.rgb(49, 130, 189);
     
       data_parsed = []
      // console.log(d3.keys(j.rows[0]))
      

      // parse
      j.rows.forEach(function(each) {
        // if ((indexOf.call(scity, each.town) >= 0)) {
        data_parsed.push(
        {
          "Year": each.year,
          "Passenger Car": +each.passenger_car,
          "Light Truck": +each.light_truck,
          "Large Truck": +each.light_truck,
          "Bus": +each.bus,
          "Other/Unknown Vehicle": +each.other_unknown_vehicle,
        }
        )
        // }
      })
      
      // d3.keys(j.rows[0]).forEach(function(each_key) {
      //      data_parsed.push(
      //         {
      //           'label' : each_key, 
      //           'value': j.rows[0][each_key]
      //         }
      //       )
      //      }
      //   )
      // data_map = d3.map(data_parsed, function(d){return d.label;});
      // console.log(data_map)
      // function carto_db_fields (val) {
      //   console.log(data_map.get(val.label).value);
      //   return data_map.get(val.label).value > 1;
      // }
      // data_p = data_parsed.filter(carto_db_fields);
      
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
        bindto: "#chart8_2",
        data: {
            json: data_parsed,
            keys: {
                value: ["Passenger Car", "Light Truck", "Large Truck", "Bus", "Other/Unknown Vehicle"]
            },
            groups: [["Passenger Car", "Light Truck", "Large Truck", "Bus", "Other/Unknown Vehicle"]],
            // colors: {
            // "Passenger Car": base_color,
            // "Light Truck": base_color.darker(1),
            // "Large Truck":base_color.darker(2),
            // "Bus":base_color.darker(3),
            // "Other/Unknown Vehicle":base_color.darker(4)
            // },
            type: 'bar',
            labels: {
              format:  function (v, id, i, j) { 
//                  console.log("v,id,i,j",v,id,i,j)
//                val = v * 2281;
                return d3.format(', ')(v) //+ '%' + '(' + val.toFixed(0) + ')'
              }
            }
          },
          axis: {
              x: {
                  type: 'category',
                  categories: data_parsed.map(function(d){
                    return d["Year"];
                  }),
                  tick: {
                      // rotate: 100,
                       multiline: true
                  },
                  height: 100
              },
              y: {
                  label: {
                    text: 'Pedestrian and bike fatalities',
                    // position: 'outer-middle'
                  }
                  // max: 1

              },
          },
          subchart: {
                show: false
            },
          // regions: [
          //   {axis: 'y', start: 0, end: total_mean , class: 'region-1-3'},
          // //   {axis: 'x', start: 2.5, end:5.5 , class: 'region-3-5'}
          // ],
          legend: {
              show: true
          }
      })
     
      
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