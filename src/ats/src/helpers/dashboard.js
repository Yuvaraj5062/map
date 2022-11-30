const generatePieChartData = (data) => {
  let pieData = [
    {
        name: 'Achieved',
        y: data[0].achived,
    },
    {
        name: 'Target',
        y: data[0].target
    },
    {
        name: 'Closure',
        y: data[0].closure
    },
  ]
  return pieData 
}

const generateAdminPie = (data) => {
  let pieData = [
    {
        name: 'Achieved',
        y: data[0].achived,
    },
    {
        name: 'Target',
        y: data[0].target
    },
    {
        name: 'Closure',
        y: data[0].closure
    },
  ]
  return pieData
}

const generateBarChartData = (data) => {
  let xaxis = []
  if(data.submission !== undefined){
    xaxis[0]={y:data.submission, colorValue:'#fbbfa3'}
    xaxis[1]={y:data.interview, colorValue:'#fbbfa3'}
    xaxis[2]={y:data.offer, colorValue:'#fbbfa3'}
    xaxis[3]={y:data.start, colorValue:'#fbbfa3'}
  }else{
    // xaxis[0]= data.submission !== undefined ? data.submission : 0
    // xaxis[1]= data.interview !== undefined ? data.interview : 0
    // xaxis[2]= data.offer !== undefined ? data.offer : 0
    // xaxis[3]= data.start !== undefined ? data.start : 0
  }
  return xaxis
}

const generateLineChartData = (data) => {
  let plots = []
  let temp = [{name: 'Target', data:[]}, {name:'Achieved', data:[]}, {name:'Closure', data:[]}]
  temp[0].name = "Target"
  temp[1].name = "Achieved"
  temp[2].name = "Closure"
  data.map((item) => {
      temp[0].data.push(item.target)
      temp[1].data.push(item.achived)
      temp[2].data.push(item.closure)
      plots.push(item.username)
  })
  return {
    plots,
    temp
  }
}

const generateActivityChartData = (data) => {
  let plots = []
  let temp = [{name: 'Submission', data:[]}, {name:'Interview', data:[]}, {name:'Offer', data:[]}]
  // temp[0].name = "Target"
  // temp[1].name = "Achieved"
  // temp[2].name = "Closure"
  data.map((item) => {
      temp[0].data.push(item.submission)
      temp[1].data.push(item.interview)
      temp[2].data.push(item.offer)
      plots.push(item.name)
  })
  return {
    plots,
    temp
  }
}

export {generatePieChartData, generateBarChartData, generateLineChartData, generateAdminPie, generateActivityChartData}