import { useState, useEffect } from "react";
import "./App.css";
import myData from "./data.json";
import CollegeRow from "./CollegeRow";

function App() {
  // Sorted Data Array(contains all the colleges in sorted order)
  const [colleges, setColleges] = useState([]);

  // Sort State
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBasis, setSortBasis] = useState("cdRating");

  //to display colleges based on infinite scroll(how many to be displayed)
  const [pageData, setPageData] = useState([]);
  const perPage = 4;
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    sortingFunc(sortBasis, sortOrder, "");

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Loading More Effect
  useEffect(() => {
    if (!loadingMore) return;
    loadFunc();
  }, [loadingMore]);

  // On Scroll Event
  const onScroll = (event) => {
    const documentHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if (currentScroll == documentHeight && hasMore && !loadingMore) {
      setLoadingMore(true);
    }
  };

  //Load Data according to page no
  const loadFunc = () => {
    setLoadingMore(true);

    setTimeout(() => {
      console.log("Colleges", colleges);

      const startIndex = pageData.length;
      const endIndex = startIndex + perPage;
      const currentPage = colleges.slice(startIndex, endIndex);

      setHasMore(pageData.length + currentPage.length < colleges.length);
      setPageData([...pageData, ...currentPage]);
      setLoadingMore(false);
    }, 1000);
  };

  //sorting function
  const sortingFunc = (sortBy, sortDirection, searchString) => {
    const filteredData = myData.colleges.filter((item) =>
      item.name.toLowerCase().includes(searchString.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      let valueA, valueB;
      switch (sortBy) {
        case "cdRating":
          valueA = a.cdRank;
          valueB = b.cdRank;
          break;
        case "feesSort":
          valueA = a.courseFees;
          valueB = b.courseFees;
          break;
        case "userRating":
          valueA = a.userReviews.rating;
          valueB = b.userReviews.rating;
          break;
        default:
          valueA = a.cdRank;
          valueB = b.cdRank;
      }

      //sorting direction
      if (sortDirection === "asc") {
        return valueA - valueB;
      } else if (sortDirection === "desc") {
        return valueB - valueA;
      }
    });

    // Pagination
    const currentPage = sortedData.slice(0, perPage);

    // Save Data
    setColleges(sortedData);
    setPageData(currentPage);
    setHasMore(currentPage.length < sortedData.length);
  };

  return (
    <>
      <div id="upperFunctions">
        <div id="searchSpace">
          <input
            type="text"
            placeholder="Search by College name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              sortingFunc(sortBasis, sortOrder, e.target.value);
            }}
          />
        </div>
        <div id="sortButtons">
          Sort By:
          <div id="sortBycdRating">
            <input
              type="radio"
              id="collegeDuniyaRating"
              name="sort"
              value="collegeDuniyaRating"
              checked={sortBasis === "cdRating"}
              onChange={() => {
                setSortBasis("cdRating");
                sortingFunc("cdRating", sortOrder, searchQuery);
              }}
            />
            <label htmlFor="collegeDuniyaRating">Collge Duniya Rating</label>
          </div>
          <div id="sortByFees">
            <input
              type="radio"
              id="fees"
              name="sort"
              value="fees"
              checked={sortBasis === "feesSort"}
              onChange={() => {
                setSortBasis("feesSort");
                sortingFunc("feesSort", sortOrder, searchQuery);
              }}
            />
            <label htmlFor="fees">Fees</label>
          </div>
          <div id="sortByUserReview">
            <input
              type="radio"
              id="userReviewRating"
              name="sort"
              value="userReviewRating"
              checked={sortBasis === "userRating"}
              onChange={() => {
                setSortBasis("userRating");
                sortingFunc("userRating", sortOrder, searchQuery);
              }}
            />
            <label htmlFor="userReviewRating">User Review Rating</label>
          </div>
        </div>
        <div id="SortBy">
          Set order:
          <input
            type="radio"
            id="ascendingOrder"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={() => {
              setSortOrder("asc");
              sortingFunc(sortBasis, "asc", searchQuery);
            }}
          />
          <label htmlFor="ascendingOrder">Ascending</label>
          <input
            type="radio"
            id="descendingOrder"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={() => {
              setSortOrder("desc");
              sortingFunc(sortBasis, "desc", searchQuery);
            }}
          />
          <label htmlFor="descendingOrder">Descending</label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>Colleges</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((college, index) => (
            <CollegeRow key={index} collegeDetails={college} />
          ))}
        </tbody>
      </table>
      <div className="load_more">
        <button disabled={!hasMore} onClick={(e) => loadFunc()}>
          {loadingMore
            ? "Loading"
            : hasMore
            ? "Load more items.."
            : "No more items.."}
        </button>
      </div>
    </>
  );
}

export default App;
