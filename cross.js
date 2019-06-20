module.exports=(parents)=>{
    const fetch= require('node-fetch');
    let crossedPop=({//crossover functions
        uniform: (ParentOne,ParentTwo)=> {//creates a random mask to cross the 2 individuals
            var parents=[ParentOne,ParentTwo];
            var mask= ParentOne.map(item=> Math.round(Math.random()));
            return [mask.map((item,i)=> parents[item][i]),mask.map((item,i)=> parents[item==1?0:1][i])];
        },
        onePoint:(ParentOne,ParentTwo)=>{//splits the parents in one point and cross them
            return [ParentOne.map((item,i)=> i<=Math.round(ParentOne.length/2)-1?item:ParentTwo[i]),ParentTwo.map((item,i)=> i<=Math.round(ParentTwo.length/2)-1?item:ParentOne[i])];
        },
        ring:(ParentOne,ParentTwo)=>{// concats the 2 parenst into one and cuts in one random point
          let randomIndex= Math.round(Math.random()*(ParentOne.concat(ParentTwo).length-1));
          return [ParentOne.concat(ParentTwo,ParentOne).slice(randomIndex,randomIndex+ParentTwo.length),ParentOne.concat(ParentTwo,ParentOne,ParentTwo).slice(randomIndex+ParentTwo.length,randomIndex+(ParentTwo.length*2))]
      }
      }).uniform(parents[0].population,parents[1].population);
    crossedPop.forEach((pop,i)=>{
        parents[i].population=pop;
        // console.log('resending=>:'+parents[i]._id);
        fetch("http://"+parents[i].ip+":8080/function/"+parents[i].algorithm+"-fn",{
                                method:"POST",
                                body:JSON.stringify(parents[i])
                            });
        // module.exports.send(JSON.stringify(selectedPop[i]),selectedPop[i].algorithm);
    });  
    return {status:'ok'};
};