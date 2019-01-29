async function insertionSort (items,time) {
    for (var i = 0; i < items.length; i++) {
      let value = items[i]
  
      //at this time , highlight the "value item " .... and then check if its at correct position or needs to be replaced ... 
      //we can recognize the cube ... by using the 50 * i => where i rep the respcitive block
      console.log("before1");
        await sleep(time);
      console.log("after1");
  
  var bb = locations[i].elem ;
  var bb1 = locations[i].text ;
  
  bb.attr({
    fill : "red",
    });
  
  // bb1.text(50*i+28, 30+28 , items[i]).attr({
  //   "font-weight": "bold" , 
  //   'font-size': '50px'
  
  // });
  
         await sleep(time);
  
  console.log(" coloring"+i);
  var flag =0 ;
     // store the current item value so it can be placed right
      for (var j = i - 1; j > -1 && items[j] > value; j--) {
  //now ,if at all it goes into this loop ... the i one will change its position and be shifted to the bottom .. temporarily .. 
  if(flag == 0)
  {
          flag = 1 ;
          await sleep(time);
  
    console.log(" animating"+j);
    var m = (i/2) ; 
  console.log(m);
      bb.animate({ 'width': 50, 'height': 50, 'fill': 'purple', 'x': 50*m, 'y': 100 }, 4000, "easeInOut" );
      bb1.animate({ 'width': 50, 'height': 50, 'fill': 'purple', 'x': 50*m + 28, 'y': 58 , 'title' : value }, 4000, "easeInOut" );
  
              await sleep(time);
  
  }
  //     console.log("break");
     await sleep(time);
  
  //     console.log("breakdone");
  
  // loop through the items in the sorted array (the items from the current to the beginning)
        // copy each item to the next one
        items[j + 1] = items[j] ;
  
        //when were replacing blah blah .. and changing values in thse arrays ... we must also change in location array na ketki 
  
        locations[j+1] = locations[j]; 
  
  var mm = locations[j].elem ;
  var mm1 = locations[j].text ;
  
  
  var m = Number(j+1); 
      mm.animate({ 'width': 50, 'height': 50, 'fill': 'blue', 'x': 50*m , 'y': 30 }, 4000, "easeInOut" );
      mm1.animate({ 'width': 50, 'height': 50, 'fill': 'blue', 'x': 50*m + 28, 'y': 58 , 'title' : items[j]}, 4000, "easeInOut" );
      }
      // the last item we've reached should now hold the value of the currently sorted item
      items[j + 1] = value 
     await sleep(time);
  
  if(flag == 1 )
  {
    var m = Number(j+1); 
    bb.animate({ 'width': 50, 'height': 50, 'fill': 'blue', 'x': 50*m , 'y': 30 }, 4000, "easeInOut" );
    bb1.animate({ 'width': 50, 'height': 50, 'fill': 'blue', 'x': 50*m + 28, 'y': 58 ,'title' : value}, 4000, "easeInOut" );
  }
  await sleep(time);
  bb.attr({
    fill : "white" }) ;
    console.log("do I get exec ?? "); 
    bb1.attr({
      "font-weight": "bold" , 
        'font-size': '35px'
    });
    await sleep(time);
  // paper.rect(50*m,100, 50, 50).attr({
  //   fill : "white" 
  // stroke:"white"}) ; 
  }
  
    //after the ith iteration is done .... decolor that repective node .. because duh ... you dont want it to be colored for some one elses iteration also 
  
  // });
    return items
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  var paper ; 
  var rect ; 
  var locations = []; 
  function sort(list){
    paper = Raphael("container", window.innerWidth , window.innerHeight);
    var location = paper.set();
  
    function Item(elem, text) {
        this.elem = elem;
        this.text = text;
    }

    var item ; 

    for(i=0;i<list.length;i++){    
    item = new Item(
                paper.rect(50*i,30, 50,50),
                //adding text separately ... coz theres no parent child relation in raphael ///
                paper.text(50*i+28, 30+28 , list[i]).attr({
      "font-weight": "bold" , 
      'font-size': '50px'
    })  );
    locations[i] = item;
    
  }
  
  location = paper.set();
  
  var time = 1000 ; 
  
  console.log(insertionSort(list,time)) // [ 17, 20, 26, 31, 44, 54, 55, 77, 93 ]
}
  
  
  
  //NOT USEFUL CODE ... 
  // BUT HAVENT DELETED .... COZ MAYBE WE MIGHT NEED IN FUTURE 
  
  // function rem()
  // {
  //   //  paper.rect(50*3,100, 50, 50).animate({ 'width': 50, 'height': 50, 'fill': 'purple', 'x': 50*2, 'y': 200 }, 4000, "easeInOut" );
  
  
  // paper.rect(50*2,30, 50, 50).attr({
  //   fill : "white",
    
  // });
  
  
  //   console.log("kdglgfikl");
  
  // //    paper.rect(50*2,30, 50, 50).attr({
  // //   fill : "green"
  // // });
  
  //   rect.removeData({ 'x': 50*2, 'y': 30 });
  
  
  
  // }
  