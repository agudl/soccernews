import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';

class NewsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            created: 0,
        }

        console.log(this.props.item)

        this.getScore();
        this.getScore = this.getScore.bind(this);
        // this.getDateCreated = this.getDateCreated.bind(this);
    }

    getScore() {
        fetch('https://www.reddit.com/user/'+this.props.item.author+'/about.json')
            .then((newsAuthor) => { let rauthor = newsAuthor.json(); return rauthor})
            .then((newsAuthor) => { let newsPoints = newsAuthor.data.link_karma/(newsAuthor.data.link_karma/1.5) + this.props.item.ups +this.props.item.numComments*2; return Math.round(newsPoints) })
            .then((newsPoints) => { this.setState({score:newsPoints}) })
    }

    render() {
        return (
            <a href={this.props.item.url} target="_blank">
            <div className="news_item_container">
                <div className="news_item_img_container">
                    <img src={this.props.item.img} />
                </div>
                <div className="news_item_basic_info_container">
                    <h4 className="news_item_title">{this.props.item.title}!</h4>
                    <p>Source: {this.props.item.domain}</p>
                </div>
                <div className="news_item_score">{this.state.score}</div>
                <div className="news_item_created">
                    {this.props.item.subreddit} {this.props.item.created}
                </div>
            </div>
            </a>
        )
    }
}

export default NewsListItem
