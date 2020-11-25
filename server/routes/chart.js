const express = require('express');
const router = express.Router();
const { Chart } = require("../models/Chart");



//=================================
//             chart
//=================================

router.post('/getMyCharts', (req,res) => {
        

        //mongoDB에서 favorite 숫자를 가져오기
        Chart.find({"chartId":req.body.chartId})
        .populate('writer')
        .exec((err, charts)=> {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, charts : charts})
        })
        // 그다음에 프론트에 다시 숫자 정보를 보내주기
        

    })


module.exports = router;
