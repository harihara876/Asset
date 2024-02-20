import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import SubjectDetails from "./Pages/curriculum-subject";
import TopicPage from "./Pages/topic-page";
import QuizTest from "./Pages/curriculum-test";
import TestReview from "./Pages/tests-review";
import RateTest from "./Pages/rate-test";
import Library from "./Pages/library";
import Collaboration from "./Pages/collaboration";
import Doubts from "./Pages/doubts";
import Rewards from "./Pages/Rewards";
import TotalCourses from "./Pages/total-courses";
import Planner from "./Pages/planner";
import Analytics from "./Pages/analytics";
import Activities from "./Pages/activities";
import AssignmentSubmission from "./Pages/assignment-submission";
import ActivitiesResult from "./Pages/activities-result";
import AllCertifications from "./Pages/all-certifications";
import TODO from "./Pages/todo";
import Explore from "./Pages/explore";
import Community from "./Pages/community";
import Profile from "./Pages/profile";
import TestQuiz from "./Pages/test-quiz";
import DoubtAnswer from "./Pages/doubt-answer";
import DoubtTabAnswer from "./Pages/doubt-tab-answer";
import DoubtWithoutLogin from "./Pages/doubt-without-login";
import DoubtWithoutLoginAnswer from "./Pages/doubt-without-login-answer";
import { Empty } from "./Pages/empty";
import configJson from "vridhee_common_component_mf/configJson";
import PageNotFound from "./Pages/page-not-found";
import {MobileDashboard } from "./Pages/mobile-dashboard";
import ExamResult from "./Pages/exam-result";
import CollaborationOne from "./Pages/collaboration1";

const logout_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.accountMFUrl : configJson.server.accountMFUrl



const App = () => (
  
  <BrowserRouter>
    {/* <Routes> */}
    {/* <Route element={<PrivateRoutes />}> */}
    {/* <Route path='/' element={<Empty/>} />
      <Route  path='/dashboard'  element={<Dashboard/>}/> 
      <Route path='/subject-details'  element={<SubjectDetails/>}/>
      <Route path='/topic-page'  element={<TopicPage/>}/>
      <Route path='/test'  element={<QuizTest/>}/>
      <Route path='/test-review'  element={<TestReview/>}/>
      <Route path='/rate-test'  element={<RateTest/>}/>

      <Route path='/todo'   element={localStorage.getItem("sid")
          ? <TODO/>
          : window.location.replace(`${logout_URL}`)! 
        } />
      <Route path='/library'  element={localStorage.getItem("sid")
          ? <Library/>: window.location.replace(`${logout_URL}`)! }/>
           <Route path='/planner'  element={localStorage.getItem("sid")
      ? <Planner/>: window.location.replace(`${logout_URL}`)! }/>
          <Route path='/analytics'  element={localStorage.getItem("sid")
      ? <Analytics/>: window.location.replace(`${logout_URL}`)! }/>
      <Route path='/activities'  element={localStorage.getItem("sid")
      ? <Activities/>: window.location.replace(`${logout_URL}`)! }/>
      <Route path='/doubts'  element={localStorage.getItem("sid")
      ? <Doubts/>: window.location.replace(`${logout_URL}`)! }/>
       <Route path='/collaboration'  element={localStorage.getItem("sid")
      ? <Collaboration/>: window.location.replace(`${logout_URL}`)! }/>
      <Route path='/explore'  element={localStorage.getItem("sid")
      ? <Explore/>: window.location.replace(`${logout_URL}`)! }/>
       <Route path='/rewards'  element={localStorage.getItem("sid")
      ? <Rewards/>: window.location.replace(`${logout_URL}`)! }/>
      
     
      <Route path='/total-courses'  element={<TotalCourses/> }/>
      <Route path='/assignment-submission'  element={<AssignmentSubmission/>}/>
      <Route path='/activities-result'  element={<ActivitiesResult/>}/>
      <Route path='/all-certifications'  element={<AllCertifications/>}/>

     

      <Route path='/community'  element={<Community/>}/>
      <Route path='/test-quiz'  element={<TestQuiz/>}/>
      <Route path='/profile'  element={<Profile/>}/>
      <Route path='/tabanswers/:id/:title/:id1'  element={ <DoubtTabAnswer/>}/>
      <Route path='/answers/:id/:title/:id1'  element={ <DoubtAnswer/>}/>
      <Route path='/doubtanswers/:id/:title/:id1'  element={ <DoubtWithoutLoginAnswer/>}/>
      <Route path='/doubt-without-login'  element={<DoubtWithoutLogin/>}/>
      <Route path='*'  element={<PageNotFound/>}/> */}
    
      {/* </Route>

      <Route element={<PublicRoutes />}>
        
      </Route> */}
      
    {/* </Routes> */}
    


    <Routes>

<Route path='/' element={<Dashboard/>} />
<Route  path='/mobile-dashboard'  element={<MobileDashboard/>}/> 
  <Route  path='/dashboard'  element={<Dashboard/>}/> 
  <Route path='/subject-details'  element={<SubjectDetails/>}/>
  <Route path='/topic-page'  element={<TopicPage/>}/>
  <Route path='/test'  element={<QuizTest/>}/>
  <Route path='/test-review'  element={<TestReview/>}/>
  <Route path='/rate-test'  element={<RateTest/>}/>
     <Route path='/todo' element={<TODO/>}/>  
  <Route path='/library'  element={<Library/>}/>
  <Route path='/collaboration'  element={<CollaborationOne/>}/>
  <Route path='/doubts'  element={<Doubts/>}/>
  <Route path='/rewards'  element={<Rewards/>}/>
  <Route path='/total-courses'  element={<TotalCourses/>}/>
  <Route path='/planner'  element={<Planner/>}/>
  <Route path='/analytics'  element={<Analytics/>}/>
  <Route path='/activities'  element={<Activities/>}/>
  <Route path='/assignment-submission'  element={<AssignmentSubmission/>}/>
  <Route path='/activities-result'  element={<ActivitiesResult/>}/>
  <Route path='/all-certifications'  element={<AllCertifications/>}/>
  <Route path='/explore'  element={<Explore/>}/>
  <Route path='/community'  element={<Community/>}/>
  <Route path='/test-quiz'  element={<TestQuiz/>}/>
  <Route path='/profile'  element={<Profile/>}/>
  <Route path='/tabanswers/:id/:title/:id1'  element={ <DoubtTabAnswer/>}/>
  <Route path='/answers/:id/:title/:id1'  element={ <DoubtAnswer/>}/>
  <Route path='/doubtanswers/:id/:title/:id1'  element={ <DoubtWithoutLoginAnswer/>}/>
  <Route path='/doubt-without-login'  element={<DoubtWithoutLogin/>}/>
  <Route path='/exam-result'  element={<ExamResult/>}/>
  {/* <Route path='*'  element={<PageNotFound/>}/> */}
  <Route path='/collaboration1'  element={<CollaborationOne/>}/>
  

</Routes> 

  </BrowserRouter>



);
ReactDOM.render(<App />, document.getElementById("app"));


