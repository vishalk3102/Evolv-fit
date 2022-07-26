import React from "react";
import logo from "../assets/resume-img.jpeg";
import "../Components/Dashboard.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineExclamation,
} from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
import {
  MdOutlinePersonOutline,
  MdOutlineCalendarToday,
  MdOutlineFastfood,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import data from "../Api/data";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ReactTooltip from "react-tooltip";
import ProgressBar from "@ramonak/react-progress-bar";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // for increment /decrement of steps by 500
  const [steps, setSteps] = useState(4);
  const incSteps = () => {
    setSteps(Number(steps) + 0.5);
  };
  const decSteps = () => {
    setSteps(Number(steps) - 0.5);
  };

  if (steps <= 0) {
    decSteps = () => {
      setSteps(0);
    };
  }

  // for increment /decrement of calories  by 100
  const [cal, setCal] = useState(2.5);
  const incCal = () => {
    setCal(Number(cal) + 0.1);
  };
  const decCal = () => {
    setCal(Number(cal) - 0.1);
  };

  if (cal <= 0) {
    decCal = () => {
      setCal(0);
    };
  }

  // routing  when clicked on arrow
  const navigate = useNavigate();

  const routeChangeWorkout = () => {
    navigate("/userid/workout");
  };
  const routeChangeNutrition = () => {
    navigate("/userid/nutrition");
  };

  // doughnut pie chart
  const plugins = [
    {
      beforeDraw: function(chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 70).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = "2547",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
        var text = "calorie",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.5;
        ctx.fillStyle = "#fff";
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  // json data mapping
  const [userData, setUserData] = useState(data);

  return (
    <>
      <section className="dashboard">
        <div className="container-fluid mx-auto">
          <div className="row main-container">
            <div className="col-lg-12 mx-auto">
              <div className="row row-header">
                <div className="col-lg-3 "></div>
                <div className="col-lg-2 ">
                  <span className="icons-div">
                    <FaWalking />
                  </span>
                  <h2>Steps</h2>
                </div>
                <div className="col-lg-2">
                  <span className="icons-div">
                    <BiDumbbell />
                  </span>
                  <h2>Workout</h2>
                </div>
                <div className="col-lg-3">
                  <span className="icons-div">
                    <MdOutlineFastfood />
                  </span>
                  <h2>Nutrition</h2>
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
            <div className=" col-lg-12 mx-auto">
              {userData.map((curElems, key) => {
                const {
                  id,
                  name,
                  email,
                  stepWalked,
                  stepTarget,
                  performedDate,
                  scheduleDate,
                  calorieIntake,
                  calorieTarget,
                  proteinConsumed,
                  proteinTarget,
                  carbConsumed,
                  carbTarget,
                  fatConsumed,
                  fatTarget,
                  feedback,
                  proteinName,
                  carbsName,
                  fatName,
                } = curElems;

                {
                  /* Getting  current Date  */
                }
                const current = new Date();
                let month = current.toLocaleString("default", {
                  month: "short",
                });
                let day = current.getDate();
                const date = `${day} ${month}`;

                return (
                  <>
                    <div key={id} className="col-lg-12">
                      <div className="row-div row">
                        <div className="name-box d-flex justify-content-start align-items-center col-lg-3 col-md-12 col-sm-12">
                          <div className="img-div">
                            <img src={logo} alt="" />
                          </div>
                          <div className="text-div">
                            <h4>{name}</h4>
                            <p>{email}</p>
                          </div>
                        </div>
                        <div className="steps-box d-flex justify-content-space-between align-items-center col-lg-2 col-md-6 col-sm-6">
                          <div
                            styles={{
                              width: 200,
                              height: 200,
                            }}
                            className="progressbar"
                          >
                            <CircularProgressbarWithChildren
                              value={66}
                              text={calorieIntake}
                            ></CircularProgressbarWithChildren>
                          </div>
                          <div className="target-box ms-3">
                            <div className="plus-minus " onClick={incSteps}>
                              <AiOutlinePlus />
                            </div>
                            <h4>{steps}k</h4>
                            <span>target</span>
                            <div className="plus-minus" onClick={decSteps}>
                              <AiOutlineMinus />
                            </div>
                          </div>
                        </div>
                        <div className="workout-box d-flex justify-content-between align-items-center col-lg-2 col-md-6 col-sm-6">
                          <div className="calender">
                            <div>
                              <MdOutlinePersonOutline />
                              <span> {performedDate}</span>
                            </div>
                            <div
                              className={
                                date === scheduleDate ? "red" : "notred"
                              }
                            >
                              <MdOutlineCalendarToday />
                              <span> {scheduleDate}</span>
                            </div>
                          </div>
                          <div
                            className={
                              feedback === "true"
                                ? "redArrow me-4"
                                : "arrow me-4 "
                            }
                            onClick={routeChangeWorkout}
                          >
                            {feedback === "true" ? (
                              <AiOutlineExclamation />
                            ) : (
                              <IoIosArrowForward />
                            )}
                          </div>
                        </div>
                        <div className="nutrition-box d-flex justify-content-start align-items-center col-lg-3 col-md-5 col-sm-5">
                          <div
                            className="pie-chart"
                            data-tip
                            data-for="piechart-tooltip"
                          >
                            <Doughnut
                              data={{
                                labels: [],
                                datasets: [
                                  {
                                    label: "nutrition stats",
                                    data: [
                                      `${fatConsumed}`,
                                      `${carbConsumed}`,
                                      `${proteinConsumed}`,
                                    ],
                                    backgroundColor: [
                                      "#03C7FC",
                                      "#F45C84",
                                      "#F5C90F",
                                    ],
                                    cutout: 22,
                                    borderWidth: 0,
                                  },
                                ],
                              }}
                              plugins={plugins}
                              height={70}
                              width={70}
                            />
                            <ReactTooltip
                              id="piechart-tooltip"
                              place="bottom"
                              effect="solid"
                              event="click"
                              arrowColor={"#333B44"}
                              arrowSize={"10px"}
                            >
                              <div className="tooltip-row">
                                <div className="tooltip-text">
                                  <span>{proteinName}</span>
                                  <span>{proteinTarget}g</span>
                                </div>
                                <div className="tooltip-bar">
                                  <ProgressBar
                                    bgColor={"#03C7FC"}
                                    completed={proteinConsumed}
                                    customLabel={proteinConsumed}
                                    height={"15px"}
                                    labelSize={"12px"}
                                    baseBgColor={"#101317"}
                                    maxCompleted={proteinTarget}
                                  />
                                </div>
                              </div>
                              <div className="tooltip-row">
                                <div className="tooltip-text">
                                  <span>{fatName}</span>
                                  <span>{fatTarget}g</span>
                                </div>
                                <div className="tooltip-bar">
                                  <ProgressBar
                                    bgColor={"#F45C84"}
                                    completed={fatConsumed}
                                    customLabel={fatConsumed}
                                    height={"15px"}
                                    labelSize={"12px"}
                                    baseBgColor={"#101317"}
                                    maxCompleted={fatTarget}
                                  />
                                </div>
                              </div>
                              <div className="tooltip-row">
                                <div className="tooltip-text">
                                  <span>{carbsName}</span>
                                  <span>{carbTarget}g</span>
                                </div>
                                <div className="tooltip-bar">
                                  <ProgressBar
                                    bgColor={"#F5C90F"}
                                    completed={carbConsumed}
                                    customLabel={carbConsumed}
                                    height={"15px"}
                                    labelSize={"12px"}
                                    baseBgColor={"#101317"}
                                    maxCompleted={carbTarget}
                                  />
                                </div>
                              </div>
                            </ReactTooltip>
                          </div>
                          <div className="target-box">
                            <div className="plus-minus" onClick={incCal}>
                              <AiOutlinePlus />
                            </div>
                            <h4>{cal}k</h4>
                            <span>target</span>
                            <div className="plus-minus" onClick={decCal}>
                              <AiOutlineMinus />
                            </div>
                          </div>
                          <div
                            className="arrow ms-3"
                            onClick={routeChangeNutrition}
                          >
                            <IoIosArrowForward />
                          </div>
                        </div>
                        <div className="notification-box col-lg-1  col-md-5 col-sm-5">
                          <div>
                            <span>
                              <IoNotificationsOutline color="black" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
