import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AppButton from 'vridhee_common_component_mf/AppButton';
import IDashboard from '../Models/IDashboard';
import AppInput from 'vridhee_common_component_mf/AppInput';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardService from '../Services/dashboardservices';
import { ToastContainer, toast } from 'react-toastify';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import configJson from "vridhee_common_component_mf/configJson";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Radio from '@mui/joy/Radio';
// import RadioGroup from '@mui/joy/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import ReactStars from "react-rating-stars-component";

let topicId: string | null
let subId: string
let userId: string
let quedata: any = [];
let ans_stsVal: number
let statevalue =0;
interface IQuestion {
    questions: IDashboard[]
}
interface ISQuestion {
    singlequestions: IDashboard
}

interface IPracticeTest {
    practiceTests: IDashboard[]
}
interface IClassTest {
    classTests: IDashboard[]
}
interface IClassTestAnswer {
    classTestAnswers: IDashboard[]
}
interface IQueDetail {
    quedetails: IDashboard[]
}

interface ITopic {
    topics: IDashboard
}
interface ICourse {
    courses: IDashboard[]
}
interface IAnswerStatus {
    answerstatuses: IDashboard[]
}
let subjectId: string | null
let NewWindowdata: any;
let chapterArray: string[] = []
let chapterId:string | null
const dashboard_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl
   

