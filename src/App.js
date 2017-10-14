import React, { Component } from 'react';
import NewsContainer from './components/news_container.js'
import GoalsContainer from './components/goals_container.js'
import logo from './logo.svg';
import moment from 'moment'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soccerNews: [],
            goals: [],
            whatNews: {
                type: 'new',
                title: 'Latest news'
            }
        }

        var word = "Talented young winger Ferdi Kadioglu signs contract extension at NEC Nijmegen till 2021";
        let position = 0;
        let words = word.split(' ')
        let keywords = []

        for (var i = 0; i < words.length; i++) {
            if (words[i].slice(0,1) === words[i].slice(0,1).toUpperCase()) {
                keywords.push(words[i])
                if (i+1 < words.length) {
                    if (words[i].slice(0,1) === words[i].slice(0,1).toUpperCase()) {
                        console.log(words[i])
                    }
                    if (words[i].slice(0,1) === words[i].slice(0,1).toUpperCase() && words[i+1].slice(0,1) === words[i+1].slice(0,1).toUpperCase()) {
                        let doubleWord = words[i] + ' ' + words[i+1]
                        keywords.push(doubleWord)
                    }
                }
                }
            }

        console.log(keywords)

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
                let goals = []
                redditNews.data.children.forEach(function(item) {
                    if (item.data.domain.slice(0,4) === 'self') {
                        return
                    }
                        let singleNews = {};
                        singleNews.title = item.data.title;
                        singleNews.url = item.data.url;
                        singleNews.ups = item.data.ups;
                        singleNews.domain = item.data.domain;
                        singleNews.author = item.data.author
                        singleNews.numComments = item.data.num_comments;
                        singleNews.created = moment(new Date(item.data.created_utc*1000).toString()).fromNow();
                        singleNews.subreddit = item.data.subreddit;
                        singleNews.points;

                        newState.push(singleNews)

                })

                return newState
            })
            .then(function(resp) {
                console.log(resp)

                return resp
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
        <div className="app_container">
            <GoalsContainer listOfGoals={this.state.soccerNews} />
            <NewsContainer onNewsStateChange={this.updateWhatNewsState} listHeading={this.state.whatNews.title} listOfNews={this.state.soccerNews}/>
            <div className="testingdiv"></div>
        </div>
      </div>
    );
  }
}

export default App;
