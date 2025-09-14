const { application } = require("express")
const { Jobs, Application } = require("../models/jobUploadmodel")
const { uploadCloudinary } = require("../utils/cloudinary")
const fs = require("fs")
const { sendingMails } = require("../utils/nodemailer.js")
const { Model } = require("../models/authmodel.js")


const showAllJobs = async (req, res, next) => {
  try {
    const job = await Jobs.find()
    res.json({ message: "All Jobs", data: job })
  } catch (error) {
    next({ statusCode: 400, err: "No Jobs Found" })
  }
}


const ShowJobsById = async (req, res, next) => {
  try {
    const { id } = req.params
    const job = await Jobs.findById(id)
    res.json({ message: "job selected", data: job })
  } catch (error) {
    next({ statusCode: 400, err: "no Job found" })
  }
}


// applications Apis
const ApplyJob = async (req, res, next) => {
  try {
    const { jobId, name, email, phone, skills, education } = req.body;
    const resume = req.files?.resume?.[0];
    const coverLetter = req.files?.coverLetter?.[0];

    // Upload files
    const resumeUrl = await uploadCloudinary(resume.path);
    const coverUrl = await uploadCloudinary(coverLetter.path);

    // Delete local files
    fs.unlink(resume.path, () => {});
    fs.unlink(coverLetter.path, () => {});

    // Find job
    const jobs = await Jobs.findById(jobId);
    if (!jobs) return res.status(404).send("Job not found");

    // Check if already applied
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: req.userId._id });
    if (alreadyApplied) return res.status(400).send("You have already applied");

    // Save application
    const applyDetails = new Application({
      job: jobId,
      applicant: req.userId,
      name,
      email,
      phone,
      skills,
      education,
      resume: resumeUrl,
      coverLetter: coverUrl,
    });

    await applyDetails.save();

    // Send confirmation email
    try {
      await sendingMails(email);
      console.log("Confirmation email sent to:", email);
    } catch (err) {
      console.error("Failed to send email:", err);
    }

    res.status(200).json({ message: "Applied successfully! Confirmation email sent.", Data: applyDetails });

  } catch (error) {
    next({ statusCode: 400, err: error.message });
  }
};

const myApplications = async (req, res, next) => {
  try {
    const userInfo = req.userId._id
    const applications = await Application.find({ applicant: userInfo }).select(["-__v", "-createdAt", "-updatedAt"]).populate("name").populate("job", ["Title", "-_id"])
    res.status(200).json({ message: "Your Applications", data: applications })

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this user" });
    }
  } catch (error) {
    next({ statusCode: 400, err: error.message })
  }
}

const DeleteApplication = async (req, res, next) => {
  try {
    const applicationId = req.params.id
    const job = await Application.findByIdAndDelete(applicationId)
    res.status(200).json({ message: "application deleted successfully", data: job })
  } catch (error) {
    next(error)
  }

}

module.exports = { ApplyJob, showAllJobs, ShowJobsById, myApplications, DeleteApplication }