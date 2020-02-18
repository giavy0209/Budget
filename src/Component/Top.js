import React from 'react';

export default function Top({Income,Expenses,FormatNumber}){

    return(
        <div className="top">
            <div className="budget">
            <div className="budget__title">
                Available Budget in <span className="budget__title--month">Month</span>:
            </div>
            <div className="budget__value"> {Income - Expenses > 0 ?'+ ' : ' '}{FormatNumber(Income - Expenses)} </div>
            <div className="budget__income clearfix">
                <div className="budget__income--text">Income</div>
                <div className="right">
                    <div className="budget__income--value">+ {FormatNumber(Income)} </div>
                    <div className="budget__income--percentage">&nbsp;</div>
                </div>
            </div>
            <div className="budget__expenses clearfix">
                <div className="budget__expenses--text">Expenses</div>
                    <div className="right clearfix">
                        <div className="budget__expenses--value">- {FormatNumber(Expenses)} </div>
                        <div className="budget__expenses--percentage"> {Expenses/Income && Income > 0? Math.round(Expenses/Income*100) : 0} %</div>
                    </div>
                </div>
            </div>
        </div>
    )
}