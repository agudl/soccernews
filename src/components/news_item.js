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

        this.getScore();
        this.getDateCreated();
        this.getScore = this.getScore.bind(this);
        this.getDateCreated = this.getDateCreated.bind(this);
    }

    getScore() {

        fetch('https://www.reddit.com/user/'+this.props.item.author+'/about.json')
            .then((newsAuthor) => { let rauthor = newsAuthor.json(); return rauthor})
            .then((newsAuthor) => { let newsPoints = newsAuthor.data.link_karma/(newsAuthor.data.link_karma/4) + this.props.item.ups +this.props.item.numComments*2; return newsPoints })
            .then((newsPoints) => { this.setState({score:newsPoints}) })
    }

    getDateCreated() {

        let fromNow = moment(new Date(this.props.item.created*1000).toString()).fromNow()

        this.state.created = fromNow
    }

    render() {
        return (
            <a href={this.props.item.url} target="_blank">
            <div className="news_item_container">
                <div className="news_item_basic_info_container">
                    <h4 className="news_item_title">{this.props.item.title}!</h4>
                    <p>Source: {this.props.item.domain}</p>
                </div>
                <div className="news_item_score">{this.state.score}</div>
                <div className="news_item_created">
                    {this.state.created}
                </div>
            </div>
            </a>
        )
    }
}

export default NewsListItem
