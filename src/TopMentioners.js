import React from "react";

class TopMentioners extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mentioners: []
    };
  }
  getTopMentioners(data, n) {
    var tmp = {}, tops = [];
    data.forEach(function(item) {
        tmp[item] = tmp[item] ? tmp[item]+1 : 1;
    });  
    tops = Object.entries(tmp).sort(function(a, b) {
      return a[1] - b[1];
  });
    return tops.slice(-(n)).reverse();
}

  componentDidMount() {
    fetch("https://adcaller.com/brands/me/mentions?sortField=user.userinfo.displayname&sortOrder=asc&qField=user.userinfo.displayname&includes=user%2Cbrand")
      .then(response => response.json())
      .then(data => { let m = data.data.attributes.map(el=>el.user[0].userinfo.displayname+"|"+el.user[0].userinfo.avatar_url)

        this.setState({ mentioners: this.getTopMentioners(m,5) })
      })
       
    
    }

  render() {
    const {mentioners}= this.state
  
    return (
       
      <div class="col col-lg-4 d-none d-lg-block" style={{position: "absolute",float: "right",right: "-65px"}}>
											<div class="mentions-right-column">
												<div class="prestigio-pane mb-3 prestigio-shadow" style={{width:"250px"}}>
													<h4 class="px-2 pt-2">Top mentioners</h4>
													<div class="mentions-mentioner-group">

														{ mentioners.map((el,i)=>(
                              <a href="#" class="no-style mentions-mentioner d-flex align-items-center">
															<div class="mentions-mentioner-place">{i+1}</div>
															<img class="prestigio-thumbnail mentions-mentioner-thumb mr-2" src={el[0].split("|")[1]}/>
															<p class="small-text mb-0 ellipsis">{el[0].split("|")[0]}</p>
															<p class="small-text op-67 mb-0 ml-auto mr-1">{el[1]}</p>
                            </a>
                            ))}
													
													</div>
												</div>
											</div>
										</div>
    );
  }
}
export default TopMentioners;
