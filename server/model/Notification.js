import mongoose  from "mongoose";

const notificationSchema=new mongoose.Schema({
  title:{
    type:String,
    required:[true,'plz add a notification title'],
    trim:true
  },
  message:{
    type:String,
    required:[true,'plz add a notification message'],
    trim:true
  },
  type:{
    type:String,
    required:[true,'plz add a notification type'],
    enum:['info','warning','success','error'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps:true
}
)

const Notification=mongoose.model('Notification',notificationSchema)


export default Notification;