(function() {
  /*
    8.1 Fatal Crash per 100 vmt
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_6_1 & SORT BY race&api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
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
          "All Races Ethnicities": +each.all_races_ethnicities,
          "Bicycle": +each.bicycle,
          "Car": +each.car,
          "Other": +each.other,
          "Race": each.race,
          "Transit": +each.transit,
          "Walk": +each.walk
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
        bindto: "#chart6_1",
        data: {
            json: data_parsed,
            keys: {
                value: ["Bicycle", "Car", "Other", "Transit", "Walk"]
            },
            groups: [["All Races Ethnicities", "Bicycle", "Car", "Other", "Transit", "Walk"]],
//             colors: {
//             "Bicycle": base_color,
//             "Car": base_color.darker(1),
//             "Other":base_color.darker(2),
//             "Transit":base_color.darker(3),
//             "Walk":base_color.darker(4)
//             },
            type: 'bar',
            labels: {
              format:  function (v, id, i, j) { 
//                  console.log("v,id,i,j",v,id,i,j)
//                val = v * 2281;
                return d3.format(', ')(v.toFixed(2)) //+ '%' + '(' + val.toFixed(0) + ')'
              }
            }
          },
          axis: {
              x: {
                  type: 'category',
                  categories: data_parsed.map(function(d){
                    return d["Race"];
                  }),
                  tick: {
                      // rotate: 100,
                      // multiline: true
                  },
                  height: 100
              },
              y: {
                  label: {
                    text: 'Commute Mode by Race and Latino Origin',
                    // position: 'outer-middle'
                  },
//                   max: 1

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