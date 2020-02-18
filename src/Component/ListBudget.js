import React from 'react';

export default function Top({socket,changeDisplayLoading,Income,changeIncome,Expenses,changeExpenses,BudgetIncome,changeBudgetIncome,BudgetExpenses,changeBudgetExpenses,FormatNumber}){
    function deleteBud(item){
        changeDisplayLoading('block')
        socket.emit('delete-bud',item.id)
        socket.on('delete-bud-success',()=>{
            socket.removeEventListener('delete-bud-success')
            setTimeout(()=>changeDisplayLoading('none'),500)
            if(item.isIncome){
                changeIncome(Income - item.value)
                BudgetIncome.splice(item.index,1)
                changeBudgetIncome([...BudgetIncome])
            }else{
                changeExpenses(Expenses - item.value)
                BudgetExpenses.splice(item.index,1)
                changeBudgetExpenses([...BudgetExpenses])
            }
        })
    }
    return(
        <div className="container clearfix">
            <div className="income">
                <h2 className="icome__title">Income</h2>
                <div className="income__list">
                    {BudgetIncome.map((bud,i)=>{return(<div className="item clearfix" id="income-0">
                        <div className="item__description"> {bud.name} </div>
                        <div className="right clearfix">
                            <div className="item__value">+ {FormatNumber(bud.value)} </div>
                            <div className="item__delete">
                                <button onClick={()=>deleteBud({id:bud._id,isIncome:true,index:i,value:bud.value})} className="item__delete--btn">
                                    <i className="ion-ios-close-outline"></i>
                                </button>
                            </div>
                        </div>
                    </div>)})}
                </div>
            </div>
            <div className="expenses">
            <h2 className="expenses__title">Expenses</h2>
            <div className="expenses__list">
                {BudgetExpenses.map((bud,i)=>{return(<div className="item clearfix" id="expense-1">
                    <div className="item__description">{bud.name}</div>
                    <div className="right clearfix">
                        <div className="item__value">- {FormatNumber(bud.value)}</div>
                        <div className="item__percentage"> {bud.value/Income && Income > 0 ? Math.round(bud.value/Income*100):0} %</div>
                        <div className="item__delete">
                            <button onClick={()=>deleteBud({id:bud._id,isIncome:false,index:i,value:bud.value})} className="item__delete--btn"><i className="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>)})}
            </div>
            </div>
        </div>
    )
}