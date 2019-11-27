import React from "react";
import "./css/bootstrap.min.css";
import "./css/fonts/style.css";
import "./css/tether.min.css";
import "./css/select2.css";
import "./css/prestigio.css";
// import "./css/style.css";
import "./css/metrics.css";
import "./css/navbar.css";
import "./css/socialnetworks.css";
class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reach: "",
      engagement: "",
      name: "",
      picture: ""
    };
  }

  render() {
    const { user,mentions,facebook,instagram } = this.props;
    return (
      <div class="prestigio-pane px-3 pt-3 mb-3 prestigio-shadow d-flex flex-column justify-content-center">
      <a href="/brand/profile.html" class="no-style d-none d-md-block">
        <div class="d-flex align-items-center mb-3">
          <img class="prestigio-thumbnail mr-2" src={user.userinfo.avatar_url}/>
          <p class="small-text mb-0 ellipsis">{user.userinfo.displayname}</p>
        </div>
      </a>
      <div class="small-title-span p-0 mb-1"><span>POST METRICS</span></div>
      <div class="row pr-close-row">
        <div class="col mb-3">
          <span class="small-text op-67"><strong>Reach</strong></span>
          <h3 class="mb-0">
            
            {facebook.length==0 ?instagram[0].accountmetrics.reach+"K" : facebook[0].accountmetrics.reach+"K"}
            </h3>
        </div>
        <div class="col mb-3">
          <span class="small-text op-67"><strong>Engagement</strong></span>
          <h3 class="mb-0">
          {facebook.length==0 ?instagram[0].accountmetrics.engagement+"K" : facebook[0].accountmetrics.engagement+"K"}

          </h3>
        </div>
      </div>
      <div class="small-title-span p-0 mb-2"><span>TAGGED BRANDS</span></div>
      <div class="mb-2">
        {  mentions.map(el=> (

              <a href="/influencer/brand-profile.html" class="no-style">
              <div class="profile-timeline-tag mr-0 d-flex align-items-center prestigio-shadow">
                <img class="prestigio-thumbnail mr-2" src={el.brand[0].brand_logo_url}/>
                <p class="mb-0 small-text ellipsis">{el.brand[0].brand_name}</p>
              </div>
              </a>

        ) 
 
          )    }

      
        
      </div>
    </div>
    );
  }
}

export default Metrics;
