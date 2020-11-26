const express = require('express');
const router = express.Router();
const { Chart } = require("../models/Chart");



//=================================
//             chart
//=================================

router.post('/getMyCharts', (req,res) => {
        
        
     
        Chart.find({writer : {$in :req.body.writer}})
        .populate('writer')
        .exec((err, charts)=> {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, charts : charts})
        })
     
        

    })

    router.post('/uploadChart', (req,res) => {
        

        const chart = new Chart(req.body);

        chart.save((err,doc) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success:true})
        })
        

    })

   

    router.post('/getChartDetail', (req,res) => {
        
        
 
        Chart.findOne({"_id":req.body.chartId})
        .populate('writer')
        .exec((err, chartDetail)=> {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, chartDetail : chartDetail})
        })
       
        

    })
    

    router.post('/updateChart', (req,res) => {
        
        
        
        Chart.findOne({"_id":req.body.chartId})
        .populate('writer')
        .exec((err, chartDetail)=> {
            if(err) return res.status(400).send(err)
            chartDetail.data=chartDetail.data.concat(req.body.data)
            chartDetail.save();
            return res.json({success:true})
        })
   
        

    })

    router.post('/deleteChart', (req,res) => {
        
        
        
        Chart.findOneAndDelete({"_id":req.body.chartId})
        .populate('writer')
        .exec((err, chartDetail)=> {
            if(err) return res.status(400).send(err)
            return res.json({success:true})
        })
   
        

    })

   


module.exports = router;
