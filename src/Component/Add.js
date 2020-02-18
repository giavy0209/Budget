import React from 'react';

export default function Top({socket,Income,changeIncome,Expenses,changeExpenses,AddValue,changeAddValue,AddDes,changeAddDes,IsAddIncome,changeIsAddIncome,changeDisplayLoading,BudgetIncome,changeBudgetIncome,BudgetExpenses,changeBudgetExpenses}){
    var newBudgetValue = {
        value:AddValue,
        name:AddDes,
        isIncome:IsAddIncome
    }
    function addBud(){
        changeDisplayLoading('block');
        socket.emit('add-budget',newBudgetValue)
        socket.on('add-success',()=>{
            socket.removeEventListener('add-success')
            setTimeout(()=>changeDisplayLoading('none'),500)
            if(IsAddIncome) {
                BudgetIncome.push(newBudgetValue)
                changeBudgetIncome([...BudgetIncome]);
                changeIncome(Income+newBudgetValue.value)
            }else{
                BudgetExpenses.push(newBudgetValue)
                changeBudgetExpenses([...BudgetExpenses])
                changeExpenses(Expenses+newBudgetValue.value)
            }
        })
    }
    return(
        <div className="add">
            <div className="add__container">
                <select onChange={e=>e.target.value =='inc'? changeIsAddIncome(true) : changeIsAddIncome(false)} className="add__type">
                    <option value="inc" selected>+</option>
                    <option value="exp">-</option>
                </select>
                <input onChange={e=>changeAddDes(e.target.value)} value={AddDes} type="text" className="add__description" placeholder="Add description"></input>
                <input onChange={e=>changeAddValue(Number(e.target.value))} value={AddValue} type="number" className="add__value" placeholder="Value"></input>
                <button onClick={addBud} className="add__btn"><i className="ion-ios-checkmark-outline"></i></button>
            </div>
        </div>
    )
}