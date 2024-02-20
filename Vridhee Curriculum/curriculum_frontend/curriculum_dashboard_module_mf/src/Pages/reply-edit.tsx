import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import AppButton from 'vridhee_common_component_mf/AppButton';
import configJson from "vridhee_common_component_mf/configJson";
import DashboardService from '../Services/dashboardservices';
import IDashboard from '../Models/IDashboard';
import { toast } from 'react-toastify';

interface IVideoComment {
    videocomments: IDashboard[]
}
const assetUrl = configJson.local.curriculumAssetUrl;
let languageType: number

const ReplyEdit = (props: any) => {
    console.log(props, "props")

    const [openvideoreplyEdit, setOpenvideoreplyEdit] = React.useState(false);
    const [videoreplyedittext, setVideoReplyEditText] = React.useState('');

    const [videocomment, setvideocomment] = useState<IVideoComment>({
        videocomments: [] as IDashboard[]
    })

    const videoReplyEditCancel = () => {
        setOpenvideoreplyEdit(false)
    };

    const videoReplyEditSubmit = () => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (props.reply.ref_c_user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 1,
                "v_c_id": props.comment._id,
                "reply_id": props.reply._id,
                "val": videoreplyedittext
            }
            DashboardService.updateVideoCommentReply(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Reply Updated Successfully')
                        const body = {
                            "db_metadata": 1,
                            "v_id": props.comment.v_id,
                            "t_id": props.comment.t_id
                        }
                        DashboardService.getActorVideoComment(body, languageType)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e =>
                                console.log(e, "e")
                            );
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e =>
                    console.log(e, "e")
                );

        }
    };
    const videocommentreplyedit = () => {
        setOpenvideoreplyEdit(true);
    };

    const videocommentreplydelete = () => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (props.reply.ref_c_user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 1,
                "v_c_id": props.comment._id,
                "reply_id": props.reply._id
            }
            DashboardService.removeVideoCommentReply(body)
                .then(res => {
                    if (res.data.status == 200) {
                        toast.success('Reply Deleted Successfully')
                        const body = {
                            "db_metadata": 1,
                            "v_id": props.comment.v_id,
                            "t_id": props.comment.t_id
                        }
                        DashboardService.getActorVideoComment(body, languageType)
                            .then(res => {
                                if (res.data.details) {
                                    var newData: any = res.data.details.map((data: any) => {
                                        data.c_ts = data.c_ts.split('T')[0];
                                        return data;
                                    });
                                    setvideocomment({
                                        ...videocomment, videocomments: newData
                                    })
                                }
                            })
                            .catch(e =>
                                console.log(e, "e")
                            );
                    } else {
                        toast.error(res.data.message)
                    }

                })
                .catch(e =>
                    console.log(e, "e")
                );

        }
    };

    const handleVideoReplyEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setVideoReplyEditText(target.value);
    }

    return (
        <div>

            {openvideoreplyEdit ?

                <div className="reply-form mt-2">
                    <TextField id="standard-basic"
                        value={videoreplyedittext}
                        onChange={handleVideoReplyEditChange}
                        label="Add a replyedit here..." variant="standard" className="w-100" placeholder='Add a reply here...' />

                    <div className="text-right mt-1">
                        <AppButton children="Cancel"
                            onClick={videoReplyEditCancel}
                            styleClass='btn cancel-outline mr-2' />
                        <AppButton children="Reply"
                            onClick={videoReplyEditSubmit}
                            styleClass='btn save-btn  primary-bg text-white' />
                    </div>
                </div>


                :
                <div>

                    {(`${props.reply.ref_c_user_id}` == localStorage.getItem('Tokenuserid')) ?
                        <span className="float-right">
                            <i className="fa fa-pencil"
                                onClick={videocommentreplyedit}
                                aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-trash"
                                    onClick={videocommentreplydelete}
                                    style={{ 'color': 'red', 'cursor': 'pointer' }} aria-hidden="true"></i>
                        </span>

                        : ''}
                </div>

            }


        </div>
    )
}

export default ReplyEdit