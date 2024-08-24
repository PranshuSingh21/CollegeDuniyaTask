const formatter = new Intl.NumberFormat("en-IN");
export default function CollegeRow(props) {
  return (
    <tr className={props.collegeDetails.isFeatured && "featured"}>
      <td>
        <div className="rankNo">#{props.collegeDetails.cdRank}</div>
      </td>
      <td>
        <div className="outer">
          {props.collegeDetails.isFeatured && <div>Featured</div>}
          <div className="nameInfo">
            <div className="logo">
              <img src={props.collegeDetails.logo} />
            </div>
            <div className="content">
              <div className="collegeName">
                <a>{props.collegeDetails.name}</a>
              </div>
              <div className="collegePlace">
                {props.collegeDetails.place} {props.collegeDetails.approvedBy}
              </div>
              <div className="coursesOffered">
                <h4>{props.collegeDetails.courses[0].cousre}</h4>
                <p>
                  JEE-Advanced 2024 Cutoff :{" "}
                  {props.collegeDetails.courses[0].cutoff_2024_rank}
                </p>
              </div>
            </div>
          </div>
          <div className="actions">
            <button>Apply Now</button>
            <button>Download Brochure</button>
            <input
              type="checkbox"
              id="comapreCheck"
              name="compare"
              value="yesCompare"
            />
            <label htmlFor="yesCompare"> Compare</label>
          </div>
        </div>
      </td>
      <td valign="top">
        <div className="courseFeesData">
          <div className="fees">
            ₹ {formatter.format(props.collegeDetails.courseFees)}
          </div>
          <div>BE/B.Tech</div>
          <div>-1st Year Fees</div>
          <button>Compare Fees</button>
        </div>
      </td>
      <td valign="top">
        <div className="placementData">
          <div className="packageMoney">
            ₹ {formatter.format(props.collegeDetails.placement.averagePackage)}
          </div>
          <div>Average Package</div>
          <div className="packageMoney">
            ₹ {formatter.format(props.collegeDetails.placement.highestPackage)}
          </div>
          <div>Highest Package</div>
          <button>Compare Placement</button>
        </div>
      </td>
      <td valign="top">
        <div className="userReviewsData">
          <div className="userReviewRating">
            {props.collegeDetails.userReviews.rating}/ 5
          </div>
          <div>Based on {props.collegeDetails.userReviews.noOfUsers} User</div>
          <div>Reviews</div>
          <div>Best in school life</div>
        </div>
      </td>
      <td valign="top">
        <div className="rankingData">
          <div className="rankGiven">
            #{props.collegeDetails.ranking[0].rank}
            <sup>th</sup>/{props.collegeDetails.ranking[0].outOf} in India
          </div>
          <div>{props.collegeDetails.ranking[0].year}</div>
          <div>By-{props.collegeDetails.ranking[0].nameOfOrg}</div>
        </div>
      </td>
    </tr>
  );
}