export default function TestQuiz() {
    // console.log(props, "props")

    // if (window.location.search) {
    //     var prmstr = window.location.search.split("?");
    //     topicId = prmstr[1];
    //     subId = prmstr[2];
    //     userId = prmstr[3];
    // }
    const [values, setValues] = useState([]);
    const location = useLocation();
    const [privateresult, setPrivateResult] = React.useState(false);
    const [instructions, setInstructions] = React.useState(false);
    const [showHint, setShowHint] = React.useState(false);
    const [totalmarks, setTotalmarks] = React.useState(0);
    const [showhide, setShowhide] = React.useState(false);
    const [showQuestion, setShowQuestion] = React.useState(true);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [showResult, setShowResult] = React.useState(true);
    const [showResult1, setShowResult1] = React.useState(true);
    const [checked, setChecked] = React.useState([true, false]);
    const [checkboxchecked, setCheckboxChecked] = React.useState(false);
    const [state, setState] = useState(0);
    const [noofques, setNoOfQues] = useState('');
    const [testbtn, setTestBtn] = useState(false);
    const [saveBtn, setSaveBtn] = useState("Save&Next");
    const [topicsData, setTopicsData] = useState([]);
    const [lastque, setLastQue] = useState(false);
    const [checked1, setChecked1] = useState([{
        id: ""
    }]);


    const [timer, setTimer] = useState(0);
    const [examtimer, setExamTimer] = useState(0);
    let intervalId :any

    const [question, setQuestion] = useState<IQuestion>({
        questions: [] as IDashboard[]
    })
    const [quedetail, setQueDetail] = useState<IQueDetail>({
        quedetails: [] as IDashboard[]
    })
    const [singlequestion, setSingleQuestion] = useState<ISQuestion>({
        singlequestions: {} as IDashboard
    })
    const [practiceTest, setPracticeTest] = useState<IPracticeTest>({
        practiceTests: [] as IDashboard[]
    })
    const [classTest, setClassTest] = useState<IClassTest>({
        classTests: [] as IDashboard[]
    })
    const [classTestAnswer, setClassTestAnswer] = useState<IClassTestAnswer>({
        classTestAnswers: [] as IDashboard[]
    })

    const [answerstatus, setAnswerStatus] = useState<IAnswerStatus>({
        answerstatuses: [] as IDashboard[]
    })
    const [topic, setTopic] = useState<ITopic>({
        topics: {} as IDashboard
    })
    const [courseDetail, setCourseDetail] = useState<ICourse>({
        courses: [] as IDashboard[]
    })

    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbacktext, setFeedbackText] = useState('');
    const [showfeedback, setShowFeedback] = useState(false);
    const [ptId, setPtId] = useState('');

    useEffect(() => {
        // Listen for messages from the parent window
        const receiveMessage = (event: MessageEvent) => {
            // Ensure the origin is correct
            if (event.origin === window.location.origin) {
                NewWindowdata = event.data;
                console.log('Data received in child window:', NewWindowdata);
                console.log('fggfhgf', localStorage.getItem('Tokenuserid'));
            };
            console.log(event.data, event.data);
            if (NewWindowdata.data) {
                localStorage.setItem('subId', NewWindowdata.data.subId);
                localStorage.setItem('topicId', NewWindowdata.data.topicId);
                localStorage.setItem('chapterId', NewWindowdata.data.chapterId);
                subjectId = NewWindowdata.data.subId
                topicId =NewWindowdata.data.topicId; 
                chapterId=NewWindowdata.data.chapterId; 
            } else {
                subjectId = localStorage.getItem('subId');
                topicId = localStorage.getItem('topicId')
                chapterId = localStorage.getItem('chapterId')
            }
            DashboardService.getCourseContent(subjectId)
                .then(res => {
                    if (res.data.data) {
                        console.log(res.data.data.course, "topicresult")
                        setTopic({
                            ...topic, topics: res.data.data.course
                        })
                        setCourseDetail({
                            ...courseDetail, courses: res.data.data.course
                        })
                        console.log(res.data.data.course, "fgff")
                        // setTotalHours(res.data.data[0]?.total_hour)
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(e =>
                    console.log(e, "e")
                );
            // Do something with the data in the child component


        }
        // Attach the event listener
        window.addEventListener('message', receiveMessage, false);
        console.log('After adding event listener');
        // Clean up the event listener on component unmount
        return () => {
            console.log('Before removing event listener');
            window.removeEventListener('message', receiveMessage);
            console.log('After removing event listener');
        };


    }, []);

    const { courses } = courseDetail;
    const { topics } = topic;

    function format(time:any) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
      
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + String(mins).padStart(2, '0') + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
      }


    // useEffect(() => {
    //     DashboardService.getQuestionChoiceLevel1('6558ae37f81c77eb01f1074e', 2, 3,'6576c3718bd542a9ad5795c7')
    //         .then(res => {
    //             if (res.data.data.length) {
    //                 setQuestion({
    //                     ...question, questions: res.data.data
    //                 })
    //                 setSingleQuestion({
    //                     ...singlequestion, singlequestions: res.data.data[state]
    //                 })
    //             } else{
    //                 // toast.error(res.data.message)
    //             }

    //         })
    //         .catch(e =>
    //             console.log(e, "e")
    //         );
    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [])

    // useEffect(() => {
    //     const body = {
    //         "subjects": [],
    //         "chapters": ["6554e0a64dc08d67f1964a71", "6554e5f34dc08d67f1964fc7"],
    //         "topics": ["6590778d08f9b4e59bcf1d51"],
    //         // "topics": ["6524ce03b2d8cdf9562ef5d9", "6554e1444dc08d67f1964b9e", "6554fcf44dc08d67f19657a0"],
    //         "question_type": 1
    //     }
    //     DashboardService.getQuestions(body)
    //         .then(res => {
               
    //             if (res.data.data.length) {

    //                 setQuestion({
    //                     ...question, questions: res.data.data
    //                 })
    //                 setSingleQuestion({
    //                     ...singlequestion, singlequestions: res.data.data[state]
    //                 })
                    
    //                 console.log(res.data.data.length,"res.data.data.length")

    //             } else {
    //             }

    //         })
    //         .catch(e =>
    //             console.log(e, "e")
    //         );
    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, [])
    // [state]

    useEffect(() => {

       
        getQuestions();

        const body = {
            "test_type": "class_test_ans",
            "db_metadata": 22,
            "c_test_id": "657609c27c7814f76a62ba30",
            "user_id": localStorage.getItem('Tokenuserid')
        }
        DashboardService.getClassTestAnswer(body)
            .then(res => {
                console.log(res.data.data, "ClassTestAnswer")
                if (res.data.details) {
                    setClassTestAnswer({
                        ...classTestAnswer, classTestAnswers: res.data.details
                    })
                } else {
                    // toast.error(res.data.message)
                }

            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const feedbackratingChanged = (newRating: any) => {
        setFeedbackRating(newRating)
        console.log(newRating,"newRating")
    };
    const feedbackTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setFeedbackText(target.value);
        console.log(target.value,"target.value")
    }

    const onClose = ()  => {
        window.opener = null;
        window.open('', '_self');
        window.close();
      }

      function closeWindow() {
        const url = `${dashboard_URL}test-quiz`;
        // Open the new window 
        // with the URL replacing the
        // current page using the
        // _self value
        let new_window :any=
            open(url, '_self');
 
        // Close this window
        new_window.close();
 
        return false;
    }


    const feedbackSubmit = () => {
        const body =
        {
            "test_type": "practice_test",
            "db_metadata": 22,
            "user_id": localStorage.getItem('Tokenuserid'),
            "sub_id": subjectId ? subjectId : localStorage.getItem('subId'),

            "t_id":  topicId ?  topicId : localStorage.getItem('topicId'),

            "chap_id":  chapterId?  chapterId : localStorage.getItem('chapterId'),

            "p_t_id": ptId,
            "std_rat": feedbackRating,
            "std_fd": feedbacktext,
        }
        DashboardService.addPracticeTest(body)
            .then(res => {
                if (res.data.status == 200) {
                    toast.success("Feedback Submitted Successfully")
                    window.opener.postMessage('Message from child window', window.location.origin+'/topic-page');
                   closeWindow();
                } else {
                    // toast.error(res.data.message)
                }
            })
            .catch(err => {
                toast.error(err.msg);
            });

          
    }

    useEffect(() => {
        DashboardService.getAnswerStatus()
            .then(res => {
                console.log(res.data.data[0].data, "answerstatus")
                if (res.data.data[0].data) {
                    setAnswerStatus({
                        ...answerstatus, answerstatuses: res.data.data[0].data
                    })
                } else {
                    // toast.error(res.data.message)
                }

            })
            .catch(e =>
                console.log(e, "e")
            );
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [])

    const { classTests } = classTest;
    const { practiceTests } = practiceTest;
    const { classTestAnswers } = classTestAnswer;
    const { answerstatuses } = answerstatus;



    const handleCheckboxChange = (e: any, x: any, i: number) => {
        console.log(e.target.checked,"checkboxdaat")
        console.log(i,"index")
        const updatedOptions = singlequestion.singlequestions.options.map((option: any, index: number) => ({
            ...option,
            isChecked: index === i && e.target.checked,
            // value:  e.target.value,
        }));
        console.log(updatedOptions,"updatedOptions")
        // setTimeout(() => {
            setSingleQuestion({
                ...singlequestion,
                singlequestions: {
                    ...singlequestion.singlequestions,
                    options: updatedOptions,
                    // answer:e.target.value
                    answer:x._id
                },
            }); 
       
            // setQuestion({
            //     ...question, questions: newDataVal
            // })

        // }, 1000);
       
        console.log(singlequestions,"ppp")

    };

    function next(savedata: any) {
        console.log(singlequestions,"pppt")

        let totalmarks = questions.reduce(function(prev:any, current:any) {
            return prev + +current.marks
          }, 0);
          console.log(totalmarks,"total marks")
          setTotalmarks(totalmarks)

        
        console.log(savedata,"savedata")

            clearInterval(intervalId);
             setTimer(0);
      



        console.log(state,"state")
        console.log(questions.length,"questions.length")
if(questions.length - 1  == state){
    setLastQue(true);
} else{
    setLastQue(false);  
}
        let findData = singlequestions.options.find((el: any) => el.isChecked == true);
        console.log("findData>>", findData)

        if (findData) {
            let newDataVal = questions.map((data: any, j: number) => {
                if (data._id === savedata._id) {
                    data.isAnswered = true;
                    data.options.map((optionData:any,i:number) => {
                       if(optionData._id == findData._id) {
                        // optionData.isChecked = true
                       optionData.isChecked = true
                       }
                    })
                    // data.time_taken = timer;
                }
                return data
            })

            setQuestion({
                ...question, questions: newDataVal
            })

            setSingleQuestion({
                ...singlequestion, singlequestions: newDataVal[state]
            })

            console.log("questions>>", questions)
            console.log("singlequestions>>", singlequestions)

            if(findData.ans == true) {
                ans_stsVal = 1
               }
               if(findData.ans == false){
                ans_stsVal = 2
               }

        } else {
            let newDataVal = questions.map((data: any, j: number) => {
                if(savedata){
                    if (data._id === savedata._id) {
                        data.isAnswered = false;
                        // data.time_taken = timer;
                    }
                }
                
                return data
            })

            setQuestion({
                ...question, questions: newDataVal
            })

            setSingleQuestion({
                ...singlequestion, singlequestions: newDataVal[state]
            })
            ans_stsVal =  3
        }

        console.log(singlequestions,"singlequestionssinglequestionssinglequestions")
        console.log(questions,"questions")


        const newObj = { ...savedata, time_taken: timer , answer:singlequestions.answer}; 
        console.log(newObj,"newsavedata")

        let obj: any = {

            "qb_id": newObj._id,
            "qb_typ": newObj.q_typ,
            "ans_sts": ans_stsVal,
            "marks": newObj.marks,
            "ans":[newObj.answer],
            // "ans":[newObj.answer],
            "time_taken":newObj.time_taken

            // "t_id": savedata.t_id,
            // "qb_id": savedata._id,
            // "qb_typ": savedata.q_typ,
            // "ans_sts": ans_stsVal,
            // "marks": savedata.marks
        }
        quedata.push(obj);

        console.log(quedata.length,"quedata.length")
        console.log(questions.length,"questions.length")

   
      if (state == questions.length - 1) {
        setSaveBtn('Submit')
        return; // should not go forward after the last question
    } else{
        // setState(stateval + 1);
        setState(state + 1);
        setSaveBtn('Save&Next') 
    } 
        
    if(saveBtn == 'Submit'){
        Submit();
      }
      


    // setSingleQuestion({
    //     ...singlequestion,
    //     singlequestions: questions[state],
    // });
    }


    const { quedetails } = quedetail;


    const Submit = () => {

        if (localStorage.getItem('testType') == 'class test') {
                const body =
                {
                    "test_type": "class_test",
                    "db_metadata": 22,
                    "mnt_user_id": localStorage.getItem('Tokenuserid'),
                    "sub_id": NewWindowdata.data.subId,
                    "name": NewWindowdata.data.subName,
                    "ques_sheet": quedata,
                    "ttl_marks": 30,
                    "ttl_std_marks": 20,
                }
                DashboardService.addClassTest(body)
                    .then(res => {
                        if (res.data.status == 200) {
                            console.log(res.data.data, "questionresult")
                            toast.success("Test Submitted Successfully")
                            setShowResult(!showResult)
                            if(res.data.data._id){
                                finistTest(res.data.data._id);
                            }
                            // setTimeout(() => {
                            //     setShowFeedback(true)
                            //   }, 200);

                        } else {
                            // toast.error(res.data.message)
                        }
                    })
                    .catch(err => {
                        toast.error(err.msg);
                    });

        } else if (localStorage.getItem('testType') == 'practice test'){
            const body =
            {
                "test_type": "practice_test",
                "db_metadata": 22,
                "user_id": localStorage.getItem('Tokenuserid'),
                "sub_id": subjectId ? subjectId : localStorage.getItem('subId'),
                "t_id":  topicId ?  topicId : localStorage.getItem('topicId'),
    
                "chap_id":  chapterId?  chapterId : localStorage.getItem('chapterId'),

                "ans_sheet": quedata,
                "ttl_marks": totalmarks,
                // "ttl_marks": 30,
                "ttl_std_marks": 20,
                "ttl_exp_dur": 30,
                "ttl_act_dur": 20,

                // "sts": 1,
                // "std_rat": 4.5,
                // "std_fd": "Test",
                // "is_chal": 0,
                // "chal_t_id": "",
                // "chal_rank": 0
            }
                DashboardService.addPracticeTest(body)
                    .then(res => {
                        if (res.data.status == 200) {
                            console.log(res.data.data, "questionresult")
                            toast.success("Test Submitted Successfully")
                            console.log(res.data.data._id,"practice test id")
                            setPtId(res.data.data._id)
                                setShowResult(!showResult)
                                if(res.data.data._id){
                                    finistTest(res.data.data._id);
                                }
                                const body3 = {
                                    "summaryObj": {
                                        "user_id": localStorage?.getItem("Tokenuserid"),
                                        "db_metadata": 27,
                                        "subjectId": localStorage?.getItem("subId"),
                                        "chapterId": localStorage?.getItem("chapterId"),
                                        "topicId": localStorage?.getItem("topicId"),
                                        "t_sts": 2 //2 for test completed
                                    },
                                    "currActObj": {
                                        "user_id": localStorage?.getItem("Tokenuserid"),
                                        "db_metadata": 28,
                                        "subjectId": localStorage?.getItem("subId"),
                                        "chapterId": localStorage?.getItem("chapterId"),
                                        "topicId": localStorage?.getItem("topicId")
                                    }
                                }; 
                                    DashboardService.updateTopicEContentTimer(body3)
                                    .then(res => {
                                        console.log("Test Completed");
                                        if (res.data.status == 400) {
                                            toast.error(res.data.message)
                                        }
                                        if (res.data.status == 200) {
                                            console.log("Test Completed >>");
                                        }
                                    }).catch(e =>
                                        toast.error(e.message)
                                    );
                              
                        } else {
                            // toast.error(res.data.message)
                        }
                    })
                    .catch(err => {
                        toast.error(err.msg);
                    });
            
        } else{
            const body =
            {
                "test_type": "practice_test",
                "db_metadata": 22,
                "user_id": localStorage.getItem('Tokenuserid'),
                "sub_id": subjectId ? subjectId : localStorage.getItem('subId'),
                "t_id":  topicId ?  topicId : localStorage.getItem('topicId'),
    
                "chap_id":  chapterId?  chapterId : localStorage.getItem('chapterId'),

                "ans_sheet": quedata,
                "ttl_marks": totalmarks,
                // "ttl_marks": 30,
                "ttl_std_marks": 20,
                "ttl_exp_dur": 30,
                "ttl_act_dur": 20,

                // "sts": 1,
                // "std_rat": 4.5,
                // "std_fd": "Test",
                // "is_chal": 0,
                // "chal_t_id": "",
                // "chal_rank": 0
            }
            DashboardService.addPracticeTest(body)
                .then(res => {
                    if (res.data.status == 200) {
                        console.log(res.data.data, "questionresult")
                        toast.success("Test Submitted Successfully")
                        console.log(res.data.data._id,"practice test id")
                        setPtId(res.data.data._id)
                            setShowResult(!showResult)
                            if(res.data.data._id){
                                finistTest(res.data.data._id);
                            }

                            const body3 = {
                                "summaryObj": {
                                    "user_id": localStorage?.getItem("Tokenuserid"),
                                    "db_metadata": 27,
                                    "subjectId": localStorage?.getItem("subId"),
                                    "chapterId": localStorage?.getItem("chapterId"),
                                    "topicId": localStorage?.getItem("topicId"),
                                    "t_sts": 2 //2 for test completed
                                },
                                "currActObj": {
                                    "user_id": localStorage?.getItem("Tokenuserid"),
                                    "db_metadata": 28,
                                    "subjectId": localStorage?.getItem("subId"),
                                    "chapterId": localStorage?.getItem("chapterId"),
                                    "topicId": localStorage?.getItem("topicId")
                                }
                            }; 
                                DashboardService.updateTopicEContentTimer(body3)
                                .then(res => {
                                    console.log("Test Completed");
                                    if (res.data.status == 400) {
                                        toast.error(res.data.message)
                                    }
                                    if (res.data.status == 200) {
                                        console.log("Test Completed >>");
                                    }
                                }).catch(e =>
                                    toast.error(e.message)
                                );
                          
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    toast.error(err.msg);
                });
        }

    };

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        console.log(event)
        console.log(id)
        setChecked([event.target.checked, event.target.checked]);
    };

    const markForReview = (savedata: any) => {

        clearInterval(intervalId);
        setTimer(0);

        // setMarkreview(true)
        setState(state + 1)
        if (state == questions.length - 1) {
            setState(0)
        }
        setSingleQuestion({
            ...singlequestion,
            singlequestions: questions[state],
        });

        let findData = singlequestions.options.find((el: any) => el.isMarked == true);
        if (!findData) {
            let newDataVal = questions.map((data: any, j: number) => {
                if (data._id === savedata._id) {
                    data.isMarked = true;
                }
                return data
            })

            setQuestion({
                ...question, questions: newDataVal
            })

            setSingleQuestion({
                ...singlequestion, singlequestions: newDataVal[state]
            })
        }

        if (state == questions.length - 1) {
            setSaveBtn('Submit')
        }else{
            setSaveBtn('Save&Next') 
        }
        // next(savedata)
    }


    

    const startPracticeTest = () => {

        const body = {
            "subjects": [],
            "chapters": [],
            // "chapters": ["6554e0a64dc08d67f1964a71", "6554e5f34dc08d67f1964fc7"],
            "topics": ["6590778d08f9b4e59bcf1d51"],
            // "topics": [topicId],
            // "topics": ["6524ce03b2d8cdf9562ef5d9", "6554e1444dc08d67f1964b9e", "6554fcf44dc08d67f19657a0"],
            "question_type": 1,
            "limit":noofques
        }
        DashboardService.getQuestions(body)
            .then(res => {
               
                if (res.data.data.length) {

                    setSaveBtn('Save&Next')
                    setInstructions(true)
                    setShowQuestion(false)

                    setQuestion({
                        ...question, questions: res.data.data
                    })
                    setSingleQuestion({
                        ...singlequestion, singlequestions: res.data.data[state]
                    })
                    if(singlequestions){
                        console.log("timer start")
                        // const handleStartTimer = () => {
                            intervalId = setInterval(() => {
                                console.log("timer inside")
                                setTimer((prevTimer) => prevTimer + 1);
                                // setExamTimer((prevTimer) => prevTimer + 1);
                            }, 1000);
                            intervalId = setInterval(() => {
                                console.log("timer inside")
                                setExamTimer((prevTimer) => prevTimer + 1);
                            }, 1000);
                        // };
                        console.log(timer,"timer")
                    }
                    setState(state + 1)

                 
                } else {
                }

            })
            .catch(e =>
                console.log(e, "e")
            );


    }

    const { singlequestions } = singlequestion;
    const { questions } = question;

    const takeTest = () => {
        setTimer(0);
        if (questions && questions.length > 0) {
            setInstructions(false)
            setShowhide(true)
            setShowQuestion(false)
        }
    }
    const getQuestions = () => {
        const body = {
            "subjects": [],
            "chapters": [],
            // "chapters": ["6554e0a64dc08d67f1964a71", "6554e5f34dc08d67f1964fc7"],
            "topics": ["6590778d08f9b4e59bcf1d51"],
            // "topics": [topicId],
            // "topics": ["6524ce03b2d8cdf9562ef5d9", "6554e1444dc08d67f1964b9e", "6554fcf44dc08d67f19657a0"],
            "question_type": 1
        }
        DashboardService.getQuestions(body)
            .then(res => {
               
                if (res.data.data.length) {

                    setQuestion({
                        ...question, questions: res.data.data
                    })
                    setSingleQuestion({
                        ...singlequestion, singlequestions: res.data.data[state]
                    })
                  
                } else {
                }

            })
            .catch(e =>
                console.log(e, "e")
            );
    }

    const TestSubmission = () => {
Submit();
    }

    const finistTest = (pId:string) => {

        setShowResult(!showResult)

        if (localStorage.getItem('testType') == 'class test') {

            const body = {
                "test_type": "class_test",
                "db_metadata": 22,
                "sub_id": NewWindowdata.data.subId
            }
            DashboardService.getClassTest(body)
                .then(res => {
                    console.log(res.data.data, "classtest")
                    if (res.data.details) {
                        setClassTest({
                            ...classTest, classTests: res.data.details
                        })
                    } else {
                        // toast.error(res.data.message)
                    }
                })
                .catch(e =>
                    console.log(e, "e")
                );

        } else  if (localStorage.getItem('testType') == 'pracice test') {
            // const body = {
            //     "test_type": "practice_test",
            //     "db_metadata": 22,
            //     "user_id": localStorage.getItem('Tokenuserid'),
            //     "sub_id": localStorage.getItem('subId'),
            //     "t_id": localStorage.getItem('topicId')
            // }
            // DashboardService.getPracticeTest(body)
            //     .then(res => {
            //         if (res.data.details) {
            //             setPracticeTest({
            //                 ...practiceTest, practiceTests: res.data.details[0].ans_sheet
            //             })
            //             console.log(res.data.details[0].ans_sheet,"res.data.details[0].ans_sheet")
            //             setShowFeedback(true)
            //         } else {
                       
            //         }

            //     })
            //     .catch(e =>
            //         console.log(e, "e")
            //     );
            const body = {
                "test_type": "practice_test",
                "db_metadata": 22,
                "user_id": localStorage.getItem('Tokenuserid'),
                "sub_id": localStorage.getItem('subId'),
                "t_id": localStorage.getItem('topicId'),
                "p_t_id": pId
            }
            DashboardService.getPracticeTestDetails(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setPracticeTest({
                            ...practiceTest, practiceTests: res.data.data.ans_sheet
                        })
                        setShowFeedback(true)
                    } else {
                       
                    }

                })
                .catch(e =>
                    console.log(e, "e")
                );
        } else {
            // const body = {
            //     "test_type": "practice_test",
            //     "db_metadata": 22,
            //     "user_id": localStorage.getItem('Tokenuserid'),
            //     "sub_id": localStorage.getItem('subId'),
            //     "t_id": localStorage.getItem('topicId')
            // }
            // DashboardService.getPracticeTest(body)
            //     .then(res => {
            //         if (res.data.details) {
            //             setPracticeTest({
            //                 ...practiceTest, practiceTests: res.data.details[0].ans_sheet
            //             })
            //             console.log(res.data.details[0].ans_sheet,"res.data.details[0].ans_sheet")
            //             setShowFeedback(true)
            //         } else {
            //             // toast.error(res.data.message)
            //         }

            //     })
            //     .catch(e =>
            //         console.log(e, "e")
            //     );
            const body = {
                "test_type": "practice_test",
                "db_metadata": 22,
                "user_id": localStorage.getItem('Tokenuserid'),
                "sub_id": localStorage.getItem('subId'),
                "t_id": localStorage.getItem('topicId'),
                "p_t_id":pId
            }
            DashboardService.getPracticeTestDetails(body)
                .then(res => {
                    if (res.data.status == 200) {
                        setPracticeTest({
                            ...practiceTest, practiceTests: res.data.data.ans_sheet
                        })
                        setShowFeedback(true)
                    } else {
                       
                    }

                })
                .catch(e =>
                    console.log(e, "e")
                );
        }
    }

    const toggleValue = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        console.log(event)
        console.log(id)
        setChecked([event.target.checked, event.target.checked]);
        if (event.target.checked) {
            if (id) {
                chapterArray.push(id)
            }
        } else {
            const index = chapterArray.indexOf(id);
            if (index > -1) {
                chapterArray.splice(index, 1);
            }
        }
        if (chapterArray.length) {
            // getQuestions(state)
        }

    };


    const handleCheckAllChange = (e: any) => {
        setChecked1(
            e.target.checked ? courses.map((c: any) => c.chapter.name) : []
        );
        console.log(checked1, "checked1")
    };

    const handleChapterChange = (e: any, c: any) => {
        setChecked1((prevChecked) =>
            e.target.checked
                ? [...prevChecked, c.chapter.name]
                : prevChecked.filter((item) => item !== c.chapter.name)
            // ? [...prevChecked, c._id]
            // : prevChecked.filter((item) => item !== c._id)

        );
        console.log(checked1.length, "checked1")
        console.log(courses.length, "gfgf")
        console.log(e)
        console.log(c._id)
        // setChecked([e.target.checked, e.target.checked]);
        if (e.target.checked) {
            if (c._id) {
                chapterArray.push(c._id)
            }
        } else {
            const index = chapterArray.indexOf(c._id);
            if (index > -1) {
                chapterArray.splice(index, 1);
            }
        }
        if (chapterArray.length) {
            // getQuestions(state)
        }
    };


    const quesonChange = (e:any) => {

        console.log(questions.length,"fd")
        const re = /^[0-9\b]+$/;
    
        // if value is not blank, then test the regex
    
        if (e.target.value != '' && re.test(e.target.value)) {
            if(e.target.value <= questions.length){
                setNoOfQues(e.target.value)
                setTestBtn(true)
            } else{
                setNoOfQues(e.target.value)
                setTestBtn(false)
                toast.error(`Selected no of Questions should be less than or equal to ${questions.length}`)
            }
          
        }else{
            setNoOfQues('') 
            setTestBtn(false)
        }
    }

    return (
        <div>

            <div className="test-section">
                {showQuestion ? <div>
                    <div className="select-topic-section mb-3">

                        <div className="mb-3" style={{ 'color': '#1C1821' }}>
                            <h4>{localStorage.getItem('DisplayName')}</h4>
                        </div>

                        <div className="select-question-size">

                            <div className="search-topic">


                                <h4 className="primary-color mb-2 ">
                                    Practice Test: - ( {NewWindowdata?.data.subName ? NewWindowdata?.data.subName : localStorage.getItem('subName')} /  {NewWindowdata?.data.topicName ? NewWindowdata?.data.topicName : localStorage.getItem('topicName')} )
                                    {/* Certification In Introduction to Semi Conductors */}
                                </h4>
                                {/* <span className="float-left">
                                <div className="search-box">
                                    <div className="form-group">
                                        <AppInput type="text" label="Search here..." selectStyle="w-100" name="Search here..." radius="5px"
                                            placeholder="Search here..." />
                                    </div>
                                    <div className="search-icon1">
                                        <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/search1.svg" alt="" />
                                    </div>
                                </div>
                            </span>
                            <span className="float-right">
                                <p>More Tests:</p>
                                <AppButton children="Semiconductor Basics" styleClass='btn more-subject-test border-r mr-2' />
                                <AppButton children="Semiconductor Materials" styleClass='btn more-subject-test border-r' />
                            </span> */}
                                <div className="clearfix"></div>
                            </div>
                            {/* <div className="filter-by border-bottom pb-1 mb-1">
                                <div className="form-check network-connect">
                                    <div className="mb-2 ">

                                        <h4>Please Choose Chapter(s)</h4>
                                    </div>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="selectAll"
                                        checked={checked1.length === courses.length}
                                        onChange={handleCheckAllChange}
                                    /> &nbsp;All Chapter

                                </div>
                            </div>
                            <div className="check-test-topics mb-3">
                                <ul>

                                    {
                                        courses?.map((data, i) =>
                                            <li>
                                                <input type="checkbox"

                                                    checked={checked1.includes(data.chapter.name!)}
                                                    onChange={(e) => handleChapterChange(e, data)}
                                                /> &nbsp;{data.chapter.name}
                                            </li>
                                        )}



                                </ul>


                                <div className="clearfix"></div>
                            </div> */}

                            <span className="mr-3">Select Number of Questions you want</span>
                            <span className="mr-3">
                                <input type="number" placeholder="Ex:10" value={noofques} onChange={quesonChange}/></span>
                            <span>
                                {localStorage.getItem('testType') == 'class test' ?
                                    <AppButton children="Start new Class test" onClick={startPracticeTest} styleClass='btn secondry-bg text-white pl-2 pr-2 border-r' />
                                    : <AppButton children="Start new Practice test" disabled={!testbtn} onClick={startPracticeTest} styleClass='btn secondry-bg text-white pl-2 pr-2 border-r' />}
                            </span>
                            {/* <AppButton children="Start New Practice Test" onClick={startPracticeTest} styleClass='btn save-btn primary-bg text-white border-r' /> */}
                        </div>
                    </div>
                </div> : null}
                {instructions ? <div className="tests-tabs">
                    <div className="tests-tabs-title">
                        <h4>Semi Conductor Materials</h4>
                        <h5>Instructions</h5>
                        <p>Please read carefully "How to attempt the Online Assessment</p>
                    </div>
                    <p>
                        Semiconductors form the backbone of modern technology, powering devices that have become integral to our daily lives. This unit explores the fascinating world of semiconductors, covering fundamental concepts like the Band Theory of Solids and the Basics of Semiconductors. Delve into the intricate workings of semiconductor devices, including the PN junction, rectifiers, and optoelectronic devices. Gain insights into the operation of transistors, from their working principles to characteristics, and understand their significance as functional devices. The journey extends to advanced semiconductor technologies, integrated circuits, and applications in digital electronics and communication systems. Explore the remarkable capabilities of semiconductors, from powering microprocessors to shaping the future of signal processing.
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
                    </p>
                    <ul>
                        <li><div className="test-color-code" style={{ 'background': '#5DAF1F' }}></div>You have Answered the question</li>
                        <li><div className="test-color-code" style={{ 'background': '#7E5EA9' }}></div>You have Marked the question</li>
                        <li><div className="test-color-code" style={{ 'background': '#B23510' }}></div>You have Not Answered the question</li>
                        <li><div className="test-color-code"></div>You have Not Visited the question</li>
                    </ul>
                    <div className="text-center">

                        <AppButton children="Start Exam"
                            onClick={takeTest}
                            //  onClick={() => setShowhide(!showhide)} 
                            styleClass='btn save-btn primary-bg text-white border-r' />
                        <div className="test-tab-time">
                            <span style={{ 'color': '#004392' }}>Time Left</span>&nbsp;:&nbsp;<span style={{ 'color': '#08891C' }}>-30:00M</span>
                        </div>
                    </div>
                </div> : ''}

                {showhide ? <div>
                    <div className="quiztest-header">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <h4>{NewWindowdata?.data.subName}
                                    {/* {NewWindowdata?.data.topicName} */}
                                    {/* Introduction to Semi Conductors */}
                                    </h4>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="time-bar">
                                    <div className="time-box">Time:  {format(examtimer)}/ 30:00</div>
                                   
                                    <div className="progrees-header"></div>
                                    <div className="total-time">Total: {questions.length}</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                {/* <AppButton
                                    children="FINISH TEST" */}
                                    {/* // onClick={TestSubmission}
                                    //  onClick={() => setShowResult(!showResult)}
                                    // styleClass='btn save-btn border-rs primary-color bg-white w-100' /> */}
                            </Grid>
                        </Grid>
                    </div>

                    {/* <div className="quiztest-content">
                        <div className="content-progressbar">
                            <div className="w-80 question-left">
                                <div className="question-bar mt-1 mb-1"></div>
                                <div className="question-left font-w600">
                                    19 Questions Left
                                </div>
                                <div className="question-box-card mt-3">
                                    <div className="question-box-card-con">
                                        <h5 className="mb-1 primary-color">

                                            Question 1
                                        </h5>

                                        <div className="question-checbox">
                                            <ul>
                                                <li>
                                                    <FormControlLabel control={<Checkbox />} label="Label1" />
                                                </li>
                                                <li>
                                                    <FormControlLabel control={<Checkbox />} label="Label2" />
                                                </li>
                                                <li>
                                                    <FormControlLabel control={<Checkbox />} label="Label3" />
                                                </li>
                                                <li>
                                                    <FormControlLabel control={<Checkbox />} label="Label4" />
                                                </li>
                                            </ul>

                                            <div className="clearfix"></div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="question-box-card-footer">
                                            <AppButton
                                                children="Provide Hint"
                                                styleClass='btn outlined-btn mr-3' />
                                            <AppButton
                                                children="Mark for Review"
                                                styleClass='btn outlined-btn mr-3' />
                                            <AppButton
                                                children="Save & Next"
                                                // onClick={next}


                                                styleClass='btn save-btn border-rs text-white primary-color' />
                                        </div>
                                    </div>

                                    <div className="extra-content">
                                        <p><b className="primary-color">Hint:-</b></p>
                                        <p>Ut tristique tempor mollis. Curabitur sed purus ante. Vivamus sit amet dui id nunc semper molestie eu id nibh. Maecenas sodales in enim ut sodales. Cras pharetra tellus sem, vitae rhoncus metus rutrum eu. Nullam eleifend lobortis purus eget tincidunt. Nam vitae leo fringilla, facilisis neque id, ornare arcu. Suspendisse at turpis finibus, interdum justo in, lacinia sapien. Nam ut massa et libero convallis sagittis. Cras id mi mauris. Nulla ultrices dolor et nisl dictum ultricies.</p>
                                        <div className="text-right">
                                            <AppButton
                                                children="Close Hint"
                                                styleClass='btn outlined-btn ' />
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="w-20 white-bg">
                                <div className="question-count mt-2">
                                    <div className="w-50">
                                        <div className="answerd-qu"></div>
                                        Answered 11
                                    </div>
                                    <div className="w-50">
                                        <div className="unanswerd-qu"></div>UnAnswered 11</div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="totalquestions-count mt-2">
                                    <div className="answerd-question-box">1</div>
                                    <div className="answerd-question-box">2</div>
                                    <div className="answerd-question-box">3</div>
                                    <div className="answerd-question-box">4</div>
                                    <div className="answerd-question-box">5</div>
                                    <div className="unanswerd-question-box">6</div>
                                    <div className="answerd-question-box">7</div>
                                    <div className="answerd-question-box">8</div>
                                    <div className="answerd-question-box">9</div>
                                    <div className="unanswerd-question-box">10</div>
                                    <div className="unanswerd-question-box">11</div>
                                    <div className="answerd-question-box">12</div>
                                    <div className="answerd-question-box">13</div>
                                    <div className="answerd-question-box">14</div>
                                    <div className="answerd-question-box">12</div>
                                    <div className="answerd-not-touch">13</div>
                                    <div className="answerd-question-box">14</div>
                                    <div className="answerd-not-touch">15</div>
                                    <div className="answerd-question-box">16</div>
                                    <div className="answerd-question-box">17</div>
                                    <div className="answerd-question-box">18</div>
                                    <div className="answerd-not-touch">19</div>
                                    <div className="answerd-question-box">20</div>



                                </div>


                            </div>
                            <div className="clearfix"></div>
                        </div>



                    </div> */}


                    {showResult ? <div className="quiztest-content">
                        <div className="content-progressbar">
                            <div className="w-80 question-left">
                                <div className="question-bar mt-1 mb-1"></div>
                                <div className="question-left font-w600">
                                {/* {timer} */}
                                {lastque ?  
                                 <p> 0 Questions Left </p> :  
                                 <p>{questions.length - state } Questions Left </p> }  
                                    
                               {/* {state == 1 ? <p>     {questions.length - state} Questions Left</p> : <p>     {questions.length - state + 1} Questions Left</p>}      */}
                               
                                </div>
                                <div className="question-box-card mt-3">
                                    <div className="question-box-card-con">
                               
                              {lastque ?      <h5 className="mb-1 primary-color">
                                            Question {questions.length}
                                        </h5> :      <h5 className="mb-1 primary-color">
                                            Question {state}
                                        </h5>}         
                                       
                                        <p>
                                            {/* {questions[state]?.question} */}
                                            {singlequestions?.question}

                                        </p>
                                        <div className="question-checbox">
                                            {singlequestions.options?.map((option: any, index: any) => (
                                                <div key={index} className="form-check">
                                                    <input
                                                        type="radio"
                                                        name={`option-${index}`}
                                                        value={option?.val}
                                                        checked={option?.isChecked || false}
                                                        onChange={(e) => handleCheckboxChange(e, option, index)}
                                                        className="form-check-input"
                                                    />&nbsp;
                                                    <label className="form-check-label">{option.val}</label>
                                                </div>
                                            ))}

                                            <div className="clearfix"></div>
                                            <div className="clearfix"></div>
                                        </div>



                                        <div className="question-box-card-footer">
                                            <AppButton
                                                children="Provide Hint"
                                                styleClass='btn outlined-btn mr-3' onClick={() => setShowHint(!showHint)} />
                                            <AppButton
                                                children="Mark for Review & Next" onClick={() => markForReview(questions[state - 1])}
                                                styleClass='btn outlined-btn mr-3' />
                                   {/* {(questions.length - 1 == state) ? 
                                   <AppButton
                                                children="Submit"
                                                onClick={() => Submit}
                                                styleClass='btn save-btn border-rs text-white primary-color' /> : */}
                                                <AppButton
                                                children={saveBtn}
                                                onClick={() => next(questions[state - 1])}
                                                styleClass='btn save-btn border-rs text-white primary-color' />
                                                {/* }          */}


                                        </div>
                                    </div>

                                    {showHint ? <div className="extra-content">
                                        <p><b className="primary-color">Hint:-</b></p>
                                        <p>
                                            {questions[state]?.hint}
                                            {/* Ut tristique tempor mollis. Curabitur sed purus ante. Vivamus sit amet dui id nunc semper molestie eu id nibh. Maecenas sodales in enim ut sodales. Cras pharetra tellus sem, vitae rhoncus metus rutrum eu. Nullam eleifend lobortis purus eget tincidunt. Nam vitae leo fringilla, facilisis neque id, ornare arcu. Suspendisse at turpis finibus, interdum justo in, lacinia sapien. Nam ut massa et libero convallis sagittis. Cras id mi mauris. Nulla ultrices dolor et nisl dictum ultricies. */}
                                        </p>
                                        <div className="text-right">
                                            <AppButton
                                                children="Close Hint"
                                                styleClass='btn outlined-btn ' onClick={() => setShowHint(!showHint)} />
                                        </div>
                                    </div> : null}


                                </div>

                              

                            </div>

                            <div className="w-20 white-bg">
                                <div className="question-count mt-2">
                                    <div className="w-50">
                                        <div className="answerd-qu"></div>
                                        Answered
                                    </div>
                                    <div className="w-50">
                                        <div className="notvisited-qu"></div>Not Visited</div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="question-count mt-2">
                                    <div className="w-50">
                                        <div className="notanswerd-qu"></div>
                                        Not Answered
                                    </div>
                                    <div className="w-50">
                                        <div className="marked-qu"></div>Marked For Review</div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="totalquestions-count mt-2">
                                    {questions && questions?.map((data: any, i: number) =>
                                        // style={{'backgroundColor': status === 'approved' ? 'blue' : status === 'pending' ? 'black' : 'red'}}>
                                        <div className={data?.isAnswered == true ? "answerd-question-box" : (data?.isAnswered == false ? "unanswerd-question-box" : (data?.isMarked == true ? "marked-question-box" : "answerd-not-touch"))}
                                            onClick={() => {
                                                console.log(data,"hhhh")
                                                let val = i;
                                                setState(val + 1);
                                              
                                                    setSingleQuestion({
                                                        ...singlequestion,
                                                        singlequestions: questions[i],
                                                    });  
                                             
                                                // setLastQue(false)
                                                console.log(questions[i],"questions[i]")
                                                // next(questions[i - 1])
                                                 
      if (i == questions.length - 1) {
        setSaveBtn('Submit')
        setLastQue(true);
    }else{
        setSaveBtn('Save&Next') 
        setLastQue(false); 
    }
                                                clearInterval(intervalId);
                                                setTimer(0);
                                            }}
                                        // onClick={() => next(questions[i])}
                                        >{i + 1}</div>

                                        //  <div className={data.isChecked == true ? "answerd-question-box": "answerd-not-touch"}>{i+1}</div>  

                                        //    <div className="answerd-question-box">1</div>
                                        //     <div className="answerd-question-box">2</div>
                                        //     <div className="answerd-question-box">3</div>
                                        //     <div className="answerd-question-box">4</div>
                                        //     <div className="answerd-question-box">5</div>
                                        //     <div className="unanswerd-question-box">6</div>
                                        //     <div className="answerd-question-box">7</div>
                                        //     <div className="answerd-question-box">8</div>
                                        //     <div className="answerd-question-box">9</div>
                                        //     <div className="unanswerd-question-box">10</div>
                                        //     <div className="unanswerd-question-box">11</div>
                                        //     <div className="answerd-question-box">12</div>
                                        //     <div className="answerd-question-box">13</div>
                                        //     <div className="answerd-question-box">14</div>
                                        //     <div className="answerd-question-box">12</div>
                                        //     <div className="answerd-not-touch">13</div>
                                        //     <div className="answerd-question-box">14</div>
                                        //     <div className="answerd-not-touch">15</div>
                                        //     <div className="answerd-question-box">16</div>
                                        //     <div className="answerd-question-box">17</div>
                                        //     <div className="answerd-question-box">18</div>
                                        //     <div className="answerd-not-touch">19</div>
                                        //     <div className="answerd-question-box">20</div> 
                                    )}

                                    {/* {newData && newData?.map((data:any, i:number) =>  
                                    
                                    <div className={data.isChecked == false ? "answerd-question-box": "answerd-not-touch"}>{i+1}</div> 
                                       )} */}
                                </div>


                            </div>
                            <div className="clearfix"></div>
                        </div>


                     

                    </div> : null}

                    {!showResult ? <div className="result-questions">
                        <div className="question-box-card ">
                            {practiceTests && practiceTests?.map((que: any, i: number) =>
                                <div className="question-box-card-con">
                                    <h5 className="mb-1 primary-color"> Question {i + 1}</h5>
                                    <p>
                                        {que?.questionData?.question}</p>
                                    <div className="time-taken">
                                        <div className="time-taken-test">
                                        Time Taken: { new Date(que?.time_taken * 1000).toISOString().slice(11, 19)}
                                        {/* {que?.time_taken} */}
                                            {/* Time Taken: 0:00:06 */}
                                        </div>
                                        <div className="time-taken-ideal">
                                            Ideal Time 0:01:00
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="question-checbox">
                                        {que?.questionData?.options?.map((opt: any, j: number) =>
                                            <ul>
                                                <li>

                                                    {opt.ans == true ? <FormControlLabel checked className="current-answer" control={<Checkbox />} label={opt.val} /> :
                                                    <div>
 {opt.ans == false && opt.val == que?.ans[0]  ? <FormControlLabel  className="your-answer" control={<Checkbox />} label={opt.val} /> : <FormControlLabel  control={<Checkbox />} label={opt.val} />}
                                                    </div>}
                                                    {/* {opt.val == que?.ans[0] && <FormControlLabel checked className="your-answer" control={<Checkbox />} label={opt.val} />}
                                                  {opt.ans == false && <FormControlLabel control={<Checkbox />} label={opt.val} />} */}
                                                </li>
                                            </ul>
                                        )}
                                        {/* <ul>
                                                <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 01" /></li>
                                                <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 02" /></li>
                                                <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                                <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                                            </ul> */}
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            )}

                        </div>
                        
                            {/* <div className="question-box-card ">
                                <div className="question-box-card-con">
                                    <h5 className="mb-1 primary-color">Question 02</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                                    <div className="time-taken">
                                        <div className="time-taken-test">
                                            Time Taken: 0:00:06
                                        </div>
                                        <div className="time-taken-ideal">
                                            Ideal Time 0:01:00
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="question-checbox">
                                        <ul>
                                            <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 01" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} label="Option 02" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 03" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} label="Option 04" /></li>

                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>


                            </div>

                            <div className="question-box-card ">
                                <div className="question-box-card-con">
                                    <h5 className="mb-1 primary-color">Question 03</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor luctus libero, vel tincidunt sapien tempus eu. In a sodales odio. Quisque eu elit a ante luctus condimentum non ac magna. Phasellus faucibus convallis purus, in mollis leo laoreet vitae.?</p>
                                    <div className="time-taken">
                                        <div className="time-taken-test">
                                            Time Taken: 0:00:06
                                        </div>
                                        <div className="time-taken-ideal">
                                            Ideal Time 0:01:00
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="question-checbox">
                                        <ul>
                                            <li> <FormControlLabel control={<Checkbox />} label="Option 01" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} className="current-answer" label="Option 02" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} label="Option 03" /></li>
                                            <li> <FormControlLabel control={<Checkbox />} className="your-answer" label="Option 04" /></li>

                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>


                            </div> */}
                           
        {showfeedback ? 
            <div className="rate-content mt-3">
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <div className="rate-content-box">
                        <label><b>Rate this Test</b></label>
                        <ReactStars
                        count={5}
                        value={feedbackRating}
                        onChange={feedbackratingChanged}
                        size={30}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                        {/* <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Easy" />
                            <FormControlLabel control={<Checkbox />} label="Average" />
                            <FormControlLabel control={<Checkbox />} label="Hard" />
                            <FormControlLabel control={<Checkbox />} label="Average" />
                        </FormGroup> */}
                    </div>
                    <div className="text-area">
                        <TextField
                            id="filled-multiline-static"
                            label="Feedback"
                            className="w-100 mt-2"
                            multiline
                            value={feedbacktext}
                            onChange={feedbackTextChange}
                            rows={4}
                            defaultValue=""
                            variant="filled"
                        />
                    </div>
<div className='mt-2'>
<FormControl>
<FormLabel id="demo-row-radio-buttons-group-label">Share</FormLabel>
<RadioGroup
row
aria-labelledby="demo-row-radio-buttons-group-label"
name="row-radio-buttons-group"
>
<FormControlLabel value="public" control={<Radio/>}  onChange={() => setPrivateResult(false)} label="Public" />
<FormControlLabel value="privateresult" control={<Radio  onChange={() => setPrivateResult(true)}/>} label="Private" />

</RadioGroup>
</FormControl>

</div>

<div className="get-result mt-2">
                            <div className="button-center text-center">
                                    <AppButton
                                        children="Submit" onClick={feedbackSubmit}
                                        styleClass='btn save-btn  primary-bg text-white' />
                            </div>

                        </div>
                    
           {privateresult ? <div className="">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Challenge Friends" />
                        </FormGroup>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="list-friends mt-2">
                            <div className="w-80">
                                <img src="https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/person1.jpg" alt="" />
                                <h4>Dipyaman</h4>
                            </div>
                            <div className="w-20">
                                <span className="font-w600 mr-2" style={{ 'color': '#EE0000' }}>REMOVE</span>
                                <span className="font-w600" style={{ 'color': '#1C1821' }}>CLOSE</span>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    
                    </div> : ''}         
                </Grid>
            </Grid>
        </div> : ''}                
       
                         

                    </div> : null}

                    {/* <button onClick={closeWindow}>
    Close Window
</button> */}
                </div> : null}
            </div>
            
            <ToastContainer/>
        </div>
    );
}