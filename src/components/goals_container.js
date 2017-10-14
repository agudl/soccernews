import React, { Component } from 'react';

const GoalsContainer = function(props) {

    let goals = []

    const getGoals = function(props) {
        props.listOfGoals.map((item, i) => {
                    console.log(item)
                    if (item.domain === 'imgtc.b-cdn.net' || item.domain === 'streamable.com') {
                        goals.push(item)
                    }
                    i++
                })

                return goals;
            }


        getGoals(props);

        console.log(goals)

    return (
        <div className="goals_container">
            <div className="goals_wrapper">
            <div className="goals_heading">
                <h3>Latest videos</h3>
            </div>
        <ul>
        {goals.slice(0,8).map((item, i) => {
                // return <GoalsListItem
                //     item={item}
                //     key={i}
                //     index={i}
                // />
                if (i <= 10) {
                    if (item.domain === 'streamable.com') {
                        console.log(item)
                        return (
                            <a href={item.url} target="_blank">
                            <div className="goals_item_container">
                                <div className="">
                                    <h4 className="goals_item_title">{item.title}!</h4>
                                </div>
                                <div className="goals_goal_created">
                                    {item.created}
                                </div>
                            </div>
                            </a>
                        )
                    }
                    i++
                }
            })}
            </ul>
            </div>
        </div>
    )
}

export default GoalsContainer;
