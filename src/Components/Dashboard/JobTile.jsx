import React, { useState, useEffect } from "react";
import "../../Styling/dashboard/jobs.scss";
import { connect } from "react-redux";
import { editJob } from "../../actions/index";
import { motion } from "framer-motion";
import JobCard from "./JobCard";

function JobTile(props) {
  /// THIS IS THE CODE FOR THE TINY JOB TILES THAT OPEN
  /// THE MAIN JOB MODAL

  // this is the color of the tile
  const [bgcolor, setColor] = useState(props.job.color || "rgb(186, 43, 214)");

  // this is to activate the job card modal
  const [clickedJob, setClickedJob] = useState(false);

  useEffect(() => {
    // checks to see if the job was updated
  }, clickedJob);

  // closes child card component only if it's already open
  const closeCard = () => {
    setClickedJob(false);
    console.log(clickedJob);
    console.log("here");
  };

  // this opens the job tile
  const clickJob = () => {
    setClickedJob(true);
  };

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  return (
    <motion.div
      variants={item}
      className="jobTile"
      style={{ background: bgcolor }}
      transition={{ ease: "easeIn" }}
      onClick={!clickedJob ? clickJob : null}
    >
      <h1 className="tileCompany">{props.job.company.toUpperCase()}</h1>
      <h1 className="tileJob">{props.job.position}</h1>

      {/* these are the card corners for hover effect  */}
      <div className="cardCorners">
        <i
          id="topRight"
          style={{ color: bgcolor }}
          className="fas fa-chevron-up"
        ></i>
        <i
          id="topLeft"
          style={{ color: bgcolor }}
          className="fas fa-chevron-up"
        ></i>
        <i
          id="bottomRight"
          style={{ color: bgcolor }}
          className="fas fa-chevron-up"
        ></i>
        <i
          id="bottomLeft"
          style={{ color: bgcolor }}
          className="fas fa-chevron-up"
        ></i>
      </div>

      {clickedJob ? (
        <div className="grayedBackdrop">
          <JobCard
            job={props.job}
            removeJob={props.removeJob}
            key={props.job.id}
            closeCard={closeCard}
          />
        </div>
      ) : null}
    </motion.div>
  );
}

const mapDispatchToProps = {
  editJob: editJob
};

export default connect(null, mapDispatchToProps)(JobTile);
