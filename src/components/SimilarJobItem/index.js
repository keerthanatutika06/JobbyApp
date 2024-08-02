import {BsFillStarFill} from 'react-icons/bs'
import {IoLocationSharp, IoBagCheckSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-card" key={id}>
      <div className="similar-card-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-card-logo"
        />
        <div className="similar-card-title-rating-container">
          <h1 className="similar-card-title">{title}</h1>
          <div className="similar-card-rating-container">
            <BsFillStarFill color="#fbbf24" />
            <p className="similar-card-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="desc-heading">Description</h1>
      <p className="similar-card-desc">{jobDescription}</p>

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
    </li>
  )
}

export default SimilarJobItem
