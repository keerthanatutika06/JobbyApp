import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import {BsFillStarFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {IoLocationSharp, IoBagCheckSharp} from 'react-icons/io5'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobItemDetails: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: fetchedData.job_details.title,
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJob => ({
          id: eachSimilarJob.id,
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        })),
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobItemDetails} = this.state

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      similarJobs,
    } = jobItemDetails

    return (
      <div className="job-card-details-container">
        <div className="job-detail-card">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill color="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-salary-container">
            <div className="location-emp-container">
              <div className="loaction-container">
                <IoLocationSharp color="#ffffff" />
                <p className="location-title">{location}</p>
              </div>
              <div className="employement-type-container">
                <IoBagCheckSharp color="#ffffff" />
                <p className="employement-type">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>

          <hr className="horiz-line" />

          <div className="desc-container">
            <h1 className="description-title">Description</h1>
            <div className="visit-link-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-link-styles"
              >
                Visit{' '}
                <span>
                  <BsBoxArrowUpRight />
                </span>
              </a>
            </div>
          </div>

          <p className="desc">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-details-container">
            {skills.map(eachSkill => {
              const {imageUrl, name} = eachSkill

              return (
                <li key={name} className="skill-container">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="skills-img-styles"
                  />
                  <p className="skills-name-styles">{name}</p>
                </li>
              )
            })}
          </ul>

          <h1 className="life-heading">Life at Company</h1>
          <div className="life-company-container">
            <p className="life-desc">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>

        <div className="similar-jobs-card-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachSimilarJob => (
              <SimilarJobItem
                similarJobDetails={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-card-failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-message">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button-styles"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderViews()}
      </>
    )
  }
}

export default JobItemDetails
