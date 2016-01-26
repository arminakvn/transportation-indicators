(function() {
  /*
    2.1 Share of Bridges that are Structurally Deficient, MA vs Peer States vs US
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_7_1 & ORDER BY cost &api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
  // var explainable = window.explainable;
    d3.json(url, function(j) {
      base_color = d3.rgb(49, 130, 189);
       data_parsed = []
       _data = []
       x_data = []
       data_point1 = []
       data_point2 = []
       data_point3 = []
      // console.log(d3.keys(j.rows[0]))
      

      // parse
      j.rows.forEach(function(each) {
        // if ((indexOf.call(scity, each.town) >= 0)) {
        _data.push(
        {
          "Cost": +each.cost,
           "Metropolitan Area": each.metro,
          // "US": +each.us_fo,
//          date: new Date(each.year, 01, 01),
//          "Race": each.race,
        }
        )
        
        // }
      })
      // var _nestedData = d3.nest()
      //     .key(function(d){return d["Year"]})
      //     .entries(_data);
      // console.log("data",_nestedData);
      
      _data.forEach(function(mnt_data){
        data_point1.push(mnt_data["Cost"]);
//         data_point2.push(mnt_data["Metropolitan Area"]);
        // data_point3.push(mnt_data["US"]);
        x_data.push(mnt_data["Metropolitan Area"]);
        
      })
      data_point1.unshift("Cost");
//       data_point2.unshift("Overall Average");
      // data_point3.unshift("US");
      data_parsed.push(
          data_point1
          );
//       data_parsed.push(
//           data_point2
//         );
      // data_parsed.push(
      //     data_point3
      //   );
      x_data.unshift('Metropolitan Area');
      data_parsed.unshift(x_data);
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
        bindto: "#chart7_1",
        data: {
            x: 'Metropolitan Area',
            columns: data_parsed,
            type: 'bar',
            labels: {
              format:  function (v, id, i, j) { 
//                  console.log("v,id,i,j",v,id,i,j)
//                val = v * 2281;
                return d3.format('$, ')(v.toFixed(0)) //+ '%' + '(' + val.toFixed(0) + ')'
              }
            }

            // axes: {
            //     "RTA Ridership": 'y',
            //     "Revenue Service Hours": 'y2'
            // }
          },
        // data: {
        //     json: data_parsed,
        //     keys: {
        //         value: ['ridership']
        //     },
        //     // groups: [['public_transit', 'walk', 'bicycle', 'other', 'car']],
        //     colors: {
        //     'public_transit': base_color,
        //     'walk': base_color.darker(1),
        //     'bicycle':base_color.darker(2),
        //     'other':base_color.darker(3),
        //     'car':base_color.darker(4)
        //     },
        //     type: 'line'
        //   },
          axis: {
 
                 x: {
                    type: 'category',
                      categories: data_parsed.map(function(d){
                        
                        return d["Cost"];
                      }),
                     tick: {
                      rotate: 75,
                      multiline: false
                  },
                  // height: 100
              },
              y: {
                  label: {
                    text: 'Transportation Costs for Large Metro Areas',
                    position: 'outer-middle'
                  },
//                   max: 1.00,
//                  min: 0.10,
                  tick: {
                    format: d3.format("$, ")
//                      format: function(d) {return (d).toFixed(2);}
                  }
                  // max: 1

              },
              // y2: {
              //   show: true,
              //   max: 1400000,
              //   min: 0,
              //   label: {
              //       text: 'Revenue Service Hours',
              //       // position: 'outer-middle'
              //     },

              // }
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
//       chart.transform('line', 'Overall Average')
      // console.log(chart.data.colors());
      
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