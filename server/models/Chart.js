const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chartSchema = mongoose.Schema({
   
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    data: {
        type:Array,
        default:[]
    },
 }, {timestamps: true})




const Chart = mongoose.model('Chart', chartSchema);

module.exports = { Chart }