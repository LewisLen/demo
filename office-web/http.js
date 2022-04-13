const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.createConnection('mongodb://localhost:27017/movies',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

const filmSchema = new Schema(
  {
    episodes_info: {type: String},
    rate: {type: String},
    cover_x: {type: Number},
    title: {type: String},
    url: {type: String},
    playable: {type: Boolean},
    cover: {type: String},
    id: {type: String},
    cover_y: {type: Number},
    is_new: {type: Boolean}
  }
)
const filmsModel = db.model('movies',filmSchema);

db.on('connected',() => {
  console.log('链接mongodb成功！');
})

db.on('error',() => {
  console.log('链接mongodb失败！');
})

db.on('disconnected',() => {
  console.log('断开链接');
})
module.exports = filmsModel