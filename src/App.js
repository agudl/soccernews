import React, { Component } from 'react';
import NewsContainer from './components/news_container.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soccerNews: [],
            whatNews: {
                type: 'new',
                title: 'Latest news'
            }
        }

        this.getNews = this.getNews.bind(this);
        this.updateWhatNewsState = this.updateWhatNewsState.bind(this);

    }

    componentDidMount() {
        this.getNews = setInterval(this.getNews, 3000);
    }

    componentWillUnmount() {
      clearInterval(this.getNews);
    }

    getNews() {
        fetch('https://www.reddit.com/r/Everton+Gooners+Gunners+LiverpoolFC+PremierLeague+ThreeLions+avfc+chelseafc+crystalpalace+fcbayern+reddevils+soccer+worldcup+worldfootball/new/.json?limit=1000')
            .then((redditNews) => { let rnews = redditNews.json(); return rnews})
            .then(function(redditNews) {
                let newState = []
                redditNews.data.children.forEach(function(item) {
                    if (item.data.domain.slice(0,4) === 'self') {
                        return
                    }
                    // let domain = item.data.domain
                    // console.log(domain)
                    let singleNews = {};
                    singleNews.title = item.data.title;
                    singleNews.url = item.data.url;
                    singleNews.ups = item.data.ups;
                    singleNews.domain = item.data.domain;
                    singleNews.author = item.data.author
                    singleNews.numComments = item.data.num_comments;
                    singleNews.created = item.data.created_utc;
                    singleNews.points;

                    fetch('https://www.reddit.com/user/'+item.author+'/about.json')
                        .then((newsAuthor) => { let rauthor = newsAuthor.json(); return rauthor})
                        .then((newsAuthor) => { let newsPoints = newsAuthor.data.link_karma/(newsAuthor.data.link_karma/4) + singleNews.ups + singleNews.numComments*2;  return newsPoints })
                        .then((newsPoints) => { singleNews.points = newsPoints; return singleNews.points })

                    newState.push(singleNews)
                })
                return newState
            })
            .then((resp) => {
                this.setState({soccerNews:resp})
            })
    }

    updateWhatNewsState(news) {
        console.log(news)
        if (news === 'Latest news') {
            this.setState({
                whatNews: {
                    type: 'new',
                    title: 'Latest news'
                }
            })
        } else if (news === 'Hot news') {
            this.setState({
                whatNews: {
                    type: 'Hot',
                    title: 'Hot news'
                }
            })
        } else if (news === 'Top news') {
            this.setState({
                whatNews: {
                    type: 'top',
                    title: 'Top news'
                }
            })
        }
    }


  render() {

      if (this.state.soccerNews.length === 0) {
          return (
              <div className="App loading">
                <h3>Loading...</h3>
              </div>
          )
      }

    return (
      <div className="App">
        <div className="top_navigation_fixed"></div>
        <NewsContainer onNewsStateChange={this.updateWhatNewsState} listHeading={this.state.whatNews.title} listOfNews={this.state.soccerNews}/>
      </div>
    );
  }
}

export default App;
