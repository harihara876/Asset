import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import AppButton from 'vridhee_common_component_mf/AppButton';
import configJson from "vridhee_common_component_mf/configJson";
import DashboardService from '../Services/dashboardservices';
import IDashboard from '../Models/IDashboard';
import { toast } from 'react-toastify';

const assetUrl = configJson.local.curriculumAssetUrl;
let languageType: number
interface IVideoComment {
    videocomments: IDashboard[]
}
interface IVideoCommentReplyReply {
    videocommentreplyreplies: IDashboard[]
}

const Reply = (props:any) => {

    const [openvideoreplyReply, setOpenVideoReplyReply] = React.useState(false);

    const [vcommentreplyactiveBtn, setVCommentReplyActiveBtn] = useState("none");
    const [vcommentreplylikeCount, setVCommentReplyLikeCount] = useState(props.reply.like);
    const [vcommentreplydislikeCount, setVCommentReplyDislikeCount] = useState(props.reply.dlike);

    let commentData = props;
    // console.log(commentData, "commentData")

    const [videoreplyreplytext, setVideoReplyReplyText] = React.useState('');

    const replyReplyClick = () => {
        setOpenVideoReplyReply(true);
    }

    const handleVideoReplyReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setVideoReplyReplyText(target.value);
    }

    const [videocomment, setvideocomment] = useState<IVideoComment>({
        videocomments: [] as IDashboard[]
    })
    
    const [videocommentreplyreply, setvideocommentReplyReply] = useState<IVideoCommentReplyReply>({
        videocommentreplyreplies: [] as IDashboard[]
    })


    const replylikeClick = () => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentreplyactiveBtn === "none") {
            setVCommentReplyLikeCount(vcommentreplylikeCount + 1);
            setVCommentReplyActiveBtn("like");
        }
        if (vcommentreplyactiveBtn === 'like') {
            setVCommentReplyLikeCount(vcommentreplylikeCount - 1);
            setVCommentReplyActiveBtn("none");
        }
        if (vcommentreplyactiveBtn === "dislike") {
            setVCommentReplyLikeCount(vcommentreplylikeCount + 1);
            setVCommentReplyDislikeCount(vcommentreplydislikeCount - 1);
            setVCommentReplyActiveBtn("like");
        }

        const body = {
            "db_metadata": 1,
            "v_c_id":props.comment._id,
            "like": true,
        }
        DashboardService.updateActorVideoComment(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReplyReply(false)
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
            .catch(err => {
                // toast.error(err.msg);
            });
    }

    const replydislikeClick = () => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentreplyactiveBtn === "none") {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount + 1);
            setVCommentReplyActiveBtn("dislike");
        }
        if (vcommentreplyactiveBtn === 'dislike') {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount - 1);
            setVCommentReplyActiveBtn("none");
        }
        if (vcommentreplyactiveBtn === "like") {
            setVCommentReplyDislikeCount(vcommentreplydislikeCount + 1);
            setVCommentReplyLikeCount(vcommentreplylikeCount - 1);
            setVCommentReplyActiveBtn("dislike");
        }

        const body = {
            "db_metadata": 1,
            "v_c_id": props.comment._id,
            "dlike": true,
        }
        DashboardService.updateActorVideoComment(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReplyReply(false)
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
            .catch(err => {
                // toast.error(err.msg);
            });
    }




    const videoReplyReplySubmit = (data:any) => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        console.log(commentData, "videoreplydata")

        if (videoreplyreplytext) {
            const body = {
                "db_metadata": 1,
                "v_c_id": props.comment._id,
                "reply": [
                    {
                        "val": videoreplyreplytext,
                        "ref_c_user_id": props.comment.user_id
                    }
                ]
            }
            DashboardService.updateActorVideoComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setOpenVideoReplyReply(false)
                        const body = {
                            "db_metadata": 1,
                            "v_id": data.v_id,
                            "t_id": data.t_id
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
                .catch(err => {
                    // toast.error(err.msg);
                });
        }

    }

    const { videocomments } = videocomment;
    

    const videoReplyReplyCancel = () => {
        setOpenVideoReplyReply(false);
    }

  return (
    <div>

    {openvideoreplyReply ?

     <div className="reply-form mt-2">
        <TextField id="standard-basic"
         value={videoreplyreplytext}
            onChange={handleVideoReplyReplyChange}
            label="Add a reply1 here..." variant="standard" className="w-100" placeholder='Add a reply here...' />

        <div className="text-right mt-1">
            <AppButton children="Cancel"
             onClick={videoReplyReplyCancel}
              styleClass='btn cancel-outline mr-2' />
            <AppButton children="Reply" 
            onClick={videoReplyReplySubmit} 
            styleClass='btn save-btn  primary-bg text-white' />
        </div>
    </div> 


    :

     <ul>
        <li>
            <img src={`${assetUrl}/video%20like.svg`} alt="" className={`${vcommentreplyactiveBtn === "like" ? "like-active" : ""}`}
                onClick={replylikeClick}
                 /> {vcommentreplylikeCount}

        </li>
        <li>
            <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`${vcommentreplyactiveBtn === "dislike" ? "dislike-active" : ""}`}
                onClick={replydislikeClick} 
                />{vcommentreplydislikeCount}
        </li>
        <li style={{ 'cursor': 'pointer' }} >
            <span  onClick={replyReplyClick}>
                Reply</span>
        </li>

    </ul>



    }

</div>
  )
}

export default Reply