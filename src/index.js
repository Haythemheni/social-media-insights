import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "./css/bootstrap.min.css";
import "./css/fonts/style.css";
import "./css/tether.min.css";
import "./css/select2.css";
import "./css/prestigio.css";
import "./css/style.css";
import "./css/metrics.css";
import "./css/navbar.css";
import "./css/socialnetworks.css";
import Metrics from "./Metrics";
import TopMentioners from "./TopMentioners";
import InfiniteScroll from 'react-infinite-scroller';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sortby: "",
      sortSocial: "",
      searchQuery: "",
      MoreData: true,
      pageNo: 1,
      totalPages: 2
    };
  }

  handleSelect = e => {
    const { value } = e.target;
    this.setState({
      sortby: value
    });
  };

  fetchData = () => {
    const {sortby, sortSocial, searchQuery, totalPages, pageNo, MoreData } = this.state;

    if (MoreData==false) {
      console.log("no more data");
      return;
    }
    if (pageNo > totalPages) {
      // no more data
      this.setState({
        MoreData: false
      });
    } else {
      fetch("https://adcaller.com/brands/me/mentioned_social_posts?page="+pageNo+"&limit=4"+sortby+"&qField=user.userinfo.displayname"+searchQuery+"&includes=user%2Cfacebook%2Cinstagram%2Cmentions.%28user%2Cbrand%29"+sortSocial+""

        )
        .then(response => response.json())
        .then(data =>
          this.setState({
            posts: this.state.posts.concat(data.data.attributes),
            totalPages: data.meta.  totalPages,
            pageNo: pageNo + 1
          },()=>{console.log("total pages= ",this.state.totalPages,pageNo)})
        );
    }
  };

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      sortby: PrevSortby,
      sortSocial: PrevSortSocial,
      searchQuery: PrevSearchQuery
    } = prevState;
    const { sortby, sortSocial, searchQuery } = this.state;
    if (
      sortby !== PrevSortby ||
      sortSocial !== PrevSortSocial ||
      searchQuery !== PrevSearchQuery
    ) {
      
      fetch(
        "https://adcaller.com/brands/me/mentioned_social_posts?page=1&limit=4"+sortby+"&qField=user.userinfo.displayname"+searchQuery+"&includes=user%2Cfacebook%2Cinstagram%2Cmentions.%28user%2Cbrand%29"+sortSocial+""
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            posts: data.data.attributes
          })
        );
    }
  }

  render() {
    return (
      <div class="brand-prestigio">

        <div  class="container-fluid prestigio-brand-background">

            <div class="row pr-close-row">
                <div class="col col-lg-6 offset-lg-3">
                    <div ref="iScroll"  class="row no-gutters">
                        <div class="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">
                            <div class="prestigio-responsive-central-pane">
								<div class="row pr-close-row">
									<div class="col col-12 col-md-4 mb-2 mb-md-3">
                        <select
                          onChange={this.handleSelect}
                          className="prestigio-new-input w-100 pr-select"
                        >
                          <option value="&sortField=post_created_at" selected >Date</option>
                          <option value="&sortField=user.userinfo.displayname">Name</option>
                        </select>
                      </div>
                      <div className="col col-12 col-md-auto ml-auto mb-3">
                        <div className="prestigio-search">
                          <input
                            onChange={e =>
                              this.setState({ searchQuery: "&qValue="+e.target.value },()=>{console.log(this.state.searchQuery)})
                            }
                            type="search"
                            className="prestigio-new-input w-100"
                            placeholder="Search..."
                          />
                          <button
                            type="button"
                            className="prestigio-search-input-btn"
                          >
                            <i className="pr-icon-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prestigio-responsive-central-pane">
                    <div className="row pr-close-row">
                      <div className="col col-auto mb-3">
                        <button
                          onClick={() => this.setState({ sortSocial: "" })}
                          type="button"
                          className="prestigio-btn prestigio-blue-white-inverse metrics-picker selected prestigio-shadow"
                        >
                          ALL
                        </button>
                      </div>
                      <div className="col col-auto mb-3">
                        <button
                          onClick={() =>
                            this.setState({ sortSocial: "&social=facebook" })
                          }
                          type="button"
                          className="prestigio-btn square metrics-picker prestigio-shadow facebook"
                        >
                          <i className="pr-icon-facebook" />
                        </button>
                      </div>
                      <div className="col col-auto mb-3">
                        <button
                          onClick={() =>
                            this.setState({ sortSocial: "&social=instagram" })
                          }
                          type="button"
                          className="prestigio-btn square metrics-picker prestigio-shadow instagram"
                        >
                          <i className="pr-icon-instagram" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="prestigio-tab-pane" style={{display: "block"}} id="brand-pane" data-tabs="mentions">
                    <div className="prestigio-offset-pane-big">
                      <div className="row pr-responsive-row" >
                      <InfiniteScroll
                          pageStart={1}
                          loadMore={this.fetchData}
                          hasMore={this.state.MoreData}
                          loader={<h4 key={0}>Loading ...</h4>}
                      >
                        {this.state.posts.map((el, i) => (
                          <div    key={i} className="col col-12 col-lg-8 ">
                            <div className="mention-container">
                              <div className="mention-row">
                                <div className="mention-body">
                                  <div className="row pr-close-row">
                                    <div className="col col-12 col-md-7 mb-2">
                                      <a
                                        href={el.facebook.length==0 ? el.instagram[0].accountinfo.url : el.facebook[0].accountinfo.url }
                                        className="no-style"
                                        target="_blank"
                                      >
                                    <div class="profile-timeline-post pb-2 mb-0 prestigio-shadow">
																		<div class="ptp-header mb-2 d-flex justify-content-between relative">
																			<div class="ptp-header-left d-flex">
																				<img class="prestigio-thumbnail" src={el.user[0].userinfo.avatar_url}/>
																				<div class="ptp-header-left-text ml-2 d-flex flex-column justify-content-between">
																					<div class="ptp-header-name">
																						{el.user[0].userinfo.displayname}
																					</div>
                                                <div className="ptp-header-info">
                                                  <span className={el.social=="facebook"?"ptp-h-sn facebook" :"ptp-h-sn instagram"}>
                                                    {el.social}
                                                  </span>
                                                  <span className="ptp-h-sep">
                                                    .
                                                  </span>
                                                  <span className="ptp-h-date">
                                                    {moment(
                                                      el.post_created_at
                                                    ).format(
                                                      "MMM DD YYYY HH:MM"
                                                    )}
                                                  </span>
                                                  <span className="ptp-h-sep">
                                                    .
                                                  </span>
                                                  <span className="ptp-h-prv">
                                                    <i className="pr-icon-world" />
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="ptp-content mb-2">
                                            <div className="ptp-c-text">
                                              <p className="mb-0">
                                                {el.post_content.text}
                                               
                                              </p>
                                            </div>
                                            <div className="ptp-c-thumb">
                                              <img
                                                width={300}
                                                src={el.post_content.picture}
                                              />
                                            </div>
                                          </div>
                                          <div className="ptp-footer d-flex">
                                            <div className="ptp-f-container d-flex align-items-center">
                                              <div className="ptp-f-icon">
                                                <i className="pr-icon-like" />
                                              </div>
                                              <div className="ptp-f-text">
                                                {el.post_metrics.likes_count}
                                              </div>
                                            </div>
                                            <div className="ptp-f-container d-flex align-items-center">
                                              <div className="ptp-f-icon">
                                                <i className="pr-icon-comment" />
                                              </div>
                                              <div className="ptp-f-text">
                                                {el.post_metrics.comments_count}
                                              </div>
                                            </div>
                                            <div className="ptp-f-container d-flex align-items-center">
                                              <div className="ptp-f-icon">
                                                <i className="pr-icon-share" />
                                              </div>
                                              <div className="ptp-f-text">
                                                {el.post_metrics.shares_count}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                    <div className="col col-12 col-md-5">
                                      <Metrics
                                       user={el.user[0]}
                                       mentions={el.mentions}
                                       facebook={el.facebook}
                                       instagram={el.instagram}
                                      />
                                      <div className="text-right">
                                              <button
                                                onClick={() => {
                                                  el.facebook.length==0 ? window.open(el.instagram[0].accountinfo.url)  : window.open(el.facebook[0].accountinfo.url)

                                                  
                                                }}
                                                type="button"
                                                className="prestigio-btn prestigio-blue-white prestigio-shadow"
                                                data-toggle="modal"
                                                data-target="#shareModal"
                                              >
                                                <i className="pr-icon-share" /> SHARE
                                              </button>
                                            </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row pr-close-row">
                                <div className="col col-8 offset-2 offset-lg-3">
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </InfiniteScroll>

                        <TopMentioners />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
