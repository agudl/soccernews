import React, { Component } from 'react';
import NewsListItem from './news_item.js'


class NewsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            howMany: 10,
        }
    }

    // newsItems() {
    //     this.props.listOfNews.slice(0, 5).map((item, i) => {
    //         return <NewsListItem
    //             item={item}
    //             key={i}
    //             index={i}
    //         />
    //         i++
    //     })
    // }

        render() {

            if (this.props.listOfNews.length === 0) {
                return (
                    <h3>Loading...</h3>
                )
            }

                    return (
                        <div className="news_container">
                            <div className="news_container_top_section">
                                <h3 className="news_latest_news_heading">{this.props.listHeading}</h3>
                            </div>
                            <ul className="news_list_container">
                                {this.props.listOfNews.slice(0, this.state.howMany).map((item, i) => {
                                return <NewsListItem
                                    item={item}
                                    key={i}
                                    index={i}
                                />
                                i++
                            })}
                            </ul>
                            <div className="news_load_more" onClick={() => {this.state.howMany =this.state.howMany+5 }}>Load more</div>
                        </div>
                    )
        }
}

export default NewsContainer;
