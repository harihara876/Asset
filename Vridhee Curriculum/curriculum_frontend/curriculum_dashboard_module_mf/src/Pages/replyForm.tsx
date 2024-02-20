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
interface IVideoCommentReply {
    videocommentreplies: IDashboard[]
}
export default function ReplyForm({ comment }: any) {

    let commentData = comment;
    console.log(commentData, "commentData")

    const [vcommentactiveBtn, setVCommentActiveBtn] = useState("none");
    const [vcommentlikeCount, setVCommentLikeCount] = useState(commentData.like);
    const [vcommentdislikeCount, setVCommentDislikeCount] = useState(commentData.dlike);


    const [videoreplytext, setVideoReplyText] = React.useState('');
    const [openvideoreply, setOpenVideoReply] = React.useState(false);

    const videoReplyCancel = () => {
        setOpenVideoReply(false);
    }

   
    const handleVideoReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setVideoReplyText(target.value);
    }

    const [videocomment, setvideocomment] = useState<IVideoComment>({
        videocomments: [] as IDashboard[]
    })
    
    const [videocommentreply, setvideocommentReply] = useState<IVideoCommentReply>({
        videocommentreplies: [] as IDashboard[]
    })

    const replyClick = () => {
        setOpenVideoReply(true);
    }

    const likeClick = () => {
        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentactiveBtn === "none") {
            setVCommentLikeCount(vcommentlikeCount + 1);
            setVCommentActiveBtn("like");
        }
        if (vcommentactiveBtn === 'like') {
            setVCommentLikeCount(vcommentlikeCount - 1);
            setVCommentActiveBtn("none");
        }
        if (vcommentactiveBtn === "dislike") {
            setVCommentLikeCount(vcommentlikeCount + 1);
            setVCommentDislikeCount(vcommentdislikeCount - 1);
            setVCommentActiveBtn("like");
        }

        const body = {
            "db_metadata": 1,
            "v_c_id": commentData._id,
            "like": true,
        }
        DashboardService.updateActorVideoComment(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReply(false)
                    const body = {
                        "db_metadata": 1,
                        "v_id": commentData.v_id,
                        "t_id": commentData.t_id
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

    const dislikeClick = () => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        if (vcommentactiveBtn === "none") {
            setVCommentDislikeCount(vcommentdislikeCount + 1);
            setVCommentActiveBtn("dislike");
        }
        if (vcommentactiveBtn === 'dislike') {
            setVCommentDislikeCount(vcommentdislikeCount - 1);
            setVCommentActiveBtn("none");
        }
        if (vcommentactiveBtn === "like") {
            setVCommentDislikeCount(vcommentdislikeCount + 1);
            setVCommentLikeCount(vcommentlikeCount - 1);
            setVCommentActiveBtn("dislike");
        }

        const body = {
            "db_metadata": 1,
            "v_c_id": commentData._id,
            "dlike": true,
        }
        DashboardService.updateActorVideoComment(body)
            .then(res => {
                if (res.data.status == 200) {
                    setOpenVideoReply(false)
                    const body = {
                        "db_metadata": 1,
                        "v_id": commentData.v_id,
                        "t_id": commentData.t_id
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




    const videoReplySubmit = () => {

        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }
        console.log(commentData, "videoreplydata")

        if (videoreplytext) {
            const body = {
                "db_metadata": 1,
                "v_c_id": commentData._id,
                "reply": [
                    {
                        "val": videoreplytext,
                        "ref_c_user_id": commentData.user_id
                    }
                ]
            }
            DashboardService.updateActorVideoComment(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setOpenVideoReply(false)
                        const body = {
                            "db_metadata": 1,
                            "v_id": commentData.v_id,
                            "t_id": commentData.t_id
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
                                    setvideocommentReply({
                                        ...videocommentreply, videocommentreplies: newData.reply
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
    const { videocommentreplies } = videocommentreply;


    const videocommentreplydelete = (rdata: IDashboard) => {


        let language = localStorage.getItem('language')
        if (language == 'English') {
            languageType = 1
        } else if (language == 'Hindi') {
            languageType = 6
        } else {
            languageType = 1
        }

        console.log(rdata, "videocommentreplydata")
        console.log(commentData, "videocommentdata")
        if (rdata.ref_c_user_id == localStorage.getItem('Tokenuserid')) {
            const body = {
                "db_metadata": 1,
                "v_c_id": commentData._id,
                "reply_id": rdata._id
            }
                DashboardService.removeVideoCommentReply(body)
                    .then(res => {
                        if (res.data.status == 200) {
                            toast.success('Reply Deleted Successfully') 
                            const body = {
                                "db_metadata": 1,
                                "v_id": commentData.v_id,
                                "t_id": commentData.t_id
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
                                        setvideocommentReply({
                                            ...videocommentreply, videocommentreplies: newData.reply
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

    return (
        <div>



            {openvideoreply ?

             <div className="reply-form mt-2">
                <TextField id="standard-basic" value={videoreplytext}
                    onChange={handleVideoReplyChange}
                    label="Add a reply here..." variant="standard" className="w-100" placeholder='Add a reply here...' />

                <div className="text-right mt-1">
                    <AppButton children="Cancel" onClick={videoReplyCancel} styleClass='btn cancel-outline mr-2' />
                    <AppButton children="Reply" onClick={videoReplySubmit} styleClass='btn save-btn  primary-bg text-white' />
                </div>
            </div> 
     

            :

             <ul>
                <li>
                    <img src={`${assetUrl}/video%20like.svg`} alt="" className={`${vcommentactiveBtn === "like" ? "like-active" : ""}`}
                        onClick={likeClick} /> {vcommentlikeCount}

                </li>
                <li>
                    <img src={`${assetUrl}/video%20dis%20like.svg`} alt="" className={`${vcommentactiveBtn === "dislike" ? "dislike-active" : ""}`}
                        onClick={dislikeClick} />{vcommentdislikeCount}
                </li>
                <li style={{ 'cursor': 'pointer' }} >
                    {/* <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp; */}
                    <span onClick={replyClick}>Reply</span>
                </li>

            </ul>



            }

        </div>




    )
}

