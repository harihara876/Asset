import mongoose from 'mongoose';

export const lookupmasterSchema = new mongoose.Schema({
    name : { type: String, required: true },
    data : [ 
            {
                id : { type: String, required: true },
                seq : { type: Number, required: true },
                val : { type: String, required: true },
                desc : { type: String, default: "" },
                img_url : [
                    {
                        inact_img_url: { type: String, default: "" },
                        act_img_url: { type: String, default: "" }
                    }
                ]
            }
        ],
        cr_dts : { type: Date, required: true }
})

// export const lkpmasterSchema = mongoose.model("lookupmaster", lookupmasterSchema, "lookupmaster")