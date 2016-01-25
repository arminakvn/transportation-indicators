(function() {
  /*
    1.1 Average weekly ridership
  */
  var url = "https://arminavn.cartodb.com/api/v2/sql?q=SELECT * FROM table_1_1 ORDER BY year, month   &api_key=9150413ca8fb81229459d0a5c2947620e42d0940";
  // var explainable = window.explainable;
    d3.json(url, function(j) {
      base_color = d3.rgb(49, 130, 189);
      console.log(j);
       data_parsed = []
       _data = []
       x_data = []
       data_point = []
      // console.log(d3.keys(j.rows[0]))
      
       var time_map = d3.map()
      // parse
      j.rows.forEach(function(each) {
        // if ((indexOf.call(scity, each.town) >= 0)) {
        _data.push(
        {
          year: each.year,
          month: each.month,
          "Ridership": +each.all_modes,
          date: new Date(each.year, each.month, 01),
          mon: (new Date(each.year, each.month, 01)).getFullYear() + ", " + (Number((new Date(each.year, each.month, 01)).getMonth())+1).toString()
        }
        )
        time_map.set(new Date(each.year, each.month, 01), (new Date(each.year, each.month, 01)).getFullYear() + ", " + (new Date(each.year, each.month, 01)).getMonth())
      })
      var _nestedData = d3.nest()
          .key(function(d){return d.year})
          .entries(_data);
      console.log("data",_nestedData);
      
      _data.forEach(function(mnt_data){
        data_point.push(mnt_data["Ridership"]);
        x_data.push(mnt_data.mon);
        
      })
      data_point.unshift('Ridership');
      data_parsed.push(
          data_point
          );
      x_data.unshift('date');
      data_parsed.unshift(x_data);
      console.log("data_parsed", data_parsed);
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
        bindto: "#chart1_1",
        data: {
            x: 'date',
            columns: data_parsed,
             type: 'line'
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
//                          Thu Feb 01 2007 00:00:00 GMT-0500 (EST)
//                          var format = d3.time.format("%Y-%m-%d");
//                          console.log("the year in the frist graph")
//                          console.log("only d",d.getYear)
//                          month_format = time_map.get(d)
//                            console.log(month_format)
//                        console.log(d)
                        return d;
                      }),
                      tick: {
                          rotate: 75,
                          multiline: false
                      },
                      height: 200
                  // height: 100
              },
                  // height: 100
              y: {
                  label: {
                    text: 'Average monthly ridership',
                    // position: 'outer-middle'
                  },
                  tick: {
                    format:  d3.format(",") //function(d) {return d.toFixed(0);}
                    //or format: function (d) { return '$' + d; }
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