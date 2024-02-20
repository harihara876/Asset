import mongoose from 'mongoose';

export const pgCampusSchema = new mongoose.Schema({
    pg_id: { type: String, required: true },  //(form collection pg)
	campus_group_id: { type: String, default: "" },  //(if blank then that PG is for Vridhee)
	sub_group_id: { type: String, default: "" },
	merchant_id: { type: String, default: "" },
	merchant_name: { type: String, default: "" },
	auth_code: { type: String, default: "" },    //(atom_mcc_code, auth_header_code)
	curr_typ: { type: String, default: "" },	
	security_id: { type: String, default: "" },
	cam_pg_login: { type: String, default: "" },
	cam_pg_pass: { type: String, default: "" },
	cam_pg_pass_key: { type: String, default: "" },
	cam_pg_acc: { type: String, default: "" },
	cam_pg_product_id: { type: String, default: "" },
	cc_per: { type: String, default: "" },
	dc_per: { type: String, default: "" },
	online_per: { type: String, default: "" },
	pg_plat_chrg: { type: String, default: "" },
	v_plat_chrg: { type: String, default: "" },
	cam_pg_sts: { type: Number, default : 0 },
	cam_rec_email_id: { type: String, default: "" },
	pg_doc_col: [
        {
            pg_doc_reg_id: { type: String, default: "" }, 
            doc_col_url: { type: String, default: "" }, 
            col_sts: { type: Number, default: "" }
        }
    ],	     
	cam_bank_acc: [
        {
            bank_name: { type: String, default: "" },
            acc_name: { type: String, default: "" },
            acc_no: { type: String, default: "" },
            ifcs: { type: String, default: "" },
            swift: { type: String, default: "" },
            micr: { type: String, default: "" },
            bic: { type: String, default: "" },
            iban: { type: String, default: "" }
        }
    ]
}
)