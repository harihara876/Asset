import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import configJson from "vridhee_common_component_mf/configJson";
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import AppButton from 'vridhee_common_component_mf/AppButton';
import GaugeChart from 'react-gauge-chart'

import { useState, useRef } from "react";
import DashboardService from "../Services/dashboardservices";
import IDashboard from "../Models/IDashboard";
import LoadingSpinner from "./spinner";


const assetUrl = configJson.local.curriculumAssetUrl;
const dashboard_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl


interface IPracticeTest {
    practiceTests: IDashboard[]
}

export default function Test(props:any)  {
    const [testType, setTestType] = useState('practice test');

    const [practiceTest, setPracticeTest] = useState<IPracticeTest>({
        practiceTests: [] as IDashboard[]
    })
    
    const NewWindow = () => {
        console.log(props,"location.state")
        //test code send data to new window
        const url = `${dashboard_URL}test-quiz`;

        const newWindow = window.open(url, '_blank', 'width=1900,height=800');
        // Send data to the new window using postMessage
        if (newWindow) {
            setTimeout(() => {
                newWindow.postMessage({ data: props.data }, window.location.origin);
            }, 1000)
        }
    }

    const details = (data:IDashboard) => {
        const url = `${dashboard_URL}exam-result?data=${data._id}`;
         window.open(url);
        //  , '_blank', 'width=1900,height=800'
    }


    useEffect(() => {
        const body = {
            "test_type": "practice_test",
            "db_metadata": 22,
            "user_id": localStorage.getItem('Tokenuserid'),
            "sub_id": localStorage.getItem('subId'),
            "t_id": localStorage.getItem('topicId')
       
        }
        DashboardService.getPracticeTest(body)
            .then(res => {
                console.log(res.data.details, "PracticeTest")
                if (res.data.details) {
                    var newData: any = res.data.details.map((data: any) => {
                        data.cr_dts = data.cr_dts.split('T')[0];
                        return data;
                    });
                    setPracticeTest({
                        ...practiceTest, practiceTests: newData
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
    
    const { practiceTests } = practiceTest;
  return (
    <div>
         <div className="test-dashboard">
                                                {/* <div className="form-group text-center">
                                                    <label>Select Test Type </label>
                                                    <Dropdown
                                                        name="testType" value={testType} id="testType"
                                                        options={options}
                                                        title="Select Test Type" selectStyle="w-40"
                                                        handleChange={(e: any) => {
                                                            setTestType(e.target.value);
                                                            localStorage.setItem('testType', e.target.value)
                                                        }}
                                                        selectedValue={testType} />

                                                </div> */}
                                                <div className="button-center text-center mt-2">
                                                    {testType == 'practice test' ?
                                                        <AppButton children="Start new practice test" onClick={NewWindow} styleClass='btn secondry-bg text-white pl-2 pr-2 border-r' />
                                                        : <AppButton children="Start new Class test" onClick={NewWindow} styleClass='btn secondry-bg text-white pl-2 pr-2 border-r' />}
                                                </div>
                                                <div className="dashboard-score mt-2">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6} sm={6} md={3}>
                                                            <div className="score-chart mt-2">
                                                                <GaugeChart id="gauge-chart3"
                                                                    nrOfLevels={16.7}
                                                                    colors={["#004392", "#EBEBEB"]}
                                                                    arcWidth={0.3}
                                                                    percent={0.16}
                                                                    needleColor="#F22755"

                                                                />
                                                                <div className="chart-title text-center">
                                                                    <h4>16.7</h4>
                                                                    <p>Accuracy</p>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={3}>
                                                            <div className="score-chart mt-2">
                                                                <GaugeChart id="gauge-chart3"
                                                                    nrOfLevels={16.7}
                                                                    colors={["#004392", "#EBEBEB"]}
                                                                    arcWidth={0.3}
                                                                    percent={0.23}
                                                                    needleColor="#F22755"

                                                                />
                                                                <div className="chart-title text-center">
                                                                    <h4>20.3</h4>
                                                                    <p>Score</p>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={3}>
                                                            <div className="circle-dont-chart">
                                                                <div className="donut-chart-block block">
                                                                    <div className="donut-chart">
                                                                        <div id="part1" className="portion-block"><div className="circle"><div className="donut-chart-con">Correct</div></div></div>
                                                                        <div id="part2" className="portion-block"><div className="circle"><div className="donut-chart-con">Wrong</div></div></div>
                                                                        <div id="part3" className="portion-block"><div className="circle"><div className="donut-chart-con">N/A</div></div></div>
                                                                        <p className="center"></p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={3}>
                                                            <div className="score-circle-chart">
                                                                <div className="svg-item text-center">
                                                                    <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
                                                                        <circle className="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
                                                                        <circle className="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
                                                                        <circle className="donut-segment donut-segment-2" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" stroke-dasharray="69 31" stroke-dashoffset="25"></circle>
                                                                        <g className="donut-text donut-text-1">

                                                                            <text y="50%" transform="translate(0, 2)">
                                                                                <tspan x="50%" text-anchor="middle" className="donut-percent">150</tspan>
                                                                            </text>
                                                                            <text y="60%" transform="translate(0, 2)">
                                                                                <tspan x="50%" text-anchor="middle" className="donut-data">Sec</tspan>
                                                                            </text>
                                                                        </g>
                                                                    </svg>
                                                                    <p>Average Time Per Correct Answer</p>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="upcoming-tests">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <div className="upcoming-tests-box mb-2">
                                                                <div className="upcoming-tests-box-header secondry-bg">
                                                                    Upcoming Class Tests
                                                                </div>
                                                                <div className="upcoming-tests-box-body">
                                                                    <h5>Advanced Certification in UI UX Design</h5>
                                                                    <p className="m-0"><b>15 June,2023 11:35 AM</b></p>
                                                                    <div className="user-img">
                                                                        <img src={`${assetUrl}/img%20Event%20add%20student%20remove.svg`} alt="" />Sayad Habeeb
                                                                    </div>
                                                                    <div className="upcoming-tests-box-footer">
                                                                        <ul>
                                                                            <li>
                                                                                <h5 className="m-0">20</h5>
                                                                                <p className="m-0">Questions</p>
                                                                            </li>
                                                                            <li>
                                                                                <h5>20</h5>
                                                                                <p className="m-0">Questions</p>
                                                                            </li>
                                                                            <li>
                                                                                <AppButton children="Start" styleClass='btn save-btn border-r primary-bg text-white' />
                                                                            </li>
                                                                        </ul>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <div className="upcoming-tests-box mb-2">
                                                                <div className="upcoming-tests-box-header secondry-bg">
                                                                    Challenges
                                                                </div>
                                                                <div className="upcoming-tests-box-body">
                                                                    <div className="circle50">CH</div>
                                                                    <div className="challenge-con">
                                                                        <h5>Energy bands and the concept of doping</h5>
                                                                        <p>Explore the historical evolution of electronic devices, from vacuum tubes to semiconductors.</p>
                                                                        <div>
                                                                            <span className="float-left">
                                                                                <div className="challenge-user-icon"><i className="fa fa-user" aria-hidden="true"></i></div>By: Anurag
                                                                            </span>
                                                                            <span className="float-right">
                                                                                <ul className="buddies-img">
                                                                                    <li><img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&amp;dl=pexels-andrea-piacquadio-3763188.jpg&amp;fm=jpg" alt="" /></li>
                                                                                    <li><img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&amp;dl=pexels-andrea-piacquadio-3763188.jpg&amp;fm=jpg" alt="" /></li>
                                                                                    <li><img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&amp;dl=pexels-andrea-piacquadio-3763188.jpg&amp;fm=jpg" alt="" /></li>
                                                                                    <li><span>23 Accepted</span></li>
                                                                                </ul>

                                                                            </span>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <AppButton children="Ignore" styleClass='btn w-50 mr-2 white-bg border-r primary-color' />
                                                                            <AppButton children="Accept" styleClass='btn w-50 save-btn border-r primary-bg text-white' />
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="clearfix"></div>


                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    {practiceTests.length > 0 ?         <div className="test-result-table mt-3 pt-3 border-top mb-3">
                                                        <h4>Result</h4>
                                                        <table>
                                                        <tr>
                                                                <th>#Date</th>
                                                                {/* <th>Topic Name</th> */}
                                                                <th>Rank</th>
                                                                {/* <th>Type</th> */}
                                                                <th>Correct/Wrong/NA</th>
                                                                <th>Percentage</th>
                                                                <th>Progress</th>
                                                                <th>Accuracy</th>
                                                                <th>Time / Questions</th>
                                                                <th>Details</th>
                                                            </tr>


                                                            {practiceTests.length > 0 ? practiceTests.map((testData, i) =>
                                                            <tr>
                                                                <td> {testData?.cr_dts}</td>
                                                                {/* <td>Introduction to Semi conductors</td> */}
                                                                <td>5/20</td>
                                                                {/* <td>Challange</td> */}
                                                                <td>{testData?.exam_statistics.correctCount}/{testData?.exam_statistics.wrongCount}/{testData?.exam_statistics.notAttemptedCount}</td>
                                                                <td>  {Number(`${testData?.score}`).toFixed(2)}%</td>
                                                                <td>{Number(`${testData?.progress}`).toFixed(2)}%</td>
                                                                <td>{Number(`${testData?.accuracy}`).toFixed(2)}%</td>
                                                                <td>{testData?.time_questions.ttl_time}Mins/{testData?.time_questions.ttl_questions}Q</td>
                                                                <td>
                                                                    <AppButton children="Details" onClick={() => details(testData)} styleClass='btn save-btn border-r primary-bg text-white' />
                                                                    </td>
                                                            </tr>
                                                               ) : 
                                                               <div>  
                                                                {/* <LoadingSpinner />  */}
                                                                 </div>
                                                               }
                                                            {/* <tr>
                                                                <td>11-06-2023</td>
                                                                <td>Introduction to Semi conductors</td>
                                                                <td>5/20</td>
                                                                <td>Challange</td>
                                                                <td>5/10/23</td>
                                                                <td>20%</td>
                                                                <td>20%</td>
                                                                <td></td>
                                                                <td>20Mins / 20Q</td>
                                                                <td><AppButton children="Details" styleClass='btn save-btn border-r primary-bg text-white' /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>11-06-2023</td>
                                                                <td>Introduction to Semi conductors</td>
                                                                <td>5/20</td>
                                                                <td>Challange</td>
                                                                <td>5/10/23</td>
                                                                <td>20%</td>
                                                                <td>20%</td>
                                                                <td></td>
                                                                <td>20Mins / 20Q</td>
                                                                <td><AppButton children="Details" styleClass='btn save-btn border-r primary-bg text-white' /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>11-06-2023</td>
                                                                <td>Introduction to Semi conductors</td>
                                                                <td>5/20</td>
                                                                <td>Challange</td>
                                                                <td>5/10/23</td>
                                                                <td>20%</td>
                                                                <td>20%</td>
                                                                <td></td>
                                                                <td>20Mins / 20Q</td>
                                                                <td><AppButton children="Details" styleClass='btn save-btn border-r primary-bg text-white' /></td>
                                                            </tr> */}
                                                        </table>

                                                    </div>
                                                     :''}
                                                </div>
                                            </div> 


                                            
        </div>



  )
}
